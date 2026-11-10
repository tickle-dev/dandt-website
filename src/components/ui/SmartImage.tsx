import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import type { Photo } from '../../content/types';
import { IMAGE_LOAD_MARGIN, shouldLoadImage } from '../../lib/layout';
import { Icon } from './Icon';
import styles from './SmartImage.module.css';

export interface SmartImageProps {
  /** Manifest entry from `getPhoto(id)`. */
  photo: Photo;
  /** Alternative text (≤150 chars). Empty string marks the image as decorative. */
  alt: string;
  /** Above-the-fold image: loads at once with `loading="eager" fetchpriority="high"`. */
  priority?: boolean;
  /**
   * Full-width hero or Service_Category header image: fills the parent's slot
   * (100% width and height), crops with `object-fit: cover` at `photo.focal`,
   * no border radius, and a text-free placeholder. The parent sizes the slot.
   */
  fill?: boolean;
  /** `sizes` attribute for the srcset. Default '100vw'. */
  sizes?: string;
  className?: string;
}

const ROOT_MARGIN = `0px 0px ${IMAGE_LOAD_MARGIN}px 0px`;

/**
 * Responsive bundled photo with a fixed box and an intentional placeholder
 * (Req 16.1, 16.8–16.10, 16.14, 16.15, 26.16, 26.23, 26.32).
 *
 * - The box takes its aspect ratio from the manifest, so it has the same size
 *   before and after the file loads. In `fill` mode the parent's slot sets the size.
 * - Without `priority`, `src` is set by an initial `shouldLoadImage` check, or
 *   later by an IntersectionObserver 1000 px below the viewport, or at once
 *   when IntersectionObserver is missing.
 * - Empty `sources` and load errors render a charcoal placeholder in the same
 *   box, never the browser's broken-image icon.
 *
 * Renders phrasing content only (`<span>`, `<img>`), so it is valid inside a
 * `<button>` such as a Project_Card.
 */
export function SmartImage({ photo, alt, priority = false, fill = false, sizes, className }: SmartImageProps) {
  const boxRef = useRef<HTMLSpanElement>(null);
  const hasSources = photo.sources.length > 0;
  const [inView, setInView] = useState(priority);
  // Keyed by photo id, so a new photo in the same slot (Project_Viewer) starts fresh.
  const [failedId, setFailedId] = useState<string | null>(null);
  const [loadedId, setLoadedId] = useState<string | null>(null);

  const shouldLoad = priority || inView;

  useLayoutEffect(() => {
    if (shouldLoad || !hasSources) return;
    const box = boxRef.current;
    if (!box) return;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    if (shouldLoadImage(box.getBoundingClientRect().top, window.innerHeight, IMAGE_LOAD_MARGIN)) {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          setInView(true);
        }
      },
      { rootMargin: ROOT_MARGIN },
    );
    observer.observe(box);
    return () => observer.disconnect();
  }, [shouldLoad, hasSources]);

  const boxClass = [styles.box, fill ? styles.fill : styles.framed, className].filter(Boolean).join(' ');
  const boxStyle: CSSProperties | undefined = fill
    ? undefined
    : { aspectRatio: `${photo.width} / ${photo.height}` };

  if (!hasSources || failedId === photo.id) {
    return (
      <span ref={boxRef} className={boxClass} style={boxStyle}>
        <Placeholder alt={alt} fill={fill} />
      </span>
    );
  }

  const sorted = [...photo.sources].sort((a, b) => a.width - b.width);
  const srcSet = sorted.map((source) => `${source.src} ${source.width}w`).join(', ');
  const largest = sorted[sorted.length - 1].src;
  const loaded = loadedId === photo.id;

  return (
    <span ref={boxRef} className={boxClass} style={boxStyle}>
      <img
        className={[styles.img, loaded ? styles.loaded : null].filter(Boolean).join(' ')}
        alt={alt}
        width={photo.width}
        height={photo.height}
        sizes={shouldLoad ? (sizes ?? '100vw') : undefined}
        srcSet={shouldLoad ? srcSet : undefined}
        src={shouldLoad ? largest : undefined}
        loading={priority ? 'eager' : undefined}
        fetchPriority={priority ? 'high' : undefined}
        decoding="async"
        style={{ objectPosition: photo.focal }}
        onLoad={() => setLoadedId(photo.id)}
        onError={() => setFailedId(photo.id)}
      />
    </span>
  );
}

interface PlaceholderProps {
  alt: string;
  fill: boolean;
}

/**
 * Charcoal block that fills the image box. Informative images keep their alt
 * text for assistive technology through role="img"; decorative ones are hidden.
 */
function Placeholder({ alt, fill }: PlaceholderProps) {
  const a11y = alt
    ? { role: 'img' as const, 'aria-label': alt }
    : { 'aria-hidden': true as const };

  if (fill) {
    // Full-width hero or category header: no visible text over the hero copy (Req 16.9, 26.32).
    return <span {...a11y} className={styles.placeholderFill} />;
  }

  return (
    <span {...a11y} className={styles.placeholder}>
      <Icon name="Image" size="lg" className={styles.placeholderIcon} />
      {alt ? (
        <span aria-hidden="true" className={styles.placeholderText}>
          {alt}
        </span>
      ) : null}
    </span>
  );
}
