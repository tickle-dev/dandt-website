import type { Ref } from 'react';
import { A11Y } from '../../content/index.ts';
import { Icon } from '../ui/Icon.tsx';
import styles from './MenuToggle.module.css';

export interface MenuToggleProps {
  /** Mobile_Menu state; drives `aria-expanded`, the label and the icon. */
  open: boolean;
  /** Id of the panel the button controls (`main-nav-panel`). */
  controls: string;
  onToggle: () => void;
  /** Lets the header return focus here when Escape closes the menu (Req 4.5). */
  ref?: Ref<HTMLButtonElement>;
}

/**
 * Menu_Toggle (Req 4.1, 4.6, 4.11, 15.12): an icon-only button at least
 * 44 × 44 px with lucide `Menu` / `X` (aria-hidden) and an accessible name
 * of "Open navigation menu" or "Close navigation menu". Shown below 1024 px only.
 */
export function MenuToggle({ open, controls, onToggle, ref }: MenuToggleProps) {
  return (
    <button
      ref={ref}
      type="button"
      className={styles.toggle}
      aria-expanded={open}
      aria-controls={controls}
      aria-label={open ? A11Y.closeMenu : A11Y.openMenu}
      onClick={onToggle}
    >
      <Icon name={open ? 'X' : 'Menu'} size="md" />
    </button>
  );
}
