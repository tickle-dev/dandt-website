import { useId } from 'react';
import { MapEmbed } from '../components/MapEmbed/MapEmbed.tsx';
import { QuoteForm } from '../components/QuoteForm/QuoteForm.tsx';
import { SocialLinks } from '../components/SocialLinks/SocialLinks.tsx';
import { Icon } from '../components/ui/Icon.tsx';
import { PageHeading } from '../components/ui/PageHeading.tsx';
import { PageSection } from '../components/ui/PageSection.tsx';
import { SectionHeading } from '../components/ui/SectionHeading.tsx';
import {
  CONTACT_LABELS,
  PAGE_HEADINGS,
  PAGE_NAMES,
  contact,
  contactMap,
  pageIntros,
} from '../content/index.ts';
import { usePageTitle } from '../hooks/usePageTitle.ts';
import { toTelHref } from '../lib/urls.ts';
import styles from './ContactPage.module.css';

/** The email with a break opportunity after "@", so a narrow column wraps it cleanly. */
function EmailText({ email }: { email: string }) {
  const at = email.indexOf('@');
  if (at < 0) return <>{email}</>;
  return (
    <>
      {email.slice(0, at + 1)}
      <wbr />
      {email.slice(at + 1)}
    </>
  );
}

/**
 * Contact_Page (design.md, Page layouts → Contact; Req 11.1, 11.2, 11.23, 16.12, 22.1,
 * 22.5, 23.1, 23.2, 23.4–23.6, 26.12): the page header, then one off-white section with
 * the Quote_Form and the contact details panel, the Social_Links and the Map_Embed.
 *
 * DOM order is form, details, map, which is the stacked order below 1024 px. From
 * 1024 px a CSS grid puts the form in the left 2/3 and the details with the map under
 * them in the right 1/3. The form submit button is the section's only Primary CTA.
 * Every contact value comes from the Content_Module, so it matches the Footer and the
 * Click_To_Call_Button (Req 16.12). No street address is shown.
 */
export function ContactPage() {
  usePageTitle(PAGE_NAMES.contact);
  const headingId = useId();

  return (
    <>
      <PageSection tone="dark" aria-labelledby={headingId}>
        <PageHeading id={headingId}>{PAGE_HEADINGS.contact}</PageHeading>
        <p>{pageIntros.contact}</p>
      </PageSection>

      <PageSection tone="light" containerClassName={styles.layout}>
        <div className={styles.form}>
          <QuoteForm />
        </div>

        <div className={styles.details}>
          <SectionHeading>{CONTACT_LABELS.heading}</SectionHeading>
          <dl className={styles.list}>
            <div className={styles.item}>
              <dt className={styles.term}>
                <Icon name="MapPin" size="md" className={styles.icon} />
                {CONTACT_LABELS.location}
              </dt>
              <dd className={styles.value}>{contact.locationLine}</dd>
            </div>
            <div className={styles.item}>
              <dt className={styles.term}>
                <Icon name="Phone" size="md" className={styles.icon} />
                {CONTACT_LABELS.phone}
              </dt>
              <dd className={styles.value}>
                <a className={styles.link} href={toTelHref(contact.phone)}>
                  {contact.phone}
                </a>
              </dd>
            </div>
            <div className={styles.item}>
              <dt className={styles.term}>
                <Icon name="Mail" size="md" className={styles.icon} />
                {CONTACT_LABELS.email}
              </dt>
              <dd className={styles.value}>
                <a className={`${styles.link} ${styles.email}`} href={`mailto:${contact.email}`}>
                  <EmailText email={contact.email} />
                </a>
              </dd>
            </div>
            <div className={styles.item}>
              <dt className={styles.term}>
                <Icon name="Clock" size="md" className={styles.icon} />
                {CONTACT_LABELS.hours}
              </dt>
              <dd className={styles.value}>{contact.hours}</dd>
            </div>
          </dl>
          <SocialLinks className={styles.social} />
        </div>

        <div className={styles.map}>
          <MapEmbed embed={contactMap} />
        </div>
      </PageSection>
    </>
  );
}
