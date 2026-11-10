import { Fragment, useReducer } from 'react';
import type { FaqGroup, RichText } from '../../content/types.ts';
import { initialFaqState, toggleFaq } from '../../lib/faqState.ts';
import { Icon } from '../ui/Icon.tsx';
import { SectionHeading } from '../ui/SectionHeading.tsx';
import { TextLink } from '../ui/TextLink.tsx';
import styles from './FaqAccordion.module.css';

export interface FaqAccordionProps {
  group: FaqGroup;
}

/** Answer text with inline router links, so internal links open without a reload (Req 19.6). */
function renderRichText(text: RichText) {
  return text.map((part, index) =>
    typeof part === 'string' ? (
      <Fragment key={index}>{part}</Fragment>
    ) : (
      <TextLink key={index} to={part.to}>
        {part.text}
      </TextLink>
    ),
  );
}

/**
 * One FAQ group (design.md, Components: FaqAccordion; FAQ item style; Req 19.7–19.13,
 * 19.15, 19.16): the group h2 with the gold accent rule, then each FAQ_Item as an h3
 * question button that controls its answer region.
 *
 * State lives in this component, so every mount starts collapsed (Req 19.8). Each
 * activation is applied synchronously through the reducer, so a rapid second activation
 * ends in the latest state (Req 19.16). The native button keeps focus on activation and
 * the answer opens below it, so the button stays in place (Req 19.15). A collapsed answer
 * carries `hidden`, which removes it, and any link in it, from view, the Tab order and
 * the accessibility tree (Req 19.11).
 */
export function FaqAccordion({ group }: FaqAccordionProps) {
  const [expanded, toggle] = useReducer(toggleFaq, initialFaqState);

  return (
    <div>
      <SectionHeading>{group.title}</SectionHeading>
      <div>
        {group.items.map((item) => {
          const open = expanded.has(item.id);
          const buttonId = `faq-q-${item.id}`;
          const answerId = `faq-a-${item.id}`;
          return (
            <div key={item.id} className={styles.item}>
              <h3 className={styles.question}>
                <button
                  type="button"
                  id={buttonId}
                  className={styles.button}
                  aria-expanded={open}
                  aria-controls={answerId}
                  onClick={() => toggle(item.id)}
                >
                  <span className={styles.questionText}>{item.question}</span>
                  <Icon name={open ? 'Minus' : 'Plus'} size="md" className={styles.icon} />
                </button>
              </h3>
              <div
                id={answerId}
                role="region"
                aria-labelledby={buttonId}
                className={styles.answer}
                hidden={!open}
              >
                <p>{renderRichText(item.answer)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
