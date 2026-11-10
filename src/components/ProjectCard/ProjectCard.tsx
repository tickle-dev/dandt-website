import { useCallback, type RefObject } from 'react';
import { getPhoto } from '../../assets/photos/photoManifest.ts';
import { viewLargerPhoto, type Project } from '../../content/index.ts';
import { CardMedia, cardProps } from '../ui/Card.tsx';
import { SmartImage } from '../ui/SmartImage.tsx';
import styles from './ProjectCard.module.css';

/** Card image widths for the 1 / 2 / 3 column Projects grid. */
const IMAGE_SIZES = '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw';

export interface ProjectCardProps {
  project: Project;
  /** Called with the project id when the card is activated (click, tap, Enter, Space). */
  onOpen: (projectId: string) => void;
  /**
   * Map of project id → card button, owned by the Projects_Page. The card adds
   * its node on mount and removes it on unmount, so the Project_Viewer can
   * return focus with `cardRefs.current.get(openerId)?.focus()`.
   */
  cardRefs: RefObject<Map<string, HTMLButtonElement>>;
}

/**
 * Project_Card (Req 10.2, 15.4, 21.1, 26.6, 26.7, 26.23): one interactive light
 * Card rendered as a `<button>` that opens the Project_Viewer. Holds the 4:3
 * photo, the title (a styled `<span>`, since headings cannot sit inside a
 * button), the category and the description. The accessible name is
 * "{title}, view larger photo".
 */
export function ProjectCard({ project, onOpen, cardRefs }: ProjectCardProps) {
  const { id } = project;

  const registerNode = useCallback(
    (node: HTMLButtonElement | null) => {
      if (!node) return;
      const map = cardRefs.current;
      map.set(id, node);
      return () => {
        // Only remove our own entry; a remounted card may already have replaced it.
        if (map.get(id) === node) map.delete(id);
      };
    },
    [cardRefs, id],
  );

  return (
    <button
      type="button"
      ref={registerNode}
      {...cardProps({ variant: 'light', interactive: true })}
      aria-label={viewLargerPhoto(project.title)}
      onClick={() => onOpen(id)}
    >
      <CardMedia className={styles.media}>
        <SmartImage
          photo={getPhoto(project.photo)}
          alt={project.alt}
          sizes={IMAGE_SIZES}
          className={styles.image}
        />
      </CardMedia>
      <span className={styles.body}>
        <span className={styles.title}>{project.title}</span>
        <span className={styles.category}>{project.category}</span>
        <span className={styles.description}>{project.description}</span>
      </span>
    </button>
  );
}
