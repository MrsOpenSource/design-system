import React, { useState } from 'react';
import { Pagination } from '../data/Pagination.ts';

export type DensityMode = 'compact' | 'comfortable' | 'spacious';

export interface TableColumnFilterItem {
  text: string;
  value: any;
}

export interface EnhancedTableColumn<T = any> {
  key: keyof T | string;
  header: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  sorter?: (a: T, b: T) => number;
  fixed?: 'left' | 'right';
  filters?: TableColumnFilterItem[];
  onFilter?: (value: any, record: T) => boolean;
  render?: (row: T, index: number) => any;
}

export interface TablePaginationConfig {
  currentPage?: number;
  pageSize?: number;
  total?: number;
  showTotal?: boolean;
  pageSizeOptions?: number[];
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
}

export interface EnhancedDataTableProps<T = any> {
  columns: EnhancedTableColumn<T>[];
  data: T[];
  density?: DensityMode;
  selectable?: boolean;
  selectedIds?: string[];
  onSelectRow?: (id: string) => void;
  onSelectAll?: () => void;
  mobileCardTransform?: boolean;
  loading?: boolean;
  searchPlaceholder?: string;
  pagination?: TablePaginationConfig;
  className?: string;
  style?: React.CSSProperties;
}

// -----------------------------------------------------------------------------
// Sorter & Filter Utilities
// -----------------------------------------------------------------------------
export function sortTableData<T extends Record<string, any>>(
  data: T[],
  sortCol: string,
  sortOrder: 'asc' | 'desc' = 'asc',
  options?: { sorter?: (a: T, b: T) => number }
): T[] {
  if (!sortCol) return [...data];

  return [...data].sort((a, b) => {
    if (options?.sorter) {
      const cmp = options.sorter(a, b);
      return sortOrder === 'asc' ? cmp : -cmp;
    }

    const valA = a[sortCol];
    const valB = b[sortCol];
    if (valA == null) return 1;
    if (valB == null) return -1;

    if (typeof valA === 'number' && typeof valB === 'number') {
      return sortOrder === 'asc' ? valA - valB : valB - valA;
    }

    return sortOrder === 'asc'
      ? String(valA).localeCompare(String(valB))
      : String(valB).localeCompare(String(valA));
  });
}

export function filterTableData<T extends Record<string, any>>(
  data: T[],
  activeFilters: Record<string, any>,
  filterConfig: Record<string, { onFilter: (value: any, record: T) => boolean }> = {}
): T[] {
  return data.filter((record) => {
    for (const [key, filterValue] of Object.entries(activeFilters)) {
      if (filterValue === undefined || filterValue === null || filterValue === '') {
        continue;
      }
      const config = filterConfig[key];
      if (config?.onFilter) {
        if (!config.onFilter(filterValue, record)) {
          return false;
        }
      } else {
        const recordVal = record[key];
        if (recordVal !== filterValue) {
          return false;
        }
      }
    }
    return true;
  });
}

// -----------------------------------------------------------------------------
// Export Utilities (CSV & JSON)
// -----------------------------------------------------------------------------
export function exportTableToCsv<T extends Record<string, any>>(
  columns: Array<{ key: keyof T | string; header: string }>,
  data: T[]
): string {
  const headers = columns.map((col) => `"${String(col.header).replace(/"/g, '""')}"`).join(',');
  const rows = data.map((row) =>
    columns
      .map((col) => {
        const val = row[col.key];
        const strVal = val != null ? String(val) : '';
        return `"${strVal.replace(/"/g, '""')}"`;
      })
      .join(',')
  );

  return [headers, ...rows].join('\n');
}

export function exportTableToJson<T>(data: T[]): string {
  return JSON.stringify(data, null, 2);
}

// -----------------------------------------------------------------------------
// Enhanced DataTable Component
// -----------------------------------------------------------------------------
export function DataTable<T extends Record<string, any>>(props: EnhancedDataTableProps<T>) {
  const {
    columns = [],
    data = [],
    density = 'comfortable',
    selectable = true,
    selectedIds = [],
    onSelectRow,
    onSelectAll,
    mobileCardTransform = true,
    searchPlaceholder = 'Filter accounts...',
    pagination,
    className = '',
    style,
  } = props || {};

  const [query, setQuery] = useState('');
  const [sortCol, setSortCol] = useState<string | null>(null);
  const [sortAsc, setSortAsc] = useState<boolean>(true);

  // Search filter
  const queryFilteredData = data.filter((row) =>
    columns.some((col) => {
      const val = row[col.key];
      return val != null && String(val).toLowerCase().includes(query.toLowerCase());
    })
  );

  // Sorting with custom sorter support
  const activeColDef = columns.find((c) => String(c.key) === sortCol);
  const sortedData = sortCol
    ? sortTableData(queryFilteredData, sortCol, sortAsc ? 'asc' : 'desc', {
        sorter: activeColDef?.sorter,
      })
    : queryFilteredData;

  // Pagination slice (if client-side pagination)
  const isPaginated = Boolean(pagination);
  const currentPage = pagination?.currentPage || 1;
  const pageSize = pagination?.pageSize || 10;
  const totalRecords = pagination?.total !== undefined ? pagination.total : sortedData.length;

  const displayData = isPaginated && pagination?.total === undefined
    ? sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : sortedData;

  const handleSort = (key: string) => {
    if (sortCol === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortCol(key);
      setSortAsc(true);
    }
  };

  return React.createElement(
    'div',
    {
      className: `card data-table-wrapper eds-data-table--${density} ${className}`.trim(),
      style: { display: 'flex', flexDirection: 'column', ...style },
    },
    // Toolbar
    React.createElement(
      'div',
      {
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 12,
        },
      },
      React.createElement(
        'div',
        null,
        React.createElement('h3', { style: { fontSize: 15, fontWeight: 700 } }, 'Enterprise Accounts'),
        React.createElement(
          'p',
          { style: { fontSize: 12, color: 'var(--sys-color-text-secondary)' } },
          `Showing ${sortedData.length} records`
        )
      ),
      React.createElement(
        'div',
        { style: { position: 'relative' } },
        React.createElement('input', {
          type: 'text',
          className: 'text-input',
          value: query,
          onChange: (e: any) => setQuery(e.target.value),
          placeholder: searchPlaceholder,
          style: { width: 160, height: 32, fontSize: 12, paddingLeft: 24 },
        }),
        React.createElement(
          'span',
          { style: { position: 'absolute', left: 7, top: 7, fontSize: 12, opacity: 0.5 } },
          '🔍'
        )
      )
    ),

    // Grid View Table
    React.createElement(
      'div',
      { className: 'table-responsive-wrapper', style: { overflowX: 'auto' } },
      React.createElement(
        'table',
        { className: 'data-table', style: { width: '100%', borderCollapse: 'collapse' } },
        React.createElement(
          'thead',
          null,
          React.createElement(
            'tr',
            null,
            selectable
              ? React.createElement(
                  'th',
                  { style: { width: 36, textAlign: 'center' } },
                  React.createElement('input', {
                    type: 'checkbox',
                    checked: data.length > 0 && selectedIds.length === data.length,
                    onChange: onSelectAll,
                  })
                )
              : null,
            columns.map((col) => {
              const isFixedLeft = col.fixed === 'left';
              const isFixedRight = col.fixed === 'right';
              return React.createElement(
                'th',
                {
                  key: String(col.key),
                  className: `${isFixedLeft ? 'eds-col--fixed-left' : ''} ${
                    isFixedRight ? 'eds-col--fixed-right' : ''
                  }`.trim(),
                  style: {
                    width: col.width,
                    textAlign: col.align || 'left',
                    cursor: col.sortable !== false ? 'pointer' : 'default',
                    position: isFixedLeft || isFixedRight ? 'sticky' : undefined,
                    left: isFixedLeft ? 0 : undefined,
                    right: isFixedRight ? 0 : undefined,
                    zIndex: isFixedLeft || isFixedRight ? 2 : undefined,
                    backgroundColor: isFixedLeft || isFixedRight ? 'var(--sys-color-surface-card, #FFFFFF)' : undefined,
                  },
                  onClick: () => col.sortable !== false && handleSort(String(col.key)),
                },
                React.createElement(
                  'div',
                  { style: { display: 'inline-flex', alignItems: 'center', gap: 4 } },
                  React.createElement('span', null, col.header),
                  col.sortable !== false
                    ? React.createElement(
                        'span',
                        { style: { fontSize: 10, opacity: sortCol === col.key ? 1 : 0.3 } },
                        sortCol === col.key ? (sortAsc ? '▲' : '▼') : '⇅'
                      )
                    : null
                )
              );
            })
          )
        ),
        React.createElement(
          'tbody',
          null,
          displayData.map((row, idx) => {
            const rowId = row.id || String(idx);
            const isSelected = selectedIds.includes(rowId);
            return React.createElement(
              'tr',
              {
                key: rowId,
                style: {
                  background: isSelected ? 'var(--component-dataTable-surface-rowSelected)' : undefined,
                },
              },
              selectable
                ? React.createElement(
                    'td',
                    { style: { textAlign: 'center' } },
                    React.createElement('input', {
                      type: 'checkbox',
                      checked: isSelected,
                      onChange: () => onSelectRow?.(rowId),
                    })
                  )
                : null,
              columns.map((col) => {
                const isFixedLeft = col.fixed === 'left';
                const isFixedRight = col.fixed === 'right';
                return React.createElement(
                  'td',
                  {
                    key: String(col.key),
                    style: {
                      textAlign: col.align || 'left',
                      position: isFixedLeft || isFixedRight ? 'sticky' : undefined,
                      left: isFixedLeft ? 0 : undefined,
                      right: isFixedRight ? 0 : undefined,
                      zIndex: isFixedLeft || isFixedRight ? 1 : undefined,
                      backgroundColor: isFixedLeft || isFixedRight ? 'var(--sys-color-surface-card, #FFFFFF)' : undefined,
                    },
                  },
                  col.render ? col.render(row, idx) : row[col.key]
                );
              })
            );
          })
        )
      )
    ),

    // Mobile Card List Transformation
    mobileCardTransform
      ? React.createElement(
          'div',
          { className: 'mobile-card-list' },
          displayData.map((row, idx) =>
            React.createElement(
              'div',
              { key: row.id || idx, className: 'mobile-row-card' },
              React.createElement(
                'div',
                {
                  style: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  },
                },
                React.createElement(
                  'span',
                  { style: { fontWeight: 700, fontSize: 14 } },
                  row[columns[0]?.key] || 'Account'
                ),
                columns[1]
                  ? React.createElement(
                      'span',
                      null,
                      columns[1].render ? columns[1].render(row, idx) : row[columns[1].key]
                    )
                  : null
              ),
              React.createElement(
                'div',
                {
                  style: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: 12,
                    marginTop: 4,
                  },
                },
                columns.slice(2, 4).map((col) =>
                  React.createElement(
                    'span',
                    { key: String(col.key), style: { color: 'var(--sys-color-text-secondary)' } },
                    `${col.header}: `,
                    React.createElement('strong', null, row[col.key])
                  )
                )
              )
            )
          )
        )
      : null,

    // Standalone Pagination Integration
    isPaginated
      ? React.createElement(
          'div',
          {
            className: 'eds-data-table__pagination',
            style: {
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: 16,
              paddingTop: 12,
              borderTop: '1px solid var(--sys-color-border-subtle, #E2E8F0)',
            },
          },
          React.createElement(Pagination, {
            currentPage,
            pageSize,
            total: totalRecords,
            showTotal: pagination?.showTotal,
            pageSizeOptions: pagination?.pageSizeOptions,
            onPageChange: pagination?.onPageChange || (() => {}),
            onPageSizeChange: pagination?.onPageSizeChange,
          })
        )
      : null
  );
}

export default DataTable;
