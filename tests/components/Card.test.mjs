import test from 'node:test';
import assert from 'node:assert/strict';

// Step 1: Import Card primitive under test
import { Card, CardHeader, CardBody, CardFooter } from '../../src/components/atoms/Card.ts';

test('Card — Default Rendering & Instantiation', () => {
  const element = Card({ children: 'Card Content' });

  assert.ok(element, 'Card element should be created');
  assert.equal(element.type, 'div', 'Card root element should be a <div>');
  assert.ok(
    element.props.className.includes('eds-card'),
    `Expected className to contain "eds-card", got "${element.props.className}"`
  );
  assert.ok(
    element.props.className.includes('eds-card--elevated'),
    'Default variant should be "elevated"'
  );
  assert.equal(element.props.children, 'Card Content');
  assert.equal(element.props.role, 'region', 'Default role should be "region"');
  assert.equal(element.props.style.backgroundColor, 'var(--sys-color-surface-card, #FFFFFF)');
  assert.ok(element.props.style.boxShadow, 'Default elevated card must have box-shadow');
});

test('Card — Custom ClassName & Style Merging', () => {
  const element = Card({
    className: 'custom-card-class',
    style: { maxWidth: '400px', zIndex: 10 },
    children: 'Styled Card',
  });

  assert.ok(element.props.className.includes('custom-card-class'));
  assert.ok(element.props.className.includes('eds-card'));
  assert.equal(element.props.style.maxWidth, '400px');
  assert.equal(element.props.style.zIndex, 10);
  assert.equal(element.props.style.borderRadius, 'var(--radius-xl, 12px)');
});

test('Card — Variants & Token Purity', async (t) => {
  await t.test('Variant: elevated', () => {
    const el = Card({ variant: 'elevated' });
    assert.ok(el.props.className.includes('eds-card--elevated'));
    assert.equal(el.props.style.backgroundColor, 'var(--sys-color-surface-card, #FFFFFF)');
    assert.ok(el.props.style.boxShadow.includes('var(--shadow-md'));
    assert.ok(el.props.style.border.includes('var(--sys-color-border-subtle'));
  });

  await t.test('Variant: outlined', () => {
    const el = Card({ variant: 'outlined' });
    assert.ok(el.props.className.includes('eds-card--outlined'));
    assert.equal(el.props.style.backgroundColor, 'var(--sys-color-surface-card, #FFFFFF)');
    assert.ok(el.props.style.border.includes('var(--sys-color-border-default'));
    assert.ok(el.props.style.boxShadow.includes('var(--shadow-none'));
  });

  await t.test('Variant: outline (alias for outlined)', () => {
    const el = Card({ variant: 'outline' });
    assert.ok(el.props.className.includes('eds-card--outlined'));
  });

  await t.test('Variant: filled', () => {
    const el = Card({ variant: 'filled' });
    assert.ok(el.props.className.includes('eds-card--filled'));
    assert.equal(el.props.style.backgroundColor, 'var(--sys-color-surface-sunken, #F1F5F9)');
    assert.ok(el.props.style.boxShadow.includes('var(--shadow-none'));
  });
});

test('Card — Slots: Compound & Standalone Components', async (t) => {
  await t.test('Slots compound attachment on Card', () => {
    assert.equal(typeof Card.Header, 'function', 'Card.Header should be defined');
    assert.equal(typeof Card.Body, 'function', 'Card.Body should be defined');
    assert.equal(typeof Card.Footer, 'function', 'Card.Footer should be defined');
    assert.equal(Card.Header, CardHeader, 'Card.Header must equal CardHeader');
    assert.equal(Card.Body, CardBody, 'Card.Body must equal CardBody');
    assert.equal(Card.Footer, CardFooter, 'Card.Footer must equal CardFooter');
  });

  await t.test('Card.Header with title, subtitle, and action props', () => {
    const header = Card.Header({
      title: 'Invoices & Billing',
      subtitle: 'Manage payment methods and history',
      action: 'Download PDF',
    });

    assert.equal(header.type, 'div');
    assert.ok(header.props.className.includes('eds-card__header'));
    assert.equal(header.props.style.display, 'flex');
    assert.equal(header.props.style.justifyContent, 'space-between');
    assert.equal(header.props.style.alignItems, 'center');

    // Verify children elements contains title, subtitle, and action
    const [infoContainer, actionContainer] = header.props.children;
    assert.ok(infoContainer, 'Info container must exist');
    assert.ok(actionContainer, 'Action container must exist');
  });

  await t.test('Card.Header with custom children', () => {
    const header = Card.Header({ children: 'Custom Header Slot' });
    assert.equal(header.props.children, 'Custom Header Slot');
  });

  await t.test('Card.Body rendering', () => {
    const body = Card.Body({ children: 'Main Body Slot Content' });
    assert.equal(body.type, 'div');
    assert.ok(body.props.className.includes('eds-card__body'));
    assert.equal(body.props.style.flex, 1);
    assert.equal(body.props.children, 'Main Body Slot Content');
  });

  await t.test('Card.Footer rendering', () => {
    const footer = Card.Footer({ children: 'Footer Action Slot' });
    assert.equal(footer.type, 'div');
    assert.ok(footer.props.className.includes('eds-card__footer'));
    assert.equal(footer.props.style.display, 'flex');
    assert.equal(footer.props.style.justifyContent, 'flex-end');
    assert.equal(footer.props.children, 'Footer Action Slot');
  });
});

test('Card — Accessibility & Interactive Behavior', async (t) => {
  await t.test('Selectable Card (unselected)', () => {
    const el = Card({ selectable: true, selected: false });
    assert.equal(el.props.role, 'checkbox');
    assert.equal(el.props['aria-selected'], false);
    assert.equal(el.props.tabIndex, 0);
    assert.ok(el.props.className.includes('eds-card--interactive'));
    assert.ok(!el.props.className.includes('eds-card--selected'));
  });

  await t.test('Selectable Card (selected)', () => {
    const el = Card({ selectable: true, selected: true });
    assert.equal(el.props.role, 'checkbox');
    assert.equal(el.props['aria-selected'], true);
    assert.equal(el.props.tabIndex, 0);
    assert.ok(el.props.className.includes('eds-card--selected'));
    assert.ok(el.props.style.borderColor.includes('var(--sys-color-brand-primary'));
    assert.ok(el.props.style.boxShadow.includes('var(--sys-color-brand-primary'));
  });

  await t.test('Interactive Clickable Card with Keyboard navigation', () => {
    let clicked = 0;
    const handleClick = () => { clicked++; };

    const el = Card({ onClick: handleClick });
    assert.equal(el.props.role, 'button');
    assert.equal(el.props.tabIndex, 0);
    assert.ok(el.props.className.includes('eds-card--interactive'));

    // Test keyboard event: Enter triggers click
    let defaultPrevented = false;
    el.props.onKeyDown({
      key: 'Enter',
      preventDefault: () => { defaultPrevented = true; }
    });
    assert.equal(clicked, 1, 'Enter key should invoke onClick handler');
    assert.equal(defaultPrevented, true, 'Enter key should prevent default');

    // Test keyboard event: Space triggers click
    defaultPrevented = false;
    el.props.onKeyDown({
      key: ' ',
      preventDefault: () => { defaultPrevented = true; }
    });
    assert.equal(clicked, 2, 'Space key should invoke onClick handler');
    assert.equal(defaultPrevented, true, 'Space key should prevent default');

    // Non-activation keys do not trigger click
    el.props.onKeyDown({
      key: 'Tab',
      preventDefault: () => {}
    });
    assert.equal(clicked, 2, 'Tab key should not invoke onClick');
  });
});
