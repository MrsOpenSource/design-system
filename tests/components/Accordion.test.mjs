import test from 'node:test';
import assert from 'node:assert/strict';

// Import Accordion primitive under test
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../../src/components/molecules/Accordion.ts';

test('Accordion — Default Simple Instantiation (Collapsed)', () => {
  const element = Accordion({
    title: 'What is your refund policy?',
    children: 'We provide a 30-day money back guarantee with no questions asked.',
  });

  assert.ok(element, 'Accordion element should be created');
  assert.equal(element.type, 'div');
  assert.ok(
    element.props.className.includes('eds-accordion'),
    `Expected className to contain "eds-accordion", got "${element.props.className}"`
  );

  const children = Array.isArray(element.props.children) ? element.props.children : [element.props.children];
  const triggerEl = children.find(
    (c) => c && c.props && c.props.className && c.props.className.includes('eds-accordion__trigger')
  );
  assert.ok(triggerEl, 'Trigger button must exist');
  assert.equal(triggerEl.props['aria-expanded'], false, 'Default state should be collapsed');

  // Verify title is rendered
  const triggerChildren = Array.isArray(triggerEl.props.children)
    ? triggerEl.props.children
    : [triggerEl.props.children];
  const titleEl = triggerChildren.find(
    (c) => c && c.props && c.props.className && c.props.className.includes('eds-accordion__title')
  );
  assert.ok(titleEl, 'Title element must exist');
  assert.equal(titleEl.props.children, 'What is your refund policy?');

  // When collapsed, content panel should not be rendered
  const contentEl = children.find(
    (c) => c && c.props && c.props.className && c.props.className.includes('eds-accordion__content')
  );
  assert.equal(contentEl, undefined, 'Content panel should not exist when collapsed');
});

test('Accordion — Expanded State & Content Region', () => {
  const element = Accordion({
    title: 'Invoice Details',
    defaultExpanded: true,
    children: 'Total Amount: $2,450.00 USD',
  });

  assert.ok(element.props.className.includes('eds-accordion--expanded'));

  const children = Array.isArray(element.props.children) ? element.props.children : [element.props.children];
  const triggerEl = children.find(
    (c) => c && c.props && c.props.className && c.props.className.includes('eds-accordion__trigger')
  );
  assert.equal(triggerEl.props['aria-expanded'], true);

  const contentEl = children.find(
    (c) => c && c.props && c.props.className && c.props.className.includes('eds-accordion__content')
  );
  assert.ok(contentEl, 'Content panel must be rendered when expanded');
  assert.equal(contentEl.props.role, 'region');
  assert.equal(contentEl.props.children, 'Total Amount: $2,450.00 USD');
});

test('Accordion — Variants (outlined, filled, borderless)', async (t) => {
  await t.test('Variant: outlined (default)', () => {
    const el = Accordion({ variant: 'outlined', title: 'Outlined' });
    assert.ok(el.props.className.includes('eds-accordion--outlined'));
    assert.equal(el.props.style.backgroundColor, 'var(--sys-color-surface-card, #FFFFFF)');
    assert.ok(el.props.style.border.includes('var(--sys-color-border-subtle, #E2E8F0)'));
  });

  await t.test('Variant: filled', () => {
    const el = Accordion({ variant: 'filled', title: 'Filled' });
    assert.ok(el.props.className.includes('eds-accordion--filled'));
    assert.equal(el.props.style.backgroundColor, 'var(--sys-color-surface-sunken, #F1F5F9)');
  });

  await t.test('Variant: borderless', () => {
    const el = Accordion({ variant: 'borderless', title: 'Borderless' });
    assert.ok(el.props.className.includes('eds-accordion--borderless'));
    assert.equal(el.props.style.border, 'none');
  });
});

test('Accordion — Subtitle and Action Slots', () => {
  const el = Accordion({
    title: 'Enterprise SSO',
    subtitle: 'Configure SAML 2.0 / Okta integration',
    action: 'Configure',
  });

  const children = Array.isArray(el.props.children) ? el.props.children : [el.props.children];
  const triggerEl = children.find(
    (c) => c && c.props && c.props.className && c.props.className.includes('eds-accordion__trigger')
  );
  const triggerChildren = Array.isArray(triggerEl.props.children)
    ? triggerEl.props.children
    : [triggerEl.props.children];

  const subtitleEl = triggerChildren.find(
    (c) => c && c.props && c.props.className && c.props.className.includes('eds-accordion__subtitle')
  );
  assert.ok(subtitleEl, 'Subtitle element must exist');
  assert.equal(subtitleEl.props.children, 'Configure SAML 2.0 / Okta integration');
  assert.equal(subtitleEl.props.style.color, 'var(--sys-color-text-secondary, #475569)');

  const actionEl = triggerChildren.find(
    (c) => c && c.props && c.props.className && c.props.className.includes('eds-accordion__action')
  );
  assert.ok(actionEl, 'Action element must exist');
  assert.equal(actionEl.props.children, 'Configure');
});

test('Accordion — Disabled State', () => {
  const el = Accordion({
    title: 'Locked Setting',
    disabled: true,
  });

  assert.ok(el.props.className.includes('eds-accordion--disabled'));
  assert.equal(el.props.style.cursor, 'not-allowed');

  const children = Array.isArray(el.props.children) ? el.props.children : [el.props.children];
  const triggerEl = children.find(
    (c) => c && c.props && c.props.className && c.props.className.includes('eds-accordion__trigger')
  );
  assert.equal(triggerEl.props.disabled, true);
  assert.equal(triggerEl.props['aria-disabled'], 'true');
});

test('Accordion — Items Array Mode', () => {
  const el = Accordion({
    items: [
      { id: 'sec', title: 'Security & Privacy', content: '2FA enforced.' },
      { id: 'notif', title: 'Notification Alerts', content: 'Weekly digest enabled.' },
    ],
  });

  assert.ok(el.props.className.includes('eds-accordion-group'));
  const children = Array.isArray(el.props.children) ? el.props.children : [el.props.children];
  assert.equal(children.length, 2, 'Should render 2 accordion items');
});

test('Accordion — Compound Slots Attachment', () => {
  assert.equal(typeof Accordion.Item, 'function', 'Accordion.Item should be defined');
  assert.equal(typeof Accordion.Trigger, 'function', 'Accordion.Trigger should be defined');
  assert.equal(typeof Accordion.Content, 'function', 'Accordion.Content should be defined');
  assert.equal(Accordion.Item, AccordionItem);
  assert.equal(Accordion.Trigger, AccordionTrigger);
  assert.equal(Accordion.Content, AccordionContent);
});

test('Accordion — Custom ClassName & Style Merging', () => {
  const el = Accordion({
    title: 'Custom',
    className: 'custom-accordion-cls',
    style: { marginBottom: '24px' },
  });

  assert.ok(el.props.className.includes('custom-accordion-cls'));
  assert.ok(el.props.className.includes('eds-accordion'));
  assert.equal(el.props.style.marginBottom, '24px');
});

