import React from 'react';
import {
  DropdownMenu as DropdownMenuCore,
  DropdownMenuTrigger as DropdownMenuTriggerCore,
  DropdownMenuContent as DropdownMenuContentCore,
  DropdownMenuItemComponent as DropdownMenuItemCore,
  DropdownMenuDivider as DropdownMenuDividerCore,
  Select as SelectCore,
  SelectOptionItem as SelectOptionItemCore,
} from './DropdownMenu.ts';
import type {
  DropdownMenuProps,
  DropdownMenuItem,
  DropdownMenuTriggerProps,
  DropdownMenuContentProps,
  DropdownMenuItemProps,
  DropdownMenuDividerProps,
  DropdownMenuComponent,
  SelectProps,
  SelectOption,
  SelectSize,
  SelectOptionProps,
  SelectComponent,
} from './DropdownMenu.ts';

export type {
  DropdownMenuProps,
  DropdownMenuItem,
  DropdownMenuTriggerProps,
  DropdownMenuContentProps,
  DropdownMenuItemProps,
  DropdownMenuDividerProps,
  DropdownMenuComponent,
  SelectProps,
  SelectOption,
  SelectSize,
  SelectOptionProps,
  SelectComponent,
};

export const DropdownMenuTrigger = DropdownMenuTriggerCore;
export const DropdownMenuContent = DropdownMenuContentCore;
export const DropdownMenuItem = DropdownMenuItemCore;
export const DropdownMenuDivider = DropdownMenuDividerCore;
export const Select = SelectCore;
export const SelectOption = SelectOptionItemCore;
export const DropdownMenu = DropdownMenuCore;

export default DropdownMenu;

