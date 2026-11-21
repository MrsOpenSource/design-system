import test from 'node:test';
import assert from 'node:assert/strict';

// Import Divider primitive under test
import { Divider } from '../../src/components/atoms/Divider.ts';

test('Divider — Default Rendering & Instantiation', () => {
  const element = Divider();

  assert.ok(element, 'Divider element should be created');
  assert.equal(element.type, 'hr', 'Default root element should be an <hr>');
  assert.equal(element.props.role, 'separator');
  assert.equal(element.props['aria-orientation'], 'horizontal');
  assert.ok(
    element.props.className.includes('eds-divider'),
    `Expected className to contain "eds-divider", got "${element.props.className}"`
  );
  assert.ok(element.props.className.includes('eds-divider--horizontal'));
  assert.ok(element.props.className.includes('eds-divider--full-bleed'));
  assert.equal(element.props.style.backgroundColor, 'var(--sys-color-border-subtle, #E2E8F0)');
  assert.equal(element.props.style.height, '1px');
});

test('Divider — Variants: fullBleed and inset', async (t) => {
  await t.test('variant="fullBleed" or fullBleed prop', () => {
    const el = Divider({ fullBleed: true });
    assert.ok(el.props.className.includes('eds-divider--full-bleed'));
    assert.equal(el.props.style.width, '100%');
  });

  await t.test('variant="inset" or inset prop with custom indent', () => {
    const el = Divider({ inset: true });
    assert.ok(el.props.className.includes('eds-divider--inset'));
    assert.equal(el.props.style.marginLeft, '16px');

    const customIndentEl = Divider({ inset: true, insetSize: '72px' });
    assert.equal(customIndentEl.props.style.marginLeft, '72px');
  });
});

test('Divider — Orientation: Vertical', () => {
  const element = Divider({ orientation: 'vertical' });

  assert.equal(element.type, 'div');
  assert.equal(element.props.role, 'separator');
  assert.equal(element.props['aria-orientation'], 'vertical');
  assert.ok(element.props.className.includes('eds-divider--vertical'));
  assert.equal(element.props.style.width, '1px');
  assert.equal(element.props.style.alignSelf, 'stretch');
});

test('Divider — Children / Content Slot (e.g. <Divider>OR</Divider>)', () => {
  const element = Divider({ children: 'OR' });

  assert.equal(element.type, 'div', 'Divider with children should be a <div> wrapper');
  assert.equal(element.props.role, 'separator');
  assert.ok(element.props.className.includes('eds-divider--with-children'));
  assert.equal(element.props.style.display, 'flex');
  assert.equal(element.props.style.alignItems, 'center');

  const children = Array.isArray(element.props.children) ? element.props.children : [element.props.children];
  assert.equal(children.length, 3, 'Must render line-before, text-slot, line-after');

  // Verify text content element
  const textEl = children[1];
  assert.ok(textEl.props.className.includes('eds-divider__content'));
  assert.equal(textEl.props.children, 'OR');
  assert.equal(textEl.props.style.color, 'var(--sys-color-text-tertiary, #94A3B8)');
});

test('Divider — Text Alignment with Children', () => {
  const left = Divider({ children: 'Section', textAlign: 'left' });
  assert.ok(left.props.className.includes('eds-divider--align-left'));

  const center = Divider({ children: 'Section', textAlign: 'center' });
  assert.ok(center.props.className.includes('eds-divider--align-center'));

  const right = Divider({ children: 'Section', textAlign: 'right' });
  assert.ok(right.props.className.includes('eds-divider--align-right'));
});

test('Divider — Decorative Mode', () => {
  const element = Divider({ decorative: true });

  assert.equal(element.props.role, 'presentation');
  assert.equal(element.props['aria-hidden'], 'true');
});

test('Divider — Custom ClassName & Style Merging', () => {
  const element = Divider({
    className: 'custom-divider',
    style: { margin: '24px 0' },
  });

  assert.ok(element.props.className.includes('custom-divider'));
  assert.ok(element.props.className.includes('eds-divider'));
  assert.equal(element.props.style.margin, '24px 0');
});

