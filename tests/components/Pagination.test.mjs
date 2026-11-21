import test from 'node:test';
import assert from 'node:assert/strict';

// Import Pagination primitive under test
import { Pagination } from '../../src/components/data/Pagination.ts';

test('Pagination — Default Rendering & Instantiation', () => {
  const element = Pagination({
    total: 100,
    pageSize: 10,
  });

  assert.ok(element, 'Pagination element should be created');
  assert.equal(element.type, 'nav', 'Root element should be a <nav>');
  assert.equal(element.props.role, 'navigation');
  assert.equal(element.props['aria-label'], 'Pagination Navigation');
  assert.ok(
    element.props.className.includes('eds-pagination'),
    `Expected className to contain "eds-pagination", got "${element.props.className}"`
  );

  const children = Array.isArray(element.props.children) ? element.props.children : [element.props.children];

  // Find prev button
  const prevBtn = children.find(
    (c) => c && c.props && c.props.className && c.props.className.includes('eds-pagination__prev')
  );
  assert.ok(prevBtn, 'Previous button must exist');
  assert.equal(prevBtn.props.disabled, true, 'Previous button must be disabled on first page');
  assert.equal(prevBtn.props['aria-label'], 'Previous page');

  // Find next button
  const nextBtn = children.find(
    (c) => c && c.props && c.props.className && c.props.className.includes('eds-pagination__next')
  );
  assert.ok(nextBtn, 'Next button must exist');
  assert.equal(nextBtn.props.disabled, false, 'Next button must be enabled when more pages exist');
  assert.equal(nextBtn.props['aria-label'], 'Next page');

  // Find pages container
  const pagesContainer = children.find(
    (c) => c && c.props && c.props.className && c.props.className.includes('eds-pagination__pages')
  );
  assert.ok(pagesContainer, 'Pages list container must exist');

  const pageButtons = Array.isArray(pagesContainer.props.children)
    ? pagesContainer.props.children
    : [pagesContainer.props.children];

  // First page should be active
  const firstPage = pageButtons[0];
  assert.equal(firstPage.props['aria-current'], 'page');
  assert.ok(firstPage.props.className.includes('eds-pagination__item--active'));
});

test('Pagination — Controlled Page & Boundary States', async (t) => {
  await t.test('Page 5 of 10: Prev and Next both enabled', () => {
    const el = Pagination({
      total: 100,
      pageSize: 10,
      page: 5,
    });

    const children = Array.isArray(el.props.children) ? el.props.children : [el.props.children];
    const prevBtn = children.find(
      (c) => c && c.props && c.props.className && c.props.className.includes('eds-pagination__prev')
    );
    const nextBtn = children.find(
      (c) => c && c.props && c.props.className && c.props.className.includes('eds-pagination__next')
    );

    assert.equal(prevBtn.props.disabled, false);
    assert.equal(nextBtn.props.disabled, false);

    const pagesContainer = children.find(
      (c) => c && c.props && c.props.className && c.props.className.includes('eds-pagination__pages')
    );
    const pageButtons = Array.isArray(pagesContainer.props.children)
      ? pagesContainer.props.children
      : [pagesContainer.props.children];

    const activeBtn = pageButtons.find((b) => b && b.props && b.props['aria-current'] === 'page');
    assert.ok(activeBtn, 'Active page button must exist');
    assert.equal(activeBtn.props.children, 5);
  });

  await t.test('Last page: Next button is disabled', () => {
    const el = Pagination({
      total: 100,
      pageSize: 10,
      page: 10,
    });

    const children = Array.isArray(el.props.children) ? el.props.children : [el.props.children];
    const nextBtn = children.find(
      (c) => c && c.props && c.props.className && c.props.className.includes('eds-pagination__next')
    );
    assert.equal(nextBtn.props.disabled, true, 'Next button must be disabled on last page');
  });
});

test('Pagination — Ellipsis and Range Sibling Truncation', () => {
  const el = Pagination({
    total: 200,
    pageSize: 10, // 20 pages
    page: 10,
    siblingCount: 1,
  });

  const children = Array.isArray(el.props.children) ? el.props.children : [el.props.children];
  const pagesContainer = children.find(
    (c) => c && c.props && c.props.className && c.props.className.includes('eds-pagination__pages')
  );
  const items = Array.isArray(pagesContainer.props.children)
    ? pagesContainer.props.children
    : [pagesContainer.props.children];

  // Should have: [1, '...', 9, 10, 11, '...', 20]
  const ellipses = items.filter(
    (item) => item && item.props && item.props.className && item.props.className.includes('eds-pagination__ellipsis')
  );
  assert.equal(ellipses.length, 2, 'Should render 2 ellipsis items around current page block');

  // Verify first item is 1, last is 20
  assert.equal(items[0].props.children, 1);
  assert.equal(items[items.length - 1].props.children, 20);
});

test('Pagination — Total Count & Range Summary', async (t) => {
  await t.test('Default total summary string', () => {
    const el = Pagination({
      total: 148,
      pageSize: 10,
      page: 1,
      showTotal: true,
    });

    const children = Array.isArray(el.props.children) ? el.props.children : [el.props.children];
    const totalEl = children.find(
      (c) => c && c.props && c.props.className && c.props.className.includes('eds-pagination__total')
    );
    assert.ok(totalEl, 'Total summary element must exist');
    assert.equal(totalEl.props.children, 'Showing 1–10 of 148 items');
    assert.equal(totalEl.props.style.fontVariantNumeric, 'tabular-nums');
  });

  await t.test('Custom showTotal render function', () => {
    const el = Pagination({
      total: 148,
      pageSize: 10,
      page: 2,
      showTotal: (total, [start, end]) => `${start}-${end} / ${total}`,
    });

    const children = Array.isArray(el.props.children) ? el.props.children : [el.props.children];
    const totalEl = children.find(
      (c) => c && c.props && c.props.className && c.props.className.includes('eds-pagination__total')
    );
    assert.equal(totalEl.props.children, '11-20 / 148');
  });
});

test('Pagination — Page Size Selector', () => {
  const el = Pagination({
    total: 148,
    pageSize: 25,
    pageSizeOptions: [10, 25, 50, 100],
    showPageSizeSelector: true,
  });

  const children = Array.isArray(el.props.children) ? el.props.children : [el.props.children];
  const sizeSelector = children.find(
    (c) => c && c.props && c.props.className && c.props.className.includes('eds-pagination__size-selector')
  );
  assert.ok(sizeSelector, 'Page size selector element must exist');
  assert.equal(sizeSelector.props['aria-label'], 'Items per page');
  assert.equal(sizeSelector.props.value, 25);
});

test('Pagination — Disabled State', () => {
  const el = Pagination({
    total: 100,
    pageSize: 10,
    page: 3,
    disabled: true,
  });

  assert.ok(el.props.className.includes('eds-pagination--disabled'));

  const children = Array.isArray(el.props.children) ? el.props.children : [el.props.children];
  const prevBtn = children.find(
    (c) => c && c.props && c.props.className && c.props.className.includes('eds-pagination__prev')
  );
  const nextBtn = children.find(
    (c) => c && c.props && c.props.className && c.props.className.includes('eds-pagination__next')
  );
  assert.equal(prevBtn.props.disabled, true);
  assert.equal(nextBtn.props.disabled, true);
});

test('Pagination — Sizes (sm, md, lg)', () => {
  const sm = Pagination({ total: 50, size: 'sm' });
  assert.ok(sm.props.className.includes('eds-pagination--sm'));

  const md = Pagination({ total: 50, size: 'md' });
  assert.ok(md.props.className.includes('eds-pagination--md'));

  const lg = Pagination({ total: 50, size: 'lg' });
  assert.ok(lg.props.className.includes('eds-pagination--lg'));
});

