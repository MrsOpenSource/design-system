import React from 'react';
import {
  Radio as RadioCore,
  RadioButton as RadioButtonCore,
  RadioGroup as RadioGroupCore,
} from './SelectionControls.ts';
import type {
  RadioProps,
  RadioOption,
  RadioGroupOrientation,
  RadioGroupProps,
  RadioGroupComponent,
  SelectionControlSize,
} from './SelectionControls.ts';

export type {
  RadioProps,
  RadioOption,
  RadioGroupOrientation,
  RadioGroupProps,
  RadioGroupComponent,
  SelectionControlSize,
};

export const Radio = RadioCore;
export const RadioButton = RadioButtonCore;
export const RadioGroup = RadioGroupCore;
export default RadioGroup;

