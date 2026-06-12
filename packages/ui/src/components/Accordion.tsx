import { Accordion as MantineAccordion } from '@mantine/core';

export type {
  AccordionProps,
  AccordionItemProps,
  AccordionControlProps,
  AccordionPanelProps,
} from '@mantine/core';

/**
 * Clementine Accordion — progressive disclosure for stacked, collapsible sections.
 *
 * Each `AccordionControl` is a native `<button>` exposing `aria-expanded`; the matching
 * `AccordionPanel` is `region`-labelled by it. House default variant is `separated`.
 * See specs/accordion/index.md.
 */
export const Accordion = MantineAccordion;
export const AccordionItem: typeof MantineAccordion.Item = MantineAccordion.Item;
export const AccordionControl: typeof MantineAccordion.Control = MantineAccordion.Control;
export const AccordionPanel: typeof MantineAccordion.Panel = MantineAccordion.Panel;
