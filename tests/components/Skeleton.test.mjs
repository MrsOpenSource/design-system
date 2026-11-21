import test from 'node:test';
import assert from 'node:assert/strict';

// Import Skeleton primitive under test
import { Skeleton } from '../../src/components/feedback/Skeleton.ts';

test('Skeleton — Default Rendering & Instantiation', () => {
  const element = Skeleton();

  assert.ok(element, 'Skeleton element should be created');
  assert.equal(element.type, 'div', 'Root element should be a <div>');
  assert.equal(element.props.role, 'status');
  assert.equal(element.props['aria-busy'], 'true');
  assert.equal(element.props['aria-live'], 'polite');
  assert.ok(
    element.props.className.includes('eds-skeleton'),
    `Expected className to contain "eds-skeleton", got "${element.props.className}"`
  );
  assert.ok(element.props.className.includes('eds-skeleton--text'));
  assert.ok(element.props.className.includes('eds-skeleton--pulse'));
  assert.equal(element.props.style.backgroundColor, 'var(--sys-color-surface-sunken, #F1F5F9)');
  assert.equal(element.props.style.borderRadius, 'var(--radius-sm, 4px)');
});

test('Skeleton — Shapes & Variants', async (t) => {
  await t.test('variant="text"', () => {
    const el = Skeleton({ variant: 'text' });
    assert.ok(el.props.className.includes('eds-skeleton--text'));
    assert.equal(el.props.style.borderRadius, 'var(--radius-sm, 4px)');
  });

  await t.test('variant="circular"', () => {
    const el = Skeleton({ variant: 'circular', width: 40, height: 40 });
    assert.ok(el.props.className.includes('eds-skeleton--circular'));
    assert.equal(el.props.style.borderRadius, '9999px');
    assert.equal(el.props.style.width, '40px');
    assert.equal(el.props.style.height, '40px');
  });

  await t.test('variant="rectangular"', () => {
    const el = Skeleton({ variant: 'rectangular', width: '100%', height: 200 });
    assert.ok(el.props.className.includes('eds-skeleton--rectangular'));
    assert.equal(el.props.style.borderRadius, '0px');
    assert.equal(el.props.style.height, '200px');
  });

  await t.test('variant="rounded"', () => {
    const el = Skeleton({ variant: 'rounded', height: 80 });
    assert.ok(el.props.className.includes('eds-skeleton--rounded'));
    assert.equal(el.props.style.borderRadius, 'var(--radius-lg, 8px)');
  });
});

test('Skeleton — Animations (pulse, wave, shimmer, none)', () => {
  const pulseEl = Skeleton({ animation: 'pulse' });
  assert.ok(pulseEl.props.className.includes('eds-skeleton--pulse'));

  const waveEl = Skeleton({ animation: 'wave' });
  assert.ok(waveEl.props.className.includes('eds-skeleton--wave'));

  const shimmerEl = Skeleton({ animation: 'shimmer' });
  assert.ok(shimmerEl.props.className.includes('eds-skeleton--wave'));

  const staticEl = Skeleton({ animation: 'none' });
  assert.ok(staticEl.props.className.includes('eds-skeleton--none'));
});

test('Skeleton — Multi-line Text Grouping (lines prop)', () => {
  const group = Skeleton({ lines: 3, lineGap: '10px' });

  assert.equal(group.type, 'div');
  assert.ok(group.props.className.includes('eds-skeleton-group'));
  assert.equal(group.props.role, 'status');
  assert.equal(group.props.style.display, 'flex');
  assert.equal(group.props.style.flexDirection, 'column');
  assert.equal(group.props.style.gap, '10px');

  const children = Array.isArray(group.props.children) ? group.props.children : [group.props.children];
  assert.equal(children.length, 3, 'Must render 3 text skeleton lines');

  // First and second line have default 100% width
  assert.equal(children[0].props.style.width, '100%');
  assert.equal(children[1].props.style.width, '100%');

  // Last line has tapered width for natural text flow
  assert.equal(children[2].props.style.width, '70%');
});

test('Skeleton — Custom ClassName & Style Merging', () => {
  const el = Skeleton({
    className: 'custom-skeleton',
    style: { marginTop: '16px', opacity: 0.8 },
  });

  assert.ok(el.props.className.includes('custom-skeleton'));
  assert.ok(el.props.className.includes('eds-skeleton'));
  assert.equal(el.props.style.marginTop, '16px');
  assert.equal(el.props.style.opacity, 0.8);
});

