import test from 'node:test';
import assert from 'node:assert/strict';

// Import SelectionControls primitives under test
import { Checkbox, Radio, RadioButton, RadioGroup } from '../../src/components/atoms/SelectionControls.ts';

// ============================================================================
// CHECKBOX TESTS
// ============================================================================

test('Checkbox — Default Rendering & Instantiation', () => {
  const element = Checkbox({ label: 'Subscribe to newsletter' });

  assert.ok(element, 'Checkbox element should be created');
  assert.equal(element.type, 'label', 'Checkbox root element should be a <label>');
  assert.ok(
    element.props.className.includes('eds-checkbox'),
    `Expected className to contain "eds-checkbox", got "${element.props.className}"`
  );

  // Find native input among children
  const children = Array.isArray(element.props.children) ? element.props.children : [element.props.children];
  const inputEl = children.find((c) => c && c.type === 'input');
  assert.ok(inputEl, 'Native input element must exist within label');
  assert.equal(inputEl.props.type, 'checkbox');
  assert.equal(inputEl.props.checked, false);
  assert.equal(inputEl.props.disabled, false);
});

test('Checkbox — Checked State & Indicator', () => {
  const element = Checkbox({ checked: true, label: 'Active Option' });
  assert.ok(element.props.className.includes('eds-checkbox--checked'));

  const children = Array.isArray(element.props.children) ? element.props.children : [element.props.children];
  const inputEl = children.find((c) => c && c.type === 'input');
  assert.equal(inputEl.props.checked, true);
  assert.equal(inputEl.props['aria-checked'], 'true');

  // Verify visual indicator element
  const controlEl = children.find(
    (c) => c && c.props && c.props.className && c.props.className.includes('eds-checkbox__control')
  );
  assert.ok(controlEl, 'Checkbox custom indicator control must exist');
  assert.equal(
    controlEl.props.style.backgroundColor,
    'var(--sys-color-brand-primary, #2563EB)',
    'Checked box must have primary brand background'
  );
});

test('Checkbox — Indeterminate State', () => {
  const element = Checkbox({ indeterminate: true, label: 'Select All' });
  assert.ok(element.props.className.includes('eds-checkbox--indeterminate'));

  const children = Array.isArray(element.props.children) ? element.props.children : [element.props.children];
  const inputEl = children.find((c) => c && c.type === 'input');
  assert.equal(inputEl.props['aria-checked'], 'mixed', 'Indeterminate checkbox must have aria-checked="mixed"');

  const controlEl = children.find(
    (c) => c && c.props && c.props.className && c.props.className.includes('eds-checkbox__control')
  );
  assert.ok(controlEl, 'Checkbox control must exist');
  assert.equal(
    controlEl.props.style.backgroundColor,
    'var(--sys-color-brand-primary, #2563EB)',
    'Indeterminate box must have primary brand background'
  );
});

test('Checkbox — Sizes (sm, md, lg)', () => {
  const sm = Checkbox({ size: 'sm', label: 'Small' });
  assert.ok(sm.props.className.includes('eds-checkbox--sm'));

  const md = Checkbox({ size: 'md', label: 'Medium' });
  assert.ok(md.props.className.includes('eds-checkbox--md'));

  const lg = Checkbox({ size: 'lg', label: 'Large' });
  assert.ok(lg.props.className.includes('eds-checkbox--lg'));
});

test('Checkbox — Label, Helper Text & Error State', async (t) => {
  await t.test('Renders label and helperText', () => {
    const el = Checkbox({
      label: 'Telemetry Data',
      helperText: 'Send anonymous crash logs to improve service',
    });
    const children = Array.isArray(el.props.children) ? el.props.children : [el.props.children];
    const textContainer = children.find(
      (c) => c && c.props && c.props.className && c.props.className.includes('eds-checkbox__label-container')
    );
    assert.ok(textContainer, 'Label container must be present');

    const subChildren = Array.isArray(textContainer.props.children)
      ? textContainer.props.children
      : [textContainer.props.children];
    const labelSpan = subChildren.find(
      (c) => c && c.props && c.props.className && c.props.className.includes('eds-checkbox__label')
    );
    const helperSpan = subChildren.find(
      (c) => c && c.props && c.props.className && c.props.className.includes('eds-checkbox__helper-text')
    );
    assert.ok(labelSpan, 'Label span must exist');
    assert.equal(labelSpan.props.children, 'Telemetry Data');
    assert.ok(helperSpan, 'Helper text span must exist');
    assert.equal(helperSpan.props.children, 'Send anonymous crash logs to improve service');
    assert.equal(helperSpan.props.style.color, 'var(--sys-color-text-secondary, #475569)');
  });

  await t.test('Error state renders error message & aria-invalid', () => {
    const el = Checkbox({
      label: 'Terms of Service',
      error: 'You must accept the terms to proceed',
    });
    assert.ok(el.props.className.includes('eds-checkbox--error'));

    const children = Array.isArray(el.props.children) ? el.props.children : [el.props.children];
    const inputEl = children.find((c) => c && c.type === 'input');
    assert.equal(inputEl.props['aria-invalid'], 'true');

    const textContainer = children.find(
      (c) => c && c.props && c.props.className && c.props.className.includes('eds-checkbox__label-container')
    );
    const subChildren = Array.isArray(textContainer.props.children)
      ? textContainer.props.children
      : [textContainer.props.children];
    const errorSpan = subChildren.find(
      (c) => c && c.props && c.props.className && c.props.className.includes('eds-checkbox__error')
    );
    assert.ok(errorSpan, 'Error span must exist');
    assert.equal(errorSpan.props.children, 'You must accept the terms to proceed');
    assert.equal(errorSpan.props.style.color, 'var(--sys-color-status-danger-text, #991B1B)');
  });
});

test('Checkbox — Disabled State', () => {
  const el = Checkbox({ disabled: true, label: 'Locked feature' });
  assert.ok(el.props.className.includes('eds-checkbox--disabled'));
  assert.equal(el.props.style.cursor, 'not-allowed');
  assert.equal(el.props.style.opacity, 0.6);

  const children = Array.isArray(el.props.children) ? el.props.children : [el.props.children];
  const inputEl = children.find((c) => c && c.type === 'input');
  assert.equal(inputEl.props.disabled, true);
  assert.equal(inputEl.props['aria-disabled'], 'true');
});

test('Checkbox — Custom ClassName & Style Merging', () => {
  const el = Checkbox({
    className: 'custom-chk',
    style: { marginTop: '16px' },
    label: 'Custom',
  });
  assert.ok(el.props.className.includes('custom-chk'));
  assert.ok(el.props.className.includes('eds-checkbox'));
  assert.equal(el.props.style.marginTop, '16px');
});

// ============================================================================
// RADIO & RADIOBUTTON TESTS
// ============================================================================

test('Radio — Default Rendering & Instantiation', () => {
  const element = Radio({ value: 'standard', label: 'Standard Tier' });

  assert.ok(element, 'Radio element should be created');
  assert.equal(element.type, 'label', 'Radio root element should be a <label>');
  assert.ok(
    element.props.className.includes('eds-radio'),
    `Expected className to contain "eds-radio", got "${element.props.className}"`
  );

  const children = Array.isArray(element.props.children) ? element.props.children : [element.props.children];
  const inputEl = children.find((c) => c && c.type === 'input');
  assert.ok(inputEl, 'Native radio input element must exist');
  assert.equal(inputEl.props.type, 'radio');
  assert.equal(inputEl.props.value, 'standard');
  assert.equal(inputEl.props.checked, false);

  const controlEl = children.find(
    (c) => c && c.props && c.props.className && c.props.className.includes('eds-radio__control')
  );
  assert.ok(controlEl, 'Radio custom indicator control must exist');
  assert.equal(controlEl.props.style.borderRadius, '9999px', 'Radio must have circular border-radius');
});

test('Radio — Checked State & Dot Indicator', () => {
  const element = Radio({ checked: true, value: 'pro', label: 'Pro Tier' });
  assert.ok(element.props.className.includes('eds-radio--checked'));

  const children = Array.isArray(element.props.children) ? element.props.children : [element.props.children];
  const inputEl = children.find((c) => c && c.type === 'input');
  assert.equal(inputEl.props.checked, true);
  assert.equal(inputEl.props['aria-checked'], 'true');

  const controlEl = children.find(
    (c) => c && c.props && c.props.className && c.props.className.includes('eds-radio__control')
  );
  assert.ok(controlEl, 'Radio control must exist');
  assert.equal(controlEl.props.style.borderColor, 'var(--sys-color-brand-primary, #2563EB)');

  // Inner dot verification
  const innerDot = controlEl.props.children;
  assert.ok(innerDot, 'Inner dot indicator must exist when checked');
  assert.equal(innerDot.props.style.backgroundColor, 'var(--sys-color-brand-primary, #2563EB)');
});

test('Radio — Disabled State', () => {
  const el = Radio({ disabled: true, value: 'enterprise', label: 'Enterprise' });
  assert.ok(el.props.className.includes('eds-radio--disabled'));
  assert.equal(el.props.style.cursor, 'not-allowed');

  const children = Array.isArray(el.props.children) ? el.props.children : [el.props.children];
  const inputEl = children.find((c) => c && c.type === 'input');
  assert.equal(inputEl.props.disabled, true);
  assert.equal(inputEl.props['aria-disabled'], 'true');
});

test('Radio — RadioButton is an identical alias', () => {
  assert.equal(RadioButton, Radio, 'RadioButton must be an alias for Radio');
});

// ============================================================================
// RADIOGROUP TESTS
// ============================================================================

test('RadioGroup — Group Instantiation & Role', () => {
  const group = RadioGroup({
    name: 'plan',
    label: 'Select Plan',
    options: [
      { value: 'free', label: 'Free ($0/mo)' },
      { value: 'pro', label: 'Pro ($29/mo)', helperText: 'Most popular' },
      { value: 'enterprise', label: 'Enterprise (Custom)', disabled: true },
    ],
  });

  assert.ok(group, 'RadioGroup element should be created');
  assert.equal(group.type, 'div');
  assert.ok(group.props.className.includes('eds-radio-group'));
  assert.equal(group.props.role, 'radiogroup', 'RadioGroup must have role="radiogroup"');
  assert.ok(group.props['aria-label'] || group.props['aria-labelledby'], 'Group must have accessible label');
});

test('RadioGroup — Controlled Value Propagation to Options', () => {
  const group = RadioGroup({
    name: 'billing-cycle',
    value: 'annual',
    options: [
      { value: 'monthly', label: 'Monthly' },
      { value: 'annual', label: 'Annual (Save 20%)' },
    ],
  });

  const children = Array.isArray(group.props.children) ? group.props.children : [group.props.children];
  // Flatten in case children contain label header + options container
  const optionsContainer = children.find(
    (c) => c && c.props && c.props.className && c.props.className.includes('eds-radio-group__options')
  ) || group;

  const optionItems = Array.isArray(optionsContainer.props.children)
    ? optionsContainer.props.children
    : [optionsContainer.props.children];

  assert.equal(optionItems.length, 2, 'Should render 2 options');

  // Verify first option (monthly) is unchecked
  const opt1 = optionItems[0];
  assert.equal(opt1.props.checked, false);
  assert.equal(opt1.props.name, 'billing-cycle');

  // Verify second option (annual) is checked
  const opt2 = optionItems[1];
  assert.equal(opt2.props.checked, true);
  assert.equal(opt2.props.name, 'billing-cycle');
});

test('RadioGroup — Orientation (vertical vs horizontal)', () => {
  const verticalGroup = RadioGroup({
    orientation: 'vertical',
    options: [{ value: '1', label: 'One' }],
  });
  assert.ok(verticalGroup.props.className.includes('eds-radio-group--vertical'));

  const horizontalGroup = RadioGroup({
    orientation: 'horizontal',
    options: [{ value: '1', label: 'One' }],
  });
  assert.ok(horizontalGroup.props.className.includes('eds-radio-group--horizontal'));
});

test('RadioGroup — Compound Children API (<RadioGroup.Item /> or <Radio />)', () => {
  assert.equal(typeof RadioGroup.Item, 'function', 'RadioGroup.Item should be attached');
  assert.equal(RadioGroup.Item, Radio, 'RadioGroup.Item should equal Radio');

  const group = RadioGroup({
    name: 'storage',
    value: 's3',
    children: [
      RadioGroup.Item({ value: 'local', label: 'Local Disk' }),
      RadioGroup.Item({ value: 's3', label: 'Amazon S3' }),
    ],
  });

  assert.ok(group.props.className.includes('eds-radio-group'));
  const children = Array.isArray(group.props.children) ? group.props.children : [group.props.children];
  assert.equal(children.length, 2);
});

test('RadioGroup — Group Error State', () => {
  const group = RadioGroup({
    name: 'choice',
    error: 'Please select a deployment region',
    options: [{ value: 'us-east', label: 'US East' }],
  });

  assert.ok(group.props.className.includes('eds-radio-group--error'));
  assert.equal(group.props['aria-invalid'], 'true');

  const children = Array.isArray(group.props.children) ? group.props.children : [group.props.children];
  const errorEl = children.find(
    (c) => c && c.props && c.props.className && c.props.className.includes('eds-radio-group__error')
  );
  assert.ok(errorEl, 'Group error message must be rendered');
  assert.equal(errorEl.props.children, 'Please select a deployment region');
});
