import React from 'react';
import { Select as SelectCore, SelectOptionItem as SelectOptionItemCore } from '../molecules/DropdownMenu.ts';
import type { SelectProps, SelectOption, SelectSize, SelectOptionProps, SelectComponent } from '../molecules/DropdownMenu.ts';

export type { SelectProps, SelectOption, SelectSize, SelectOptionProps, SelectComponent };
export const Select = SelectCore;
export const SelectOption = SelectOptionItemCore;
export default Select;

