import { A11Y, BREADCRUMB } from '../../content/uiText.ts';
import { TextLink } from './TextLink.tsx';
import styles from './Breadcrumb.module.css';

export interface BreadcrumbItem {
  label: string;
  /** Route_Path for the link; ignored on the last item, which is the current page. */
  to?: string;
}

export interface BreadcrumbProps {
  /** Trail from Home to the current page; the last item is the current page. */
  items: readonly BreadcrumbItem[];
  className?: string;
}

/**
 * Breadcrumb trail such as Home › Services › {category} (Req 8.5). Earlier
 * items are standalone TextLinks (surrounding text color, Req 26.21; 44 px tap
 * height, Req 14.6); the last item is plain text with aria-current="page".
 * The separators are hidden from assistive technologies, which announce the
 * ordered list instead.
 */
export function Breadcrumb({ items, className }: BreadcrumbProps) {
  const lastIndex = items.length - 1;
  return (
    <nav aria-label={A11Y.breadcrumb} className={className}>
      <ol className={styles.list}>
        {items.map((item, index) => (
          <li key={`${index}-${item.label}`} className={styles.item}>
            {index > 0 && (
              <span aria-hidden="true">
                {BREADCRUMB.separator}
              </span>
            )}
            {index === lastIndex || item.to === undefined ? (
              <span aria-current={index === lastIndex ? 'page' : undefined}>{item.label}</span>
            ) : (
              <TextLink to={item.to} standalone>
                {item.label}
              </TextLink>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
