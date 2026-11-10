import { useEffect, useState } from 'react';
import { CTA_LABELS, type MapEmbedConfig } from '../../content/index.ts';
import { isHttpsUrl } from '../../lib/urls.ts';
import { TextLink } from '../ui/TextLink.tsx';
import styles from './MapEmbed.module.css';

export interface MapEmbedProps {
  /** Map config from the Content_Module (`contactMap` or `serviceAreas.map`). */
  embed: MapEmbedConfig;
  className?: string;
}

/** True when the browser reports a connection, or cannot tell. */
function browserIsOnline(): boolean {
  return typeof navigator === 'undefined' || navigator.onLine !== false;
}

/**
 * Google Maps embed in a fixed-ratio charcoal box with an "Open in Google Maps"
 * link below (Req 18.5, 18.7, 22, 26.23).
 *
 * - The box takes its size from `--ratio-map` (4:3 mobile, 16:9 from 768 px), so it
 *   has the same size before, during and after the frame loads, and if it fails.
 * - The `iframe` is added only after the first mount, with `loading="lazy"`, so the
 *   page content renders first and the map never delays it (Req 22.4).
 * - When `embedUrl` is not an `https://` URL, or the browser is offline, the box shows
 *   the `label` place name instead of an `iframe` (Req 22.8, 22.10). If the browser
 *   comes back online, the frame is added; a frame that has been added stays.
 * - The external link is always shown, whether or not the frame loads (Req 22.7).
 */
export function MapEmbed({ embed, className }: MapEmbedProps) {
  const { embedUrl, openUrl, title, label } = embed;
  const canEmbed = isHttpsUrl(embedUrl);
  // null before the first mount; then true (show the frame) or false (offline fallback).
  const [frameOn, setFrameOn] = useState<boolean | null>(null);

  useEffect(() => {
    if (!canEmbed) return;
    if (browserIsOnline()) {
      setFrameOn(true);
      return;
    }
    setFrameOn(false);
    const handleOnline = () => setFrameOn(true);
    window.addEventListener('online', handleOnline, { once: true });
    return () => window.removeEventListener('online', handleOnline);
  }, [canEmbed]);

  const showFrame = canEmbed && frameOn === true;
  // Before the first mount an embeddable map shows the empty charcoal box only.
  const showLabel = !canEmbed || frameOn === false;

  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')}>
      <div className={styles.frame}>
        {showFrame ? (
          <iframe
            className={styles.iframe}
            src={embedUrl}
            title={title}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : showLabel ? (
          <p className={styles.label}>{label}</p>
        ) : null}
      </div>
      <TextLink href={openUrl} external standalone>
        {CTA_LABELS.openInGoogleMaps}
      </TextLink>
    </div>
  );
}
