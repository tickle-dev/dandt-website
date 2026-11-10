import { useMenu, useViewer, useViewport } from '../../app/layoutContext.tsx';
import { A11Y, callLabel, contact } from '../../content/index.ts';
import { isClickToCallVisible } from '../../lib/layout.ts';
import { toTelHref } from '../../lib/urls.ts';
import { ctaClassName } from '../ui/CtaLink.tsx';
import { Icon } from '../ui/Icon.tsx';
import styles from './ClickToCallButton.module.css';

/**
 * Mobile Click_To_Call_Button (Req 16.12, 24.1–24.4, 24.7, 24.9, 24.10): a `tel:` link built
 * from the Content_Module phone entry, styled as a Primary md CTA pill. CSS hides it at 768 px
 * and wider; it is not rendered while the Mobile_Menu or the Project_Viewer is open. No
 * `target`, so the browser handles the `tel:` link in the current tab.
 */
export function ClickToCallButton() {
  const viewport = useViewport();
  const { open: menuOpen } = useMenu();
  const { viewerOpen } = useViewer();

  if (!isClickToCallVisible(viewport, menuOpen, viewerOpen)) return null;

  return (
    <a
      href={toTelHref(contact.phone)}
      aria-label={callLabel(contact.phone)}
      className={ctaClassName({ variant: 'primary', size: 'md', className: styles.button })}
    >
      <Icon name="Phone" size="md" />
      <span>{A11Y.call}</span>
    </a>
  );
}
