import test from 'node:test';
import assert from 'node:assert/strict';

// Import Select and DropdownMenu primitives under test
import { Select, DropdownMenu } from '../../src/components/molecules/DropdownMenu.ts';

// ============================================================================
// SELECT (EXPOSED DROPDOWN FORM CONTROL) TESTS
// ============================================================================

test('Select — Default Rendering & Instantiation', () => {
  const element = Select({
    placeholder: 'Select an environment...',
    options: [
      { value: 'dev', label: 'Development' },
      { value: 'staging', label: 'Staging' },
      { value: 'prod', label: 'Production' },
    ],
  });

  assert.ok(element, 'Select element should be created');
  assert.equal(element.type, 'div', 'Select root container should be a <div>');
  assert.ok(
    element.props.className.includes('eds-select-container'),
    `Expected className to contain "eds-select-container", got "${element.props.className}"`
  );

  const children = Array.isArray(element.props.children) ? element.props.children : [element.props.children];
  const triggerEl = children.find(
    (c) => c && c.props && c.props.className && c.props.className.includes('eds-select__trigger')
  );
  assert.ok(triggerEl, 'Trigger button must exist within container');
  assert.equal(triggerEl.props.role, 'combobox');
  assert.equal(triggerEl.props['aria-haspopup'], 'listbox');
  assert.equal(triggerEl.props['aria-expanded'], false);

  // Verify placeholder is rendered
  const triggerChildren = Array.isArray(triggerEl.props.children)
    ? triggerEl.props.children
    : [triggerEl.props.children];
  const labelSpan = triggerChildren.find(
    (c) => c && c.props && c.props.className && c.props.className.includes('eds-select__value')
  );
  assert.ok(labelSpan, 'Value span must exist');
  assert.equal(labelSpan.props.children, 'Select an environment...');
  assert.equal(labelSpan.props.style.color, 'var(--sys-color-text-tertiary, #94A3B8)');
});

test('Select — Controlled Value Display', () => {
  const element = Select({
    value: 'prod',
    options: [
      { value: 'dev', label: 'Development' },
      { value: 'staging', label: 'Staging' },
      { value: 'prod', label: 'Production' },
    ],
  });

  const children = Array.isArray(element.props.children) ? element.props.children : [element.props.children];
  const triggerEl = children.find(
    (c) => c && c.props && c.props.className && c.props.className.includes('eds-select__trigger')
  );
  const triggerChildren = Array.isArray(triggerEl.props.children)
    ? triggerEl.props.children
    : [triggerEl.props.children];
  const valueSpan = triggerChildren.find(
    (c) => c && c.props && c.props.className && c.props.className.includes('eds-select__value')
  );

  assert.equal(valueSpan.props.children, 'Production', 'Should display selected option label');
  assert.equal(valueSpan.props.style.color, 'var(--sys-color-text-primary, #0F172A)');
});

test('Select — Open State & Listbox Rendering', () => {
  const element = Select({
    isOpen: true,
    value: 'staging',
    options: [
      { value: 'dev', label: 'Development' },
      { value: 'staging', label: 'Staging' },
      { value: 'prod', label: 'Production' },
    ],
  });

  const children = Array.isArray(element.props.children) ? element.props.children : [element.props.children];
  const triggerEl = children.find(
    (c) => c && c.props && c.props.className && c.props.className.includes('eds-select__trigger')
  );
  assert.equal(triggerEl.props['aria-expanded'], true);

  const listboxEl = children.find(
    (c) => c && c.props && c.props.className && c.props.className.includes('eds-select__listbox')
  );
  assert.ok(listboxEl, 'Listbox popup must be rendered when isOpen is true');
  assert.equal(listboxEl.props.role, 'listbox');

  const options = Array.isArray(listboxEl.props.children) ? listboxEl.props.children : [listboxEl.props.children];
  assert.equal(options.length, 3, 'Must render 3 option elements');

  // Second option should have aria-selected="true"
  const selectedOption = options[1];
  assert.equal(selectedOption.props.role, 'option');
  assert.equal(selectedOption.props['aria-selected'], 'true');
  assert.ok(selectedOption.props.className.includes('eds-select__option--selected'));
});

test('Select — Label, Helper Text & Error Validation', async (t) => {
  await t.test('Renders label and helperText', () => {
    const el = Select({
      label: 'Region',
      helperText: 'Choose the closest geographic cluster',
      options: [{ value: 'us', label: 'US East' }],
    });

    const children = Array.isArray(el.props.children) ? el.props.children : [el.props.children];
    const labelEl = children.find(
      (c) => c && c.props && c.props.className && c.props.className.includes('eds-select__label')
    );
    assert.ok(labelEl, 'Label must exist');
    assert.equal(labelEl.props.children, 'Region');

    const helperEl = children.find(
      (c) => c && c.props && c.props.className && c.props.className.includes('eds-select__helper-text')
    );
    assert.ok(helperEl, 'Helper text must exist');
    assert.equal(helperEl.props.children, 'Choose the closest geographic cluster');
  });

  await t.test('Error state renders error message & aria-invalid', () => {
    const el = Select({
      label: 'Region',
      error: 'Region selection is mandatory',
      options: [{ value: 'us', label: 'US East' }],
    });

    assert.ok(el.props.className.includes('eds-select-container--error'));

    const children = Array.isArray(el.props.children) ? el.props.children : [el.props.children];
    const triggerEl = children.find(
      (c) => c && c.props && c.props.className && c.props.className.includes('eds-select__trigger')
    );
    assert.equal(triggerEl.props['aria-invalid'], 'true');
    assert.ok(triggerEl.props.style.border.includes('var(--sys-color-status-danger-border, #EF4444)'));

    const errorEl = children.find(
      (c) => c && c.props && c.props.className && c.props.className.includes('eds-select__error')
    );
    assert.ok(errorEl, 'Error element must exist');
    assert.equal(errorEl.props.children, 'Region selection is mandatory');
    assert.equal(errorEl.props.style.color, 'var(--sys-color-status-danger-text, #991B1B)');
  });
});

test('Select — Disabled State', () => {
  const el = Select({
    disabled: true,
    options: [{ value: '1', label: 'One' }],
  });

  assert.ok(el.props.className.includes('eds-select-container--disabled'));

  const children = Array.isArray(el.props.children) ? el.props.children : [el.props.children];
  const triggerEl = children.find(
    (c) => c && c.props && c.props.className && c.props.className.includes('eds-select__trigger')
  );
  assert.equal(triggerEl.props.disabled, true);
  assert.equal(triggerEl.props['aria-disabled'], 'true');
  assert.equal(triggerEl.props.style.cursor, 'not-allowed');
});

test('Select — Compound Slots Attachment', () => {
  assert.equal(typeof Select.Option, 'function', 'Select.Option should be attached');
});

// ============================================================================
// DROPDOWNMENU (CONTEXTUAL ACTION MENU) TESTS
// ============================================================================

test('DropdownMenu — Default Instantiation & Structure', () => {
  const menu = DropdownMenu({
    trigger: 'Actions',
    items: [
      { id: 'edit', label: 'Edit Record' },
      { id: 'duplicate', label: 'Duplicate' },
      { divider: true },
      { id: 'delete', label: 'Delete', danger: true },
    ],
  });

  assert.ok(menu, 'DropdownMenu element should be created');
  assert.equal(menu.type, 'div');
  assert.ok(
    menu.props.className.includes('eds-dropdown-menu'),
    `Expected className to contain "eds-dropdown-menu", got "${menu.props.className}"`
  );

  const children = Array.isArray(menu.props.children) ? menu.props.children : [menu.props.children];
  const triggerEl = children.find(
    (c) => c && c.props && c.props.className && c.props.className.includes('eds-dropdown-menu__trigger')
  );
  assert.ok(triggerEl, 'Trigger element must exist');
  assert.equal(triggerEl.props['aria-haspopup'], 'menu');
  assert.equal(triggerEl.props['aria-expanded'], false);
});

test('DropdownMenu — Open State & Menu Items', () => {
  const menu = DropdownMenu({
    isOpen: true,
    trigger: 'Options',
    items: [
      { id: 'view', label: 'View Details' },
      { divider: true },
      { id: 'delete', label: 'Delete', danger: true },
    ],
  });

  const children = Array.isArray(menu.props.children) ? menu.props.children : [menu.props.children];
  const triggerEl = children.find(
    (c) => c && c.props && c.props.className && c.props.className.includes('eds-dropdown-menu__trigger')
  );
  assert.equal(triggerEl.props['aria-expanded'], true);

  const contentEl = children.find(
    (c) => c && c.props && c.props.className && c.props.className.includes('eds-dropdown-menu__content')
  );
  assert.ok(contentEl, 'Menu content panel must be rendered when isOpen is true');
  assert.equal(contentEl.props.role, 'menu');
  assert.equal(contentEl.props.style.backgroundColor, 'var(--sys-color-surface-elevated, #FFFFFF)');

  const menuItems = Array.isArray(contentEl.props.children) ? contentEl.props.children : [contentEl.props.children];
  assert.equal(menuItems.length, 3, 'Must render 2 items and 1 divider');

  // Verify first item
  const item1 = menuItems[0];
  assert.equal(item1.props.role, 'menuitem');
  assert.ok(item1.props.className.includes('eds-dropdown-menu__item'));

  // Verify divider
  const divider = menuItems[1];
  assert.equal(divider.props.role, 'separator');
  assert.ok(divider.props.className.includes('eds-dropdown-menu__divider'));

  // Verify danger item
  const item3 = menuItems[2];
  assert.equal(item3.props.role, 'menuitem');
  assert.ok(item3.props.className.includes('eds-dropdown-menu__item--danger'));
  assert.equal(item3.props.style.color, 'var(--sys-color-status-danger-text, #991B1B)');
});

test('DropdownMenu — Alignment (left vs right)', () => {
  const leftMenu = DropdownMenu({
    isOpen: true,
    align: 'left',
    items: [{ id: '1', label: 'Item' }],
  });
  const leftChildren = Array.isArray(leftMenu.props.children) ? leftMenu.props.children : [leftMenu.props.children];
  const leftContent = leftChildren.find(
    (c) => c && c.props && c.props.className && c.props.className.includes('eds-dropdown-menu__content')
  );
  assert.equal(leftContent.props.style.left, '0px');

  const rightMenu = DropdownMenu({
    isOpen: true,
    align: 'right',
    items: [{ id: '1', label: 'Item' }],
  });
  const rightChildren = Array.isArray(rightMenu.props.children) ? rightMenu.props.children : [rightMenu.props.children];
  const rightContent = rightChildren.find(
    (c) => c && c.props && c.props.className && c.props.className.includes('eds-dropdown-menu__content')
  );
  assert.equal(rightContent.props.style.right, '0px');
});

test('DropdownMenu — Compound Anatomy Attachment', () => {
  assert.equal(typeof DropdownMenu.Trigger, 'function');
  assert.equal(typeof DropdownMenu.Content, 'function');
  assert.equal(typeof DropdownMenu.Item, 'function');
  assert.equal(typeof DropdownMenu.Divider, 'function');
});

