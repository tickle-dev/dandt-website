// Sets the browser tab title for the current page (design.md, Route change effects; Req 5.9).
import { useEffect } from 'react';
import { formatDocumentTitle } from '../lib/text.ts';

/** Sets `document.title` to "{name} | D&T Go Elite" whenever `name` changes. */
export function usePageTitle(name: string): void {
  useEffect(() => {
    document.title = formatDocumentTitle(name);
  }, [name]);
}
