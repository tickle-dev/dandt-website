import styles from './FilterButtons.module.css';

export interface FilterOption<T extends string = string> {
  id: T;
  label: string;
}

export interface FilterButtonsProps<T extends string = string> {
  /** Options in display order; the caller puts "All" first (Req 10.3, 20.10). */
  options: readonly FilterOption<T>[];
  /** The id of the one selected option (Req 10.6, 20.13). */
  selected: T;
  /** Called with the new id; never called for the already-selected option (Req 20.16). */
  onSelect: (id: T) => void;
  /** Accessible name of the group, for example "Filter projects by category". */
  label: string;
}

/**
 * Project_Filter and Review_Filter controls: a labeled group of toggle buttons
 * with exactly one pressed (Req 10.9, 20.13). Native buttons handle mouse,
 * touch, Enter and Space (Req 10.3, 20.10). The shared filter option style
 * (Req 26.20) keys off aria-pressed, so the visual and announced states match.
 */
export function FilterButtons<T extends string>({
  options,
  selected,
  onSelect,
  label,
}: FilterButtonsProps<T>) {
  return (
    <div role="group" aria-label={label} className={styles.group}>
      {options.map((option) => {
        const isSelected = option.id === selected;
        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={isSelected}
            className={styles.option}
            onClick={() => {
              if (!isSelected) onSelect(option.id);
            }}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
