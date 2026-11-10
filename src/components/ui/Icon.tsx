import {
  Bath,
  BrickWall,
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  ClipboardCheck,
  Clock,
  Grid3x3,
  Hammer,
  Handshake,
  HardHat,
  House,
  Image as ImageIcon,
  Mail,
  MapPin,
  Menu,
  MessageSquare,
  Minus,
  PaintRoller,
  Phone,
  Plus,
  Search,
  SearchX,
  ShieldCheck,
  Star,
  Trees,
  X,
  type LucideIcon,
  type LucideProps,
} from 'lucide-react';
import type { IconName } from '../../content/types';
import styles from './Icon.module.css';

export type { IconName };

/**
 * The curated set of lucide icons the site uses (Req 13.10). Named imports keep
 * the bundle to these icons only; lucide's full `icons` map would bundle every
 * icon. `Record<IconName, LucideIcon>` makes the compiler reject a missing or
 * extra entry.
 */
const ICONS: Record<IconName, LucideIcon> = {
  // UI icons
  Menu,
  X,
  Phone,
  Mail,
  Clock,
  MapPin,
  CircleAlert,
  Image: ImageIcon,
  Plus,
  Minus,
  Star,
  ChevronLeft,
  ChevronRight,
  Search,
  SearchX,
  // Service_Category icons
  BrickWall,
  PaintRoller,
  Grid3x3,
  Bath,
  House,
  Hammer,
  Trees,
  // "Why Choose D&T Go Elite" highlight icons
  ShieldCheck,
  HardHat,
  ClipboardCheck,
  CalendarCheck,
  MessageSquare,
  Handshake,
};

/** sm = --icon-sm (16 px), md = --icon-md (20 px), lg = --icon-lg (32 px). */
export type IconSize = 'sm' | 'md' | 'lg';

export interface IconProps
  extends Omit<LucideProps, 'ref' | 'size' | 'role' | 'aria-label' | 'aria-hidden' | 'focusable'> {
  name: IconName;
  /** One size token per context (Req 13.10). */
  size: IconSize;
  /**
   * Text alternative for a meaningful icon (role="img" + aria-label). Omit for
   * decorative icons, which get aria-hidden="true".
   */
  label?: string;
}

/**
 * A lucide outlined icon from the curated registry. Color is currentColor
 * unless the caller sets `color` or a class. Width and height come from the
 * size token via CSS, overriding lucide's default 24 px attributes.
 */
export function Icon({ name, size, label, className, ...rest }: IconProps) {
  const Component = ICONS[name];
  const classes = [styles.icon, styles[size], className].filter(Boolean).join(' ');
  const a11y = label
    ? { role: 'img', 'aria-label': label }
    : { 'aria-hidden': true as const, focusable: 'false' as const };
  return <Component {...rest} {...a11y} className={classes} />;
}
