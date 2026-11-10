import { useId, useMemo, useRef, useState } from 'react';
import type { ChangeEvent } from 'react';
import { SERVICE_FILTER } from '../../content/index.ts';
import { useDebouncedValue } from '../../hooks/useDebouncedValue.ts';
import { SERVICE_FILTER_MAX, clampLength, normalizeQuery } from '../../lib/serviceFilter.ts';
import { Icon } from '../ui/Icon.tsx';
import { LiveRegion } from '../ui/LiveRegion.tsx';
import styles from './ServiceFilter.module.css';

/** Quiet period before the result count is announced (design.md, ServiceFilter). */
const ANNOUNCE_DELAY_MS = 400;

export interface ServiceFilterProps {
  /** Current filter text (controlled by the Services_Page). */
  value: string;
  onChange: (value: string) => void;
  /**
   * Screen-reader text for the current `value`: the result count or the no-match
   * message (Req 15.11). Announced after typing pauses, never on mount.
   */
  announcement: string;
}

interface PendingAnnouncement {
  /** Normalized query, so a new result set with the same count is announced again. */
  query: string;
  message: string;
}

/**
 * Service_Filter (Req 7.3, 7.9–7.11, 14.7, 15.11, 15.12): a labelled search input with a
 * 44 px clear button shown while the field holds any character. The parent filters on
 * every change, so the list updates immediately; only the live-region announcement waits
 * for a 400 ms pause in typing.
 */
export function ServiceFilter({ value, onChange, announcement }: ServiceFilterProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  // False until the visitor edits the field, so nothing is announced on mount.
  const [touched, setTouched] = useState(false);

  const query = normalizeQuery(value);
  const pending = useMemo<PendingAnnouncement | null>(
    () => (touched ? { query, message: announcement } : null),
    [touched, query, announcement],
  );
  const settled = useDebouncedValue(pending, ANNOUNCE_DELAY_MS);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTouched(true);
    // maxLength stops typing past the limit; clampLength also cuts pasted or scripted text (Req 7.11).
    onChange(clampLength(event.target.value, SERVICE_FILTER_MAX));
  };

  const handleClear = () => {
    setTouched(true);
    onChange('');
    inputRef.current?.focus();
  };

  return (
    <div className={styles.root}>
      <label htmlFor={inputId} className={styles.label}>
        {SERVICE_FILTER.label}
      </label>
      <div className={styles.control}>
        <input
          ref={inputRef}
          id={inputId}
          type="search"
          className={styles.input}
          value={value}
          onChange={handleChange}
          maxLength={SERVICE_FILTER_MAX}
          autoComplete="off"
          enterKeyHint="search"
        />
        {value.length > 0 && (
          <button
            type="button"
            className={styles.clear}
            onClick={handleClear}
            aria-label={SERVICE_FILTER.clear}
          >
            <Icon name="X" size="md" />
          </button>
        )}
      </div>
      <LiveRegion message={settled?.message ?? ''} announceKey={settled?.query} />
    </div>
  );
}
