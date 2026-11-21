import test from 'node:test';
import assert from 'node:assert/strict';

// Import Textarea primitive under test
import { Textarea } from '../../src/components/atoms/Textarea.ts';

test('Textarea — Default Rendering & Instantiation', () => {
  const element = Textarea({ placeholder: 'Enter your notes here...' });

  assert.ok(element, 'Textarea element should be created');
  assert.equal(element.type, 'div', 'Root container should be a <div>');
  assert.ok(
    element.props.className.includes('eds-textarea-container'),
    `Expected className to contain "eds-textarea-container", got "${element.props.className}"`
  );

  const children = Array.isArray(element.props.children) ? element.props.children : [element.props.children];
  const textareaEl = children.find((c) => c && c.type === 'textarea');
  assert.ok(textareaEl, 'Native <textarea> element must exist within container');
  assert.ok(textareaEl.props.className.includes('eds-textarea'));
  assert.equal(textareaEl.props.placeholder, 'Enter your notes here...');
  assert.equal(textareaEl.props.rows, 3, 'Default rows should be 3');
  assert.equal(textareaEl.props.disabled, false);
});

test('Textarea — Custom ClassName & Style Merging', () => {
  const element = Textarea({
    className: 'custom-textarea-class',
    style: { maxWidth: '500px' },
    placeholder: 'Custom Styled',
  });

  assert.ok(element.props.className.includes('custom-textarea-class'));
  assert.ok(element.props.className.includes('eds-textarea-container'));
  assert.equal(element.props.style.maxWidth, '500px');
});

test('Textarea — Variants & Token Purity', async (t) => {
  await t.test('Variant: outlined (default)', () => {
    const el = Textarea({ variant: 'outlined' });
    const children = Array.isArray(el.props.children) ? el.props.children : [el.props.children];
    const wrapper = children.find(
      (c) => c && c.props && c.props.className && c.props.className.includes('eds-textarea__wrapper')
    ) || el;
    assert.ok(el.props.className.includes('eds-textarea-container--outlined'));
    assert.equal(wrapper.props.style.backgroundColor, 'var(--sys-color-surface-card, #FFFFFF)');
    assert.ok(wrapper.props.style.border.includes('var(--sys-color-border-default, #CBD5E1)'));
  });

  await t.test('Variant: filled', () => {
    const el = Textarea({ variant: 'filled' });
    const children = Array.isArray(el.props.children) ? el.props.children : [el.props.children];
    const wrapper = children.find(
      (c) => c && c.props && c.props.className && c.props.className.includes('eds-textarea__wrapper')
    ) || el;
    assert.ok(el.props.className.includes('eds-textarea-container--filled'));
    assert.equal(wrapper.props.style.backgroundColor, 'var(--sys-color-surface-sunken, #F1F5F9)');
  });
});

test('Textarea — Label, Helper Text & Error Validation', async (t) => {
  await t.test('Renders label and helperText', () => {
    const el = Textarea({
      label: 'Prompt Instructions',
      helperText: 'Provide system context for the LLM agent',
    });

    const children = Array.isArray(el.props.children) ? el.props.children : [el.props.children];
    const labelEl = children.find(
      (c) => c && c.props && c.props.className && c.props.className.includes('eds-textarea__label')
    );
    assert.ok(labelEl, 'Label element must be present');
    assert.equal(labelEl.props.children, 'Prompt Instructions');
    assert.equal(labelEl.props.style.color, 'var(--sys-color-text-primary, #0F172A)');

    const footerEl = children.find(
      (c) => c && c.props && c.props.className && c.props.className.includes('eds-textarea__footer')
    );
    assert.ok(footerEl, 'Footer container must exist');

    const footerChildren = Array.isArray(footerEl.props.children)
      ? footerEl.props.children
      : [footerEl.props.children];
    const helperEl = footerChildren.find(
      (c) => c && c.props && c.props.className && c.props.className.includes('eds-textarea__helper-text')
    );
    assert.ok(helperEl, 'Helper text must exist in footer');
    assert.equal(helperEl.props.children, 'Provide system context for the LLM agent');
    assert.equal(helperEl.props.style.color, 'var(--sys-color-text-secondary, #475569)');
  });

  await t.test('Error state renders error message & aria-invalid', () => {
    const el = Textarea({
      label: 'Feedback',
      error: 'Feedback cannot be empty',
    });

    assert.ok(el.props.className.includes('eds-textarea-container--error'));

    const children = Array.isArray(el.props.children) ? el.props.children : [el.props.children];
    const textareaEl = children.find((c) => c && c.type === 'textarea');
    assert.equal(textareaEl.props['aria-invalid'], 'true');

    const wrapper = children.find(
      (c) => c && c.props && c.props.className && c.props.className.includes('eds-textarea__wrapper')
    );
    assert.ok(wrapper.props.style.border.includes('var(--sys-color-status-danger-border, #EF4444)'));

    const footerEl = children.find(
      (c) => c && c.props && c.props.className && c.props.className.includes('eds-textarea__footer')
    );
    const footerChildren = Array.isArray(footerEl.props.children)
      ? footerEl.props.children
      : [footerEl.props.children];
    const errorEl = footerChildren.find(
      (c) => c && c.props && c.props.className && c.props.className.includes('eds-textarea__error')
    );
    assert.ok(errorEl, 'Error element must exist in footer');
    assert.equal(errorEl.props.children, 'Feedback cannot be empty');
    assert.equal(errorEl.props.style.color, 'var(--sys-color-status-danger-text, #991B1B)');
  });
});

test('Textarea — Character Counter (maxLength & showCount)', async (t) => {
  await t.test('Displays tally with maxLength (e.g. 11 / 200)', () => {
    const el = Textarea({
      value: 'Hello World',
      maxLength: 200,
      showCount: true,
    });

    const children = Array.isArray(el.props.children) ? el.props.children : [el.props.children];
    const footerEl = children.find(
      (c) => c && c.props && c.props.className && c.props.className.includes('eds-textarea__footer')
    );
    assert.ok(footerEl, 'Footer container must exist for character counter');

    const footerChildren = Array.isArray(footerEl.props.children)
      ? footerEl.props.children
      : [footerEl.props.children];
    const counterEl = footerChildren.find(
      (c) => c && c.props && c.props.className && c.props.className.includes('eds-textarea__counter')
    );
    assert.ok(counterEl, 'Counter element must exist');
    assert.equal(counterEl.props.children, '11 / 200');
    assert.equal(counterEl.props.style.fontVariantNumeric, 'tabular-nums');
  });

  await t.test('Displays count without maxLength (e.g. 11)', () => {
    const el = Textarea({
      value: 'Hello World',
      showCount: true,
    });

    const children = Array.isArray(el.props.children) ? el.props.children : [el.props.children];
    const footerEl = children.find(
      (c) => c && c.props && c.props.className && c.props.className.includes('eds-textarea__footer')
    );
    const footerChildren = Array.isArray(footerEl.props.children)
      ? footerEl.props.children
      : [footerEl.props.children];
    const counterEl = footerChildren.find(
      (c) => c && c.props && c.props.className && c.props.className.includes('eds-textarea__counter')
    );
    assert.ok(counterEl, 'Counter element must exist');
    assert.equal(counterEl.props.children, '11');
  });
});

test('Textarea — Auto-Expanding (autoExpand prop)', () => {
  const el = Textarea({
    autoExpand: true,
    rows: 4,
  });

  const children = Array.isArray(el.props.children) ? el.props.children : [el.props.children];
  const textareaEl = children.find((c) => c && c.type === 'textarea');
  assert.ok(textareaEl);
  assert.equal(textareaEl.props['data-auto-expand'], 'true');
  assert.equal(textareaEl.props.style.resize, 'none', 'Auto-expand should disable manual resize');
  assert.equal(textareaEl.props.rows, 4);
});

test('Textarea — Disabled and ReadOnly States', () => {
  const disabledEl = Textarea({ disabled: true, value: 'Disabled content' });
  assert.ok(disabledEl.props.className.includes('eds-textarea-container--disabled'));

  const children = Array.isArray(disabledEl.props.children) ? disabledEl.props.children : [disabledEl.props.children];
  const textareaEl = children.find((c) => c && c.type === 'textarea');
  assert.equal(textareaEl.props.disabled, true);
  assert.equal(textareaEl.props['aria-disabled'], 'true');

  const wrapper = children.find(
    (c) => c && c.props && c.props.className && c.props.className.includes('eds-textarea__wrapper')
  );
  assert.equal(wrapper.props.style.backgroundColor, 'var(--sys-color-surface-sunken, #F1F5F9)');
  assert.equal(wrapper.props.style.cursor, 'not-allowed');

  const readOnlyEl = Textarea({ readOnly: true, value: 'Read only content' });
  const roChildren = Array.isArray(readOnlyEl.props.children) ? readOnlyEl.props.children : [readOnlyEl.props.children];
  const roTextarea = roChildren.find((c) => c && c.type === 'textarea');
  assert.equal(roTextarea.props.readOnly, true);
});

