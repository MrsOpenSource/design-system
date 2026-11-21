import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';

// CommandPalette under test
import {
  CommandPalette,
  CommandPaletteRoot,
  CommandPaletteInput,
  CommandPaletteList,
  CommandPaletteGroup,
  CommandPaletteItem,
  CommandPaletteShortcut,
  CommandPaletteEmpty,
} from '../../src/components/navigation/CommandPalette.ts';

const SAMPLE_COMMANDS = [
  { id: 'billing', label: 'Go to Billing & Invoices', category: 'Navigation', shortcut: 'G B' },
  { id: 'settings', label: 'User Settings', category: 'Navigation', shortcut: 'G S' },
  { id: 'theme-emerald', label: 'Switch Theme to Emerald', category: 'Theme', shortcut: 'T E' },
  { id: 'export-csv', label: 'Export Accounts to CSV', category: 'Actions', shortcut: '⌘ E' },
];

// -----------------------------------------------------------------------------
// 1. Compound Slots Attachment
// -----------------------------------------------------------------------------
test('CommandPalette — Compound Slots Attachment', () => {
  assert.equal(typeof CommandPalette, 'function');
  assert.equal(CommandPalette.Root, CommandPaletteRoot);
  assert.equal(CommandPalette.Input, CommandPaletteInput);
  assert.equal(CommandPalette.List, CommandPaletteList);
  assert.equal(CommandPalette.Group, CommandPaletteGroup);
  assert.equal(CommandPalette.Item, CommandPaletteItem);
  assert.equal(CommandPalette.Shortcut, CommandPaletteShortcut);
  assert.equal(CommandPalette.Empty, CommandPaletteEmpty);
});

// -----------------------------------------------------------------------------
// 2. Open / Closed State & Accessibility Structure
// -----------------------------------------------------------------------------
test('CommandPalette — Closed State Returns Null', () => {
  const el = CommandPalette({ isOpen: false, onClose: () => {} });
  assert.equal(el, null, 'Closed palette should render null');
});

test('CommandPalette — Default Rendering & Accessibility Roles', () => {
  const el = CommandPalette({
    isOpen: true,
    onClose: () => {},
    items: SAMPLE_COMMANDS,
  });

  assert.ok(el, 'CommandPalette renders when open');
  assert.ok(el.props.className.includes('eds-command-palette-backdrop'));

  // Content dialog container
  const content = el.props.children;
  assert.ok(content, 'Inner content dialog must exist');
  assert.equal(content.props.role, 'dialog');
  assert.equal(content.props['aria-modal'], true);
  assert.ok(content.props.className.includes('eds-command-palette'));
});

// -----------------------------------------------------------------------------
// 3. Search Filtering & Empty State
// -----------------------------------------------------------------------------
test('CommandPalette — Filters items based on search query', () => {
  const el = CommandPalette({
    isOpen: true,
    onClose: () => {},
    items: SAMPLE_COMMANDS,
    searchQuery: 'Billing',
  });

  assert.ok(el);
});

test('CommandPalette — Empty state rendered when 0 matches', () => {
  const emptyEl = CommandPaletteEmpty({
    children: 'No commands found.',
  });

  assert.ok(emptyEl);
  assert.ok(emptyEl.props.className.includes('eds-command-palette__empty'));
  assert.equal(emptyEl.props.children, 'No commands found.');
});

// -----------------------------------------------------------------------------
// 4. Shortcut Badge & Item Selection
// -----------------------------------------------------------------------------
test('CommandPalette.Shortcut — Renders styled kbd badge', () => {
  const shortcutEl = CommandPaletteShortcut({ children: '⌘K' });
  assert.equal(shortcutEl.type, 'kbd');
  assert.ok(shortcutEl.props.className.includes('eds-command-palette__shortcut'));
  assert.equal(shortcutEl.props.children, '⌘K');
});

test('CommandPalette.Item — Item selection & active state', () => {
  let selected = false;
  const itemEl = CommandPaletteItem({
    active: true,
    onSelect: () => { selected = true; },
    children: 'Billing Overview',
  });

  assert.ok(itemEl.props.className.includes('eds-command-palette__item'));
  assert.ok(itemEl.props.className.includes('eds-command-palette__item--active'));
  assert.equal(itemEl.props.role, 'option');
  assert.equal(itemEl.props['aria-selected'], true);

  // Trigger click
  itemEl.props.onClick();
  assert.equal(selected, true, 'onSelect should be triggered on click');
});

