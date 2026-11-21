import test from 'node:test';
import assert from 'node:assert/strict';

// Core CVA & cx utilities
import { cva, cx } from '../../src/core/cva.ts';

// Standardized component variants
import { buttonVariants, Button } from '../../src/components/atoms/Button.ts';
import { badgeVariants, Badge } from '../../src/components/atoms/Badge.ts';
import { inputVariants, Input } from '../../src/components/atoms/Input.ts';
import { cardVariants, Card } from '../../src/components/atoms/Card.ts';
import { textareaVariants, Textarea } from '../../src/components/atoms/Textarea.ts';

// -----------------------------------------------------------------------------
// 1. Core cva & cx Unit Tests
// -----------------------------------------------------------------------------
test('cva core — Base Class & Default Resolution', () => {
  const component = cva('base-element', {
    variants: {
      intent: {
        primary: 'intent-primary',
        secondary: 'intent-secondary',
      },
      size: {
        sm: 'size-sm',
        lg: 'size-lg',
      },
    },
    defaultVariants: {
      intent: 'primary',
      size: 'sm',
    },
  });

  // Call with no arguments -> defaults applied
  assert.equal(component(), 'base-element intent-primary size-sm');

  // Call with empty object -> defaults applied
  assert.equal(component({}), 'base-element intent-primary size-sm');

  // Variant overrides
  assert.equal(
    component({ intent: 'secondary', size: 'lg' }),
    'base-element intent-secondary size-lg'
  );
});

test('cva core — Custom ClassName and Class merging', () => {
  const component = cva('btn', {
    variants: {
      tone: { dark: 'btn-dark', light: 'btn-light' },
    },
    defaultVariants: { tone: 'dark' },
  });

  // className prop
  assert.equal(
    component({ className: 'my-custom-btn' }),
    'btn btn-dark my-custom-btn'
  );

  // class prop alias
  assert.equal(
    component({ class: 'another-custom-btn' }),
    'btn btn-dark another-custom-btn'
  );

  // Both class and className
  assert.equal(
    component({ class: 'foo', className: 'bar' }),
    'btn btn-dark foo bar'
  );
});

test('cva core — Compound Variants Matching', () => {
  const badge = cva('badge', {
    variants: {
      variant: { solid: 'badge-solid', outline: 'badge-outline' },
      color: { red: 'color-red', blue: 'color-blue' },
    },
    compoundVariants: [
      {
        variant: 'solid',
        color: 'red',
        class: 'compound-solid-red',
      },
      {
        variant: 'outline',
        color: 'blue',
        className: 'compound-outline-blue',
      },
    ],
    defaultVariants: {
      variant: 'solid',
      color: 'red',
    },
  });

  // Default triggers compound variant { variant: 'solid', color: 'red' }
  assert.equal(badge(), 'badge badge-solid color-red compound-solid-red');

  // Matching second compound variant
  assert.equal(
    badge({ variant: 'outline', color: 'blue' }),
    'badge badge-outline color-blue compound-outline-blue'
  );

  // Non-matching pair triggers no compound class
  assert.equal(
    badge({ variant: 'solid', color: 'blue' }),
    'badge badge-solid color-blue'
  );
});

test('cva core — Boolean & Array Variants', () => {
  const box = cva(['box-base', 'flex'], {
    variants: {
      active: {
        true: 'box-active ring-2',
        false: 'box-inactive opacity-50',
      },
      rounded: {
        true: 'rounded-full',
      },
    },
    defaultVariants: {
      active: false,
    },
  });

  assert.equal(box(), 'box-base flex box-inactive opacity-50');
  assert.equal(box({ active: true, rounded: true }), 'box-base flex box-active ring-2 rounded-full');
});

test('cx utility — Conditionals, Arrays, and Null Safety', () => {
  assert.equal(cx('a', false && 'b', 'c', undefined, null, 0, 'd'), 'a c d');
  assert.equal(cx(['px-4', 'py-2'], { 'font-bold': true, 'hidden': false }), 'px-4 py-2 font-bold');
  assert.equal(cx(), '');
});

// -----------------------------------------------------------------------------
// 2. Button Variant Standardization
// -----------------------------------------------------------------------------
test('buttonVariants — Default resolution & Variants', () => {
  // Defaults
  const defaultClasses = buttonVariants();
  assert.ok(defaultClasses.includes('eds-btn'));
  assert.ok(defaultClasses.includes('eds-btn--primary'));
  assert.ok(defaultClasses.includes('eds-btn--md'));

  // Variant overrides
  const secondary = buttonVariants({ variant: 'secondary' });
  assert.ok(secondary.includes('eds-btn--secondary'));
  assert.ok(!secondary.includes('eds-btn--primary'));

  const outline = buttonVariants({ variant: 'outline' });
  assert.ok(outline.includes('eds-btn--outline'));

  const ghost = buttonVariants({ variant: 'ghost' });
  assert.ok(ghost.includes('eds-btn--ghost'));

  const danger = buttonVariants({ variant: 'danger' });
  assert.ok(danger.includes('eds-btn--danger'));

  const ai = buttonVariants({ variant: 'ai' });
  assert.ok(ai.includes('eds-btn--ai'));

  // Sizes
  const sm = buttonVariants({ size: 'sm' });
  assert.ok(sm.includes('eds-btn--sm'));

  const lg = buttonVariants({ size: 'lg' });
  assert.ok(lg.includes('eds-btn--lg'));

  // Modifier states
  const loading = buttonVariants({ isLoading: true });
  assert.ok(loading.includes('eds-btn--loading'));

  const iconOnly = buttonVariants({ isIconOnly: true });
  assert.ok(iconOnly.includes('eds-btn--icon-only'));

  // Custom class
  const custom = buttonVariants({ className: 'custom-btn' });
  assert.ok(custom.includes('custom-btn'));
});

test('Button Component — Integrates buttonVariants', () => {
  const el = Button({ variant: 'outline', size: 'sm', className: 'my-btn', children: 'Click' });
  assert.ok(el.props.className.includes('eds-btn'));
  assert.ok(el.props.className.includes('eds-btn--outline'));
  assert.ok(el.props.className.includes('eds-btn--sm'));
  assert.ok(el.props.className.includes('my-btn'));
});

// -----------------------------------------------------------------------------
// 3. Badge Variant Standardization
// -----------------------------------------------------------------------------
test('badgeVariants — Default resolution & Variants', () => {
  // Defaults
  const def = badgeVariants();
  assert.ok(def.includes('eds-badge'));
  assert.ok(def.includes('eds-badge--neutral'));
  assert.ok(def.includes('eds-badge--md'));

  // Variants
  assert.ok(badgeVariants({ variant: 'success' }).includes('eds-badge--success'));
  assert.ok(badgeVariants({ variant: 'warning' }).includes('eds-badge--warning'));
  assert.ok(badgeVariants({ variant: 'danger' }).includes('eds-badge--danger'));
  assert.ok(badgeVariants({ variant: 'info' }).includes('eds-badge--info'));
  assert.ok(badgeVariants({ variant: 'ai' }).includes('eds-badge--ai'));

  // Size sm
  assert.ok(badgeVariants({ size: 'sm' }).includes('eds-badge--sm'));

  // Tabular numbers
  assert.ok(badgeVariants({ tabular: true }).includes('tabular-nums'));
});

test('Badge Component — Integrates badgeVariants', () => {
  const el = Badge({ variant: 'success', size: 'sm', tabular: true, children: '99.9%' });
  assert.ok(el.props.className.includes('eds-badge'));
  assert.ok(el.props.className.includes('eds-badge--success'));
  assert.ok(el.props.className.includes('eds-badge--sm'));
  assert.ok(el.props.className.includes('tabular-nums'));
});

// -----------------------------------------------------------------------------
// 4. Input Variant Standardization
// -----------------------------------------------------------------------------
test('inputVariants — Default resolution & Variants', () => {
  const def = inputVariants();
  assert.ok(def.includes('eds-input'));
  assert.ok(def.includes('eds-input--default'));
  assert.ok(def.includes('eds-input--md'));

  assert.ok(inputVariants({ variant: 'error' }).includes('eds-input--error'));
  assert.ok(inputVariants({ variant: 'filled' }).includes('eds-input--filled'));
  assert.ok(inputVariants({ size: 'sm' }).includes('eds-input--sm'));
  assert.ok(inputVariants({ size: 'lg' }).includes('eds-input--lg'));
  assert.ok(inputVariants({ disabled: true }).includes('eds-input--disabled'));
});

test('Input Component — Integrates inputVariants', () => {
  const el = Input({ error: 'Invalid field', className: 'user-input' });
  // The internal input element or container should carry the standardized class
  assert.ok(
    el.props.className?.includes('eds-input-container') ||
    el.props.children?.some?.(c => c?.props?.className?.includes('eds-input')) ||
    el.props.className?.includes('eds-input')
  );
});

// -----------------------------------------------------------------------------
// 5. Card Variant Standardization
// -----------------------------------------------------------------------------
test('cardVariants — Default resolution & Variants', () => {
  const def = cardVariants();
  assert.ok(def.includes('eds-card'));
  assert.ok(def.includes('eds-card--elevated'));

  assert.ok(cardVariants({ variant: 'outlined' }).includes('eds-card--outlined'));
  assert.ok(cardVariants({ variant: 'outline' }).includes('eds-card--outlined'));
  assert.ok(cardVariants({ variant: 'filled' }).includes('eds-card--filled'));
  assert.ok(cardVariants({ interactive: true }).includes('eds-card--interactive'));
  assert.ok(cardVariants({ selected: true }).includes('eds-card--selected'));
});

test('Card Component — Integrates cardVariants', () => {
  const el = Card({ variant: 'outlined', interactive: true, className: 'dashboard-card' });
  assert.ok(el.props.className.includes('eds-card'));
  assert.ok(el.props.className.includes('eds-card--outlined'));
  assert.ok(el.props.className.includes('eds-card--interactive'));
  assert.ok(el.props.className.includes('dashboard-card'));
});

// -----------------------------------------------------------------------------
// 6. Textarea Variant Standardization
// -----------------------------------------------------------------------------
test('textareaVariants — Default resolution & Variants', () => {
  const def = textareaVariants();
  assert.ok(def.includes('eds-textarea'));
  assert.ok(def.includes('eds-textarea--outlined'));
  assert.ok(def.includes('eds-textarea--resize-vertical'));

  assert.ok(textareaVariants({ variant: 'filled' }).includes('eds-textarea--filled'));
  assert.ok(textareaVariants({ resize: 'none' }).includes('eds-textarea--resize-none'));
  assert.ok(textareaVariants({ resize: 'horizontal' }).includes('eds-textarea--resize-horizontal'));
  assert.ok(textareaVariants({ resize: 'both' }).includes('eds-textarea--resize-both'));
  assert.ok(textareaVariants({ error: true }).includes('eds-textarea--error'));
  assert.ok(textareaVariants({ disabled: true }).includes('eds-textarea--disabled'));
});

test('Textarea Component — Integrates textareaVariants', () => {
  const el = Textarea({ variant: 'filled', resize: 'none', error: 'Too short' });
  // Container or textarea element has standardized classes
  assert.ok(
    el.props.className?.includes('eds-textarea-container') ||
    el.props.className?.includes('eds-textarea')
  );
});

