// Form_Validator for the Quote_Form (design.md, src/lib signatures, key algorithms and
// design decision 5; Properties 12–15; Req 11.6, 11.7, 11.9–11.15, 11.21, 11.22).
// Pure functions: no DOM access, no input mutation, same values in → same errors out.
import type {
  QuoteField,
  QuoteFormErrors,
  QuoteFormValues,
} from '../content/types.ts';
import { ERRORS } from '../content/uiText.ts';

/** Field order of the Quote_Form (Req 11.3); used for error order and first-invalid focus (Req 11.15). */
const FIELD_ORDER: readonly QuoteField[] = ['fullName', 'email', 'phone', 'service', 'details'];

/** Minimum trimmed length of the project details (Req 11.14). */
const DETAILS_MIN = 20;

/** Empty form: no service selected, contact method email (Req 11.3, 11.19). */
export const INITIAL_QUOTE_VALUES: QuoteFormValues = Object.freeze({
  fullName: '',
  email: '',
  phone: '',
  service: '',
  details: '',
  contactMethod: 'email',
});

/**
 * Email rule (Req 11.10, Property 12). With `v = raw.trim()`, valid when `v` contains no
 * whitespace and exactly one `@`, the part before it is non-empty, and the domain after it
 * splits on `.` into two or more non-empty parts whose last part is two or more ASCII letters.
 */
export function isValidEmail(raw: string): boolean {
  const v = raw.trim();
  if (/\s/.test(v)) return false;
  const parts = v.split('@');
  if (parts.length !== 2) return false;
  const [local, domain] = parts;
  if (local === '') return false;
  const labels = domain.split('.');
  if (labels.length < 2 || labels.some((label) => label === '')) return false;
  return /^[A-Za-z]{2,}$/.test(labels[labels.length - 1]);
}

/**
 * Phone digits (Req 11.11, Property 13). Trims the value and removes one leading `+1`. If
 * the rest contains any character other than ASCII digits, spaces, parentheses, hyphens
 * and periods, returns `null`; otherwise returns the digits only (possibly `''`).
 * Callers check for exactly 10 digits.
 */
export function phoneDigits(raw: string): string | null {
  let v = raw.trim();
  if (v.startsWith('+1')) v = v.slice(2);
  if (/[^0-9 ().-]/.test(v)) return null;
  return v.replace(/[^0-9]/g, '');
}

/**
 * Error message for one field, or `null` when it is valid (Req 11.9–11.14). The phone
 * field depends on the contact method; a whitespace-only phone counts as empty (design
 * decision 5): valid for email, "Please enter a phone number so we can call you" for phone.
 */
export function validateField(field: QuoteField, values: QuoteFormValues): string | null {
  switch (field) {
    case 'fullName':
      return values.fullName.trim() === '' ? ERRORS.fullName : null;
    case 'email':
      return isValidEmail(values.email) ? null : ERRORS.email;
    case 'phone': {
      if (values.phone.trim() === '') {
        return values.contactMethod === 'phone' ? ERRORS.phoneRequired : null;
      }
      const digits = phoneDigits(values.phone);
      return digits !== null && digits.length === 10 ? null : ERRORS.phoneFormat;
    }
    case 'service':
      return values.service === '' ? ERRORS.service : null;
    case 'details':
      return values.details.trim().length < DETAILS_MIN ? ERRORS.details : null;
  }
}

/**
 * Validates every field (Req 11.8–11.14). The result has a key only for each invalid
 * field, inserted in form order, so equal values always give equal objects (Req 11.22).
 */
export function validateQuoteForm(values: QuoteFormValues): QuoteFormErrors {
  const errors: QuoteFormErrors = {};
  for (const field of FIELD_ORDER) {
    const message = validateField(field, values);
    if (message !== null) errors[field] = message;
  }
  return errors;
}

/** True if and only if no field has an error (Req 11.21). */
export function isFormValid(errors: QuoteFormErrors): boolean {
  return FIELD_ORDER.every((field) => errors[field] === undefined);
}

/**
 * The first invalid field in the order full name, email, phone, service, project details,
 * or `null` when there is none (Req 11.15).
 */
export function firstInvalidField(errors: QuoteFormErrors): QuoteField | null {
  return FIELD_ORDER.find((field) => errors[field] !== undefined) ?? null;
}

/**
 * Preselected service from the `service` URL query parameter (Req 11.6, 11.7, Property 15).
 * Returns `value` when it exactly (case-sensitively, untrimmed) equals one of `slugs`,
 * otherwise `''` (no selection, no error). Pass the seven Service_Category slugs: the
 * "Other / Not sure" value `'other'` is not a Slug, so `?service=other` selects nothing.
 */
export function parseServiceParam(value: string | null, slugs: readonly string[]): string {
  return value !== null && value !== '' && slugs.includes(value) ? value : '';
}
