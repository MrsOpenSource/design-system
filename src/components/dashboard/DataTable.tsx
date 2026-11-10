import React, { useState } from 'react';
import { DataTableProps } from '../../types';

export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  density = 'comfortable',
  selectable = true,
  selectedIds = [],
  onSelectRow,
  onSelectAll,
  mobileCardTransform = true,
  searchPlaceholder = 'Filter accounts...'
}: DataTableProps<T>) {
  const [query, setQuery] = useState('');
  const [sortCol, setSortCol] = useState<string | null>(null);
  const [sortAsc, setSortAsc] = useState<boolean>(true);

  const filteredData = data.filter((row) =>
    columns.some((col) => {
      const val = row[col.key];
      return val != null && String(val).toLowerCase().includes(query.toLowerCase());
    })
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortCol) return 0;
    const valA = a[sortCol];
    const valB = b[sortCol];
    if (valA == null) return 1;
    if (valB == null) return -1;
    if (typeof valA === 'number' && typeof valB === 'number') {
      return sortAsc ? valA - valB : valB - valA;
    }
    return sortAsc
      ? String(valA).localeCompare(String(valB))
      : String(valB).localeCompare(String(valA));
  });

  const handleSort = (key: string) => {
    if (sortCol === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortCol(key);
      setSortAsc(true);
    }
  };

  return (
    <div className="card data-table-wrapper" style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Table Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <div>
          <h3 style={{ fontSize: 15, fontWeight: 700 }}>Enterprise Accounts</h3>
          <p style={{ fontSize: 12, color: 'var(--sys-color-text-secondary)' }}>
            Showing {sortedData.length} records
          </p>
        </div>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            className="text-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={searchPlaceholder}
            style={{ width: 160, height: 32, fontSize: 12, paddingLeft: 24 }}
          />
          <span style={{ position: 'absolute', left: 7, top: 7, fontSize: 12, opacity: 0.5 }}>🔍</span>
        </div>
      </div>

      {/* Grid View (Laptop & Tablet) */}
      <div className="table-responsive-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              {selectable && (
                <th style={{ width: 36, textAlign: 'center' }}>
                  <input
                    type="checkbox"
                    checked={data.length > 0 && selectedIds.length === data.length}
                    onChange={onSelectAll}
                  />
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  style={{
                    width: col.width,
                    textAlign: col.align || 'left',
                    cursor: col.sortable !== false ? 'pointer' : 'default'
                  }}
                  onClick={() => col.sortable !== false && handleSort(String(col.key))}
                >
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    <span>{col.header}</span>
                    {col.sortable !== false && (
                      <span style={{ fontSize: 10, opacity: sortCol === col.key ? 1 : 0.3 }}>
                        {sortCol === col.key ? (sortAsc ? '▲' : '▼') : '⇅'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, idx) => {
              const rowId = row.id || String(idx);
              const isSelected = selectedIds.includes(rowId);
              return (
                <tr key={rowId} style={{ background: isSelected ? 'var(--component-dataTable-surface-rowSelected)' : undefined }}>
                  {selectable && (
                    <td style={{ textAlign: 'center' }}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onSelectRow?.(rowId)}
                      />
                    </td>
                  )}
                  {columns.map((col) => (
                    <td key={String(col.key)} style={{ textAlign: col.align || 'left' }}>
                      {col.render ? col.render(row, idx) : row[col.key]}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card-List Transformation */}
      {mobileCardTransform && (
        <div className="mobile-card-list">
          {sortedData.map((row, idx) => (
            <div key={row.id || idx} className="mobile-row-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, fontSize: 14 }}>
                  {row[columns[0]?.key] || 'Account'}
                </span>
                {columns[1] && (
                  <span>{columns[1].render ? columns[1].render(row, idx) : row[columns[1].key]}</span>
                )}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginTop: 4 }}>
                {columns.slice(2, 4).map((col) => (
                  <span key={String(col.key)} style={{ color: 'var(--sys-color-text-secondary)' }}>
                    {col.header}: <strong>{row[col.key]}</strong>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

