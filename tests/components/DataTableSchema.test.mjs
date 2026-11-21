import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';

// DataTable and Schema helpers under test
import {
  DataTable,
  exportTableToCsv,
  exportTableToJson,
  filterTableData,
  sortTableData,
} from '../../src/components/dashboard/DataTable.ts';

const SAMPLE_DATA = [
  { id: '1', name: 'Alpha Tech', revenue: 120000, plan: 'Enterprise', region: 'NA' },
  { id: '2', name: 'Beta Systems', revenue: 45000, plan: 'Growth', region: 'EMEA' },
  { id: '3', name: 'Gamma Labs', revenue: 85000, plan: 'Growth', region: 'APAC' },
  { id: '4', name: 'Delta Corp', revenue: 210000, plan: 'Enterprise', region: 'NA' },
];

// -----------------------------------------------------------------------------
// 1. Column Pinning & Layout Rendering
// -----------------------------------------------------------------------------
test('DataTableSchema — Column Pinning (fixed: "left" | "right")', () => {
  const columns = [
    { key: 'name', header: 'Company', fixed: 'left', width: '200px' },
    { key: 'revenue', header: 'Revenue' },
    { key: 'plan', header: 'Plan' },
    { key: 'actions', header: 'Actions', fixed: 'right', width: '100px' },
  ];

  const tableEl = DataTable({
    columns,
    data: SAMPLE_DATA,
  });

  assert.ok(tableEl, 'DataTable renders with pinned columns');
  assert.ok(tableEl.props.className.includes('data-table-wrapper'));
});

// -----------------------------------------------------------------------------
// 2. Custom Sorter Comparators
// -----------------------------------------------------------------------------
test('DataTableSchema — Custom Sorter Comparator Function', () => {
  // Sort descending by revenue using custom sorter
  const sortedDesc = sortTableData(SAMPLE_DATA, 'revenue', 'desc', {
    sorter: (a, b) => a.revenue - b.revenue,
  });

  assert.equal(sortedDesc[0].name, 'Delta Corp', 'Highest revenue must be first');
  assert.equal(sortedDesc[sortedDesc.length - 1].name, 'Beta Systems', 'Lowest revenue must be last');

  // Sort ascending
  const sortedAsc = sortTableData(SAMPLE_DATA, 'revenue', 'asc', {
    sorter: (a, b) => a.revenue - b.revenue,
  });
  assert.equal(sortedAsc[0].name, 'Beta Systems');
  assert.equal(sortedAsc[sortedAsc.length - 1].name, 'Delta Corp');
});

// -----------------------------------------------------------------------------
// 3. Multi-Column Filter Predicates
// -----------------------------------------------------------------------------
test('DataTableSchema — Multi-Column Filter Predicates (onFilter)', () => {
  const filteredEnterprise = filterTableData(
    SAMPLE_DATA,
    { plan: 'Enterprise' },
    {
      plan: { onFilter: (value, record) => record.plan === value },
    }
  );

  assert.equal(filteredEnterprise.length, 2);
  assert.equal(filteredEnterprise[0].name, 'Alpha Tech');
  assert.equal(filteredEnterprise[1].name, 'Delta Corp');

  // Combined filter: Plan = Enterprise AND Region = NA
  const filteredCombined = filterTableData(
    SAMPLE_DATA,
    { plan: 'Enterprise', region: 'NA' },
    {
      plan: { onFilter: (value, record) => record.plan === value },
      region: { onFilter: (value, record) => record.region === value },
    }
  );

  assert.equal(filteredCombined.length, 2);
});

// -----------------------------------------------------------------------------
// 4. Export Utilities (CSV & JSON)
// -----------------------------------------------------------------------------
test('DataTableSchema — Export Table Data to CSV String', () => {
  const columns = [
    { key: 'name', header: 'Account Name' },
    { key: 'revenue', header: 'Annual Revenue' },
    { key: 'plan', header: 'Tier' },
  ];

  const csv = exportTableToCsv(columns, SAMPLE_DATA);
  assert.ok(csv.startsWith('"Account Name","Annual Revenue","Tier"'), 'Header row matches');
  assert.ok(csv.includes('"Alpha Tech","120000","Enterprise"'), 'Data row matches');
  assert.ok(csv.includes('"Delta Corp","210000","Enterprise"'));
});

test('DataTableSchema — Export Table Data to JSON String', () => {
  const json = exportTableToJson(SAMPLE_DATA);
  const parsed = JSON.parse(json);
  assert.equal(parsed.length, 4);
  assert.equal(parsed[0].name, 'Alpha Tech');
  assert.equal(parsed[3].revenue, 210000);
});

// -----------------------------------------------------------------------------
// 5. Standalone Pagination Integration
// -----------------------------------------------------------------------------
test('DataTableSchema — Renders standalone pagination when pagination prop enabled', () => {
  let activePage = 1;
  const tableEl = DataTable({
    columns: [{ key: 'name', header: 'Company' }],
    data: SAMPLE_DATA,
    pagination: {
      currentPage: 1,
      pageSize: 2,
      total: 4,
      onPageChange: (p) => { activePage = p; },
    },
  });

  assert.ok(tableEl, 'DataTable with pagination renders');
});

