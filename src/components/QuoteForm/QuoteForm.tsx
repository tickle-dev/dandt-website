import { useEffect, useReducer, useRef } from 'react';
import type { ChangeEvent, FormEvent, ReactNode } from 'react';
import { useSearchParams } from 'react-router';
import {
  catalog,
  confirmationMessage,
  FIELD_LIMITS,
  FORM_LABELS,
  REQUIRED_SR_TEXT,
  type ContactMethod,
  type QuoteField,
  type QuoteFormErrors,
  type QuoteFormValues,
} from '../../content/index.ts';
import {
  firstInvalidField,
  INITIAL_QUOTE_VALUES,
  isFormValid,
  parseServiceParam,
  validateField,
  validateQuoteForm,
} from '../../lib/quoteForm.ts';
import { clampLength } from '../../lib/serviceFilter.ts';
import { ctaClassName } from '../ui/CtaLink.tsx';
import { Icon } from '../ui/Icon.tsx';
import styles from './QuoteForm.module.css';

/** The seven Service_Category slugs; `'other'` is deliberately not among them (Req 11.6, 11.7). */
const CATEGORY_SLUGS: readonly string[] = catalog.categories.map((category) => category.slug);

/** Value of the "Other / Not sure" option (QuoteFormValues.service). */
const SERVICE_OTHER = 'other';

// ---- State -----------------------------------------------------------------

type FocusTarget = QuoteField | 'confirmation';

interface QuoteFormState {
  values: QuoteFormValues;
  /** Errors currently shown; empty before the first submission (Req 11.8). */
  errors: QuoteFormErrors;
  /** Trimmed full name of the last valid submission, or null when no Confirmation_Message shows. */
  confirmation: string | null;
  /** Counts valid submissions, so a repeated identical message is a new DOM node (re-announced). */
  successCount: number;
  /** A new object per submission, so the focus effect runs on every submit. */
  focus: { target: FocusTarget } | null;
}

type QuoteFormAction =
  | { type: 'change'; field: keyof QuoteFormValues; value: string }
  | { type: 'submit' };

function initState(service: string): QuoteFormState {
  return {
    values: { ...INITIAL_QUOTE_VALUES, service },
    errors: {},
    confirmation: null,
    successCount: 0,
    focus: null,
  };
}

/** Re-runs `validateField` for `field` only if it currently shows an error (Req 11.16, 11.17). */
function revalidateShown(
  errors: QuoteFormErrors,
  field: QuoteField,
  values: QuoteFormValues,
): QuoteFormErrors {
  if (errors[field] === undefined) return errors;
  const message = validateField(field, values);
  const next = { ...errors };
  if (message === null) delete next[field];
  else next[field] = message;
  return next;
}

function reducer(state: QuoteFormState, action: QuoteFormAction): QuoteFormState {
  switch (action.type) {
    case 'change': {
      const values = { ...state.values, [action.field]: action.value } as QuoteFormValues;
      // A changed contact method re-validates the phone field (Req 11.17); any other
      // field re-validates itself (Req 11.16). Fields without an error stay silent.
      const field: QuoteField = action.field === 'contactMethod' ? 'phone' : action.field;
      return { ...state, values, errors: revalidateShown(state.errors, field, values) };
    }
    case 'submit': {
      const errors = validateQuoteForm(state.values);
      if (!isFormValid(errors)) {
        // Show every error, keep the values, hide any earlier confirmation (Req 11.8, 11.15).
        const first = firstInvalidField(errors);
        return {
          ...state,
          errors,
          confirmation: null,
          focus: first === null ? null : { target: first },
        };
      }
      // Valid: confirm, then reset to the empty form with no service selected (Req 11.18, 11.19).
      return {
        values: { ...INITIAL_QUOTE_VALUES },
        errors: {},
        confirmation: state.values.fullName.trim(),
        successCount: state.successCount + 1,
        focus: { target: 'confirmation' },
      };
    }
  }
}

// ---- Presentational helpers -------------------------------------------------

function errorId(field: QuoteField): string {
  return `${field}-error`;
}

function fieldId(field: QuoteField): string {
  return `quote-${field}`;
}

/** Visible "*" plus screen-reader "required" (Req 11.4, 15.12). */
function RequiredMarker() {
  return (
    <>
      {' '}
      <span className={styles.marker} aria-hidden="true">
        {FORM_LABELS.requiredMarker}
      </span>
      <span className="visually-hidden">{REQUIRED_SR_TEXT}</span>
    </>
  );
}

function FieldLabel({ field, children }: { field: QuoteField; children: ReactNode }) {
  return (
    <label className={styles.label} htmlFor={fieldId(field)}>
      {children}
    </label>
  );
}

/** Error directly below the field: CircleAlert + text in --color-error (Req 26.25). */
function FieldError({ field, message }: { field: QuoteField; message: string | undefined }) {
  if (message === undefined) return null;
  return (
    <p id={errorId(field)} className={styles.error}>
      <Icon name="CircleAlert" size="sm" className={styles.errorIcon} />
      <span>{message}</span>
    </p>
  );
}

/** id, class and the ARIA error props of a field; the ARIA props are present only while its error shows (Req 15.7). */
function fieldProps(field: QuoteField, message: string | undefined) {
  const invalid = message !== undefined;
  return {
    id: fieldId(field),
    className: invalid ? `${styles.field} ${styles.invalid}` : styles.field,
    'aria-invalid': invalid ? (true as const) : undefined,
    'aria-describedby': invalid ? errorId(field) : undefined,
  };
}

// ---- Component -------------------------------------------------------------

/**
 * Quote_Form (Req 11.3–11.8, 11.15–11.20, 14.6–14.9, 15.7, 15.8, 15.12, 26.25).
 * A controlled form that validates on submit and never sends anything: no `action`,
 * no `fetch`. The Confirmation_Message appears in an always-present polite
 * `role="status"` region, which receives focus after a valid submission.
 *
 * The `service` query parameter preselects a Service_Category once, when the form
 * mounts (Req 11.6, 11.7); later URL changes do not overwrite the visitor's choice.
 */
export function QuoteForm() {
  const [searchParams] = useSearchParams();
  const [state, dispatch] = useReducer(
    reducer,
    searchParams.get('service'),
    (param: string | null) => initState(parseServiceParam(param, CATEGORY_SLUGS)),
  );
  const { values, errors, confirmation, successCount, focus } = state;

  const fullNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const serviceRef = useRef<HTMLSelectElement>(null);
  const detailsRef = useRef<HTMLTextAreaElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  // Focus after the render that shows the errors or the confirmation, so screen
  // readers read the field's aria-invalid / description or the new message (Req 11.15, 11.20).
  useEffect(() => {
    if (focus === null) return;
    const targets: Record<FocusTarget, { current: HTMLElement | null }> = {
      fullName: fullNameRef,
      email: emailRef,
      phone: phoneRef,
      service: serviceRef,
      details: detailsRef,
      confirmation: statusRef,
    };
    targets[focus.target].current?.focus();
  }, [focus]);

  const change = (field: keyof QuoteFormValues, value: string) =>
    dispatch({ type: 'change', field, value });

  /** Text field change with the Req 11.5 length limit (maxLength plus clampLength for paste). */
  const changeText =
    (field: keyof typeof FIELD_LIMITS) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      change(field, clampLength(event.target.value, FIELD_LIMITS[field]));

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch({ type: 'submit' });
  };

  const phoneRequired = values.contactMethod === 'phone';

  return (
    <div className={styles.root}>
      <div
        ref={statusRef}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        tabIndex={-1}
        className={styles.confirmation}
      >
        {confirmation !== null && <p key={successCount}>{confirmationMessage(confirmation)}</p>}
      </div>

      <form className={styles.form} noValidate onSubmit={handleSubmit}>
        <div className={styles.group}>
          <FieldLabel field="fullName">
            {FORM_LABELS.fullName}
            <RequiredMarker />
          </FieldLabel>
          <input
            ref={fullNameRef}
            {...fieldProps('fullName', errors.fullName)}
            type="text"
            name="fullName"
            autoComplete="name"
            maxLength={FIELD_LIMITS.fullName}
            value={values.fullName}
            onChange={changeText('fullName')}
          />
          <FieldError field="fullName" message={errors.fullName} />
        </div>

        <div className={styles.group}>
          <FieldLabel field="email">
            {FORM_LABELS.email}
            <RequiredMarker />
          </FieldLabel>
          <input
            ref={emailRef}
            {...fieldProps('email', errors.email)}
            type="email"
            name="email"
            autoComplete="email"
            maxLength={FIELD_LIMITS.email}
            value={values.email}
            onChange={changeText('email')}
          />
          <FieldError field="email" message={errors.email} />
        </div>

        <div className={styles.group}>
          <FieldLabel field="phone">
            {FORM_LABELS.phone}
            {phoneRequired ? (
              <RequiredMarker />
            ) : (
              <>
                {' '}
                <span className={styles.optional}>{FORM_LABELS.optional}</span>
              </>
            )}
          </FieldLabel>
          <input
            ref={phoneRef}
            {...fieldProps('phone', errors.phone)}
            type="tel"
            name="phone"
            autoComplete="tel"
            maxLength={FIELD_LIMITS.phone}
            value={values.phone}
            onChange={changeText('phone')}
          />
          <FieldError field="phone" message={errors.phone} />
        </div>

        <div className={styles.group}>
          <FieldLabel field="service">
            {FORM_LABELS.service}
            <RequiredMarker />
          </FieldLabel>
          <select
            ref={serviceRef}
            {...fieldProps('service', errors.service)}
            name="service"
            value={values.service}
            onChange={(event) => change('service', event.target.value)}
          >
            <option value="">{FORM_LABELS.servicePlaceholder}</option>
            {catalog.categories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.name}
              </option>
            ))}
            <option value={SERVICE_OTHER}>{FORM_LABELS.serviceOther}</option>
          </select>
          <FieldError field="service" message={errors.service} />
        </div>

        <div className={`${styles.group} ${styles.full}`}>
          <FieldLabel field="details">
            {FORM_LABELS.details}
            <RequiredMarker />
          </FieldLabel>
          <textarea
            ref={detailsRef}
            {...fieldProps('details', errors.details)}
            name="details"
            rows={6}
            maxLength={FIELD_LIMITS.details}
            value={values.details}
            onChange={changeText('details')}
          />
          <FieldError field="details" message={errors.details} />
        </div>

        <fieldset className={`${styles.fieldset} ${styles.full}`}>
          <legend className={styles.legend}>{FORM_LABELS.contactMethod}</legend>
          <div className={styles.radios}>
            {(
              [
                ['email', FORM_LABELS.contactMethodEmail],
                ['phone', FORM_LABELS.contactMethodPhone],
              ] as const satisfies readonly (readonly [ContactMethod, string])[]
            ).map(([method, label]) => (
              <label key={method} className={styles.radioLabel}>
                <input
                  className={styles.radio}
                  type="radio"
                  name="contactMethod"
                  value={method}
                  checked={values.contactMethod === method}
                  onChange={() => change('contactMethod', method)}
                />
                {label}
              </label>
            ))}
          </div>
        </fieldset>

        <div className={styles.full}>
          <button type="submit" className={ctaClassName({ variant: 'primary', size: 'lg' })}>
            {FORM_LABELS.submit}
          </button>
        </div>
      </form>
    </div>
  );
}
