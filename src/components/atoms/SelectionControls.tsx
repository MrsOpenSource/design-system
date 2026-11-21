import React from 'react';
import {
  Checkbox as CheckboxCore,
  Radio as RadioCore,
  RadioButton as RadioButtonCore,
  RadioGroup as RadioGroupCore,
  SelectionControls as SelectionControlsCore,
} from './SelectionControls.ts';
import type {
  CheckboxProps,
  RadioProps,
  RadioOption,
  RadioGroupOrientation,
  RadioGroupProps,
  RadioGroupComponent,
  SelectionControlSize,
} from './SelectionControls.ts';

export type {
  CheckboxProps,
  RadioProps,
  RadioOption,
  RadioGroupOrientation,
  RadioGroupProps,
  RadioGroupComponent,
  SelectionControlSize,
};

export const Checkbox = CheckboxCore;
export const Radio = RadioCore;
export const RadioButton = RadioButtonCore;
export const RadioGroup = RadioGroupCore;
export const SelectionControls = SelectionControlsCore;

export default SelectionControls;

