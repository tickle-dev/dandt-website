import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type RefObject,
} from 'react';
import { createPortal } from 'react-dom';
import { useViewer } from '../../app/layoutContext.tsx';
import { getPhoto } from '../../assets/photos/photoManifest.ts';
import { A11Y, showingProject, type Project } from '../../content/index.ts';
import { useFocusTrap } from '../../hooks/useFocusTrap.ts';
import { useScrollLock } from '../../hooks/useScrollLock.ts';
import { nextIndex, prevIndex } from '../../lib/viewerNav.ts';
import { Icon } from '../ui/Icon.tsx';
import { LiveRegion } from '../ui/LiveRegion.tsx';
import { SmartImage } from '../ui/SmartImage.tsx';
import styles from './ProjectViewer.module.css';

/** The photo is at most --viewer-panel-max-w (960 px) wide, or the viewport on smaller screens. */
const IMAGE_SIZES = '(min-width: 1024px) 960px, 100vw';

export interface ProjectViewerProps {
  /** The Project_Cards displayed under the selected Project_Filter option, in displayed order. */
  projects: readonly Project[];
  /** Id of the Project_Card the visitor activated. Fixed for the viewer's lifetime. */
  openerId: string;
  /** The Projects_Page's card ref map (see ProjectCard); used to return focus on close. */
  cardRefs: RefObject<Map<string, HTMLButtonElement>>;
  /** Escape, the close button or a backdrop click. The page should unmount the viewer. */
  onClose: () => void;
}

interface Announcement {
  message: string;
  key: number;
}

/**
 * Project_Viewer (Req 21.2–21.6, 21.8–21.16, 24.7, 26.17, 26.23, 26.24).
 *
 * Mount it only while open, and unmount it to close. Mounting opens it on the opener's project:
 * the page scroll position is saved and locked, `#root` becomes `inert`, the close button takes
 * focus and the viewer-open flag hides the Click_To_Call_Button. Unmounting (after `onClose`,
 * or when the Router shows another page) reverses all of it: `inert` is removed, scrolling is
 * unlocked at the saved position and the opener card gets focus back.
 *
 * The shown index is component state, so opening and moving never touch browser history.
 */
export function ProjectViewer({ projects, openerId, cardRefs, onClose }: ProjectViewerProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const pointerDownOnBackdrop = useRef(false);
  const { setViewerOpen } = useViewer();

  const count = projects.length;
  const [index, setIndex] = useState(() =>
    Math.max(0, projects.findIndex((project) => project.id === openerId)),
  );
  const [announcement, setAnnouncement] = useState<Announcement>({ message: '', key: 0 });
  // Guards against a shorter set arriving while open (the page behind is inert, so it should not).
  const shownIndex = Math.min(index, count - 1);
  const project = count > 0 ? projects[shownIndex] : undefined;

  // Declared before the inert/focus effect, so its cleanup restores the scroll position first.
  useScrollLock(true);
  useFocusTrap(panelRef, true);

  useLayoutEffect(() => {
    const root = document.getElementById('root');
    const wasInert = root?.inert ?? false;
    if (root) root.inert = true;
    closeRef.current?.focus({ preventScroll: true });
    setViewerOpen(true);
    return () => {
      if (root) root.inert = wasInert;
      setViewerOpen(false);
      // On a route change the card is about to be removed; focusing it then is harmless.
      cardRefs.current.get(openerId)?.focus({ preventScroll: true });
    };
  }, [cardRefs, openerId, setViewerOpen]);

  // Nothing to show: let the page close the viewer.
  useEffect(() => {
    if (count === 0) onClose();
  }, [count, onClose]);

  const move = useCallback(
    (step: (i: number, n: number) => number) => {
      // One Project_Card: buttons are disabled and arrows do nothing, with no announcement (Req 21.15).
      if (count < 2) return;
      const next = step(shownIndex, count);
      setIndex(next);
      setAnnouncement((previous) => ({
        message: showingProject(projects[next].title),
        key: previous.key + 1,
      }));
    },
    [count, shownIndex, projects],
  );

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        move(nextIndex);
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        move(prevIndex);
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [move, onClose]);

  if (!project) return null;

  const photo = getPhoto(project.photo);
  // Unitless width / height ratio: the frame's width is capped so the height stays ≤ 60dvh.
  const frameStyle = { '--viewer-photo-ar': String(photo.width / photo.height) } as CSSProperties;
  const single = count < 2;

  return createPortal(
    <div
      className={styles.backdrop}
      onPointerDown={(event) => {
        pointerDownOnBackdrop.current = event.target === event.currentTarget;
      }}
      onClick={(event) => {
        // Only a press that starts and ends on the backdrop closes (not a drag out of the panel).
        if (pointerDownOnBackdrop.current && event.target === event.currentTarget) onClose();
        pointerDownOnBackdrop.current = false;
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        data-tone="dark"
        className={styles.panel}
      >
        <div className={styles.toolbar}>
          <button
            ref={closeRef}
            type="button"
            className={styles.iconButton}
            aria-label={A11Y.closeViewer}
            onClick={onClose}
          >
            <Icon name="X" size="md" />
          </button>
        </div>

        <div className={styles.frame} style={frameStyle}>
          <SmartImage
            photo={photo}
            alt={project.alt}
            sizes={IMAGE_SIZES}
            priority
            className={styles.photo}
          />
        </div>

        <div className={styles.text}>
          <h2 id={titleId} className={styles.title}>
            {project.title}
          </h2>
          <p className={styles.category}>{project.category}</p>
          <p className={styles.description}>{project.description}</p>
        </div>

        <div className={styles.nav}>
          <button
            type="button"
            className={styles.iconButton}
            aria-label={A11Y.previousProject}
            disabled={single}
            onClick={() => move(prevIndex)}
          >
            <Icon name="ChevronLeft" size="md" />
          </button>
          <button
            type="button"
            className={styles.iconButton}
            aria-label={A11Y.nextProject}
            disabled={single}
            onClick={() => move(nextIndex)}
          >
            <Icon name="ChevronRight" size="md" />
          </button>
        </div>

        <LiveRegion message={announcement.message} announceKey={announcement.key} />
      </div>
    </div>,
    document.body,
  );
}
