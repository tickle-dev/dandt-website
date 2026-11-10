import { siFacebook, siGoogle, siInstagram, siNextdoor } from 'simple-icons';
import { social, socialLinkLabel, type SocialLink, type SocialPlatform } from '../../content/index.ts';
import { visibleSocialLinks } from '../../lib/urls.ts';
import styles from './SocialLinks.module.css';

/** SVG path data for one bundled brand icon (24 × 24 view box). */
interface BrandIcon {
  path: string;
}

/**
 * Bundled simple-icons paths per platform (Req 23.2): named imports only, so the
 * bundle holds just these four. simple-icons has no separate Google Business Profile
 * mark, so that platform uses the Google "G".
 */
const PLATFORM_ICONS: Record<SocialPlatform, BrandIcon> = {
  Facebook: siFacebook,
  Instagram: siInstagram,
  'Google Business Profile': siGoogle,
  Nextdoor: siNextdoor,
};

export interface SocialLinksProps {
  /** Entries to show; defaults to the Content_Module `social` list (Req 23.3). */
  links?: readonly SocialLink[];
  className?: string;
}

/**
 * Social_Links (Req 23): one 44 × 44 px icon link per platform with a valid `https://`
 * URL, in content order. Each opens in a new tab with `rel="noopener noreferrer"` and is
 * named "D&T Go Elite on {platform} (opens in a new tab)"; the SVG is hidden from
 * assistive technologies. Renders nothing at all when no entry is valid (Req 23.7, 23.8).
 *
 * The icon color is `--surface-accent`, so it is gold on black (Footer) and dark gold
 * on off-white (Contact_Page), and hover switches to `--surface-text` (Req 23.5).
 */
export function SocialLinks({ links = social, className }: SocialLinksProps) {
  const visible = visibleSocialLinks(links);
  if (visible.length === 0) return null;

  const classes = className ? `${styles.list} ${className}` : styles.list;
  return (
    <ul className={classes}>
      {visible.map(({ platform, url }) => (
        <li key={platform}>
          <a
            className={styles.link}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={socialLinkLabel(platform)}
          >
            <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d={PLATFORM_ICONS[platform].path} fill="currentColor" />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
