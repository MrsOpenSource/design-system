import React from 'react';
import {
  Accordion as AccordionCore,
  AccordionItem as AccordionItemCore,
  AccordionTrigger as AccordionTriggerCore,
  AccordionContent as AccordionContentCore,
} from './Accordion.ts';
import type {
  AccordionProps,
  AccordionVariant,
  AccordionItemData,
  AccordionItemProps,
  AccordionTriggerProps,
  AccordionContentProps,
  AccordionComponent,
} from './Accordion.ts';

export type {
  AccordionProps,
  AccordionVariant,
  AccordionItemData,
  AccordionItemProps,
  AccordionTriggerProps,
  AccordionContentProps,
  AccordionComponent,
};

export const AccordionItem = AccordionItemCore;
export const AccordionTrigger = AccordionTriggerCore;
export const AccordionContent = AccordionContentCore;
export const Accordion = AccordionCore;

export default Accordion;

