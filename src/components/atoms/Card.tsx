import React from 'react';
import {
  Card as CardCore,
  CardHeader as CardHeaderCore,
  CardBody as CardBodyCore,
  CardFooter as CardFooterCore,
  cardVariants,
} from './Card.ts';
import type {
  CardProps,
  CardHeaderProps,
  CardBodyProps,
  CardFooterProps,
  CardVariant,
  CardComponent,
} from './Card.ts';

export { cardVariants };
export type { CardProps, CardHeaderProps, CardBodyProps, CardFooterProps, CardVariant, CardComponent };
export const CardHeader = CardHeaderCore;
export const CardBody = CardBodyCore;
export const CardFooter = CardFooterCore;
export const Card = CardCore;

export default Card;
