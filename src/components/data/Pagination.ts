import React from 'react';

export type PaginationSize = 'sm' | 'md' | 'lg';

export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  total: number;
  pageSize?: number;
  page?: number;
  defaultPage?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  pageSizeOptions?: number[];
  showPageSizeSelector?: boolean;
  showTotal?: boolean | ((total: number, range: [number, number]) => React.ReactNode);
  siblingCount?: number;
  disabled?: boolean;
  size?: PaginationSize;
  className?: string;
  style?: React.CSSProperties;
}

const renderChevronLeft = () =>
  React.createElement(
    'svg',
    {
      key: 'chevron-left',
      viewBox: '0 0 20 20',
      width: '16',
      height: '16',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
    },
    React.createElement('polyline', { points: '12 15 7 10 12 5' })
  );

const renderChevronRight = () =>
  React.createElement(
    'svg',
    {
      key: 'chevron-right',
      viewBox: '0 0 20 20',
      width: '16',
      height: '16',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
    },
    React.createElement('polyline', { points: '8 5 13 10 8 15' })
  );

export const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  (
    {
      total,
      pageSize = 10,
      page,
      defaultPage = 1,
      onPageChange,
      onPageSizeChange,
      pageSizeOptions = [10, 25, 50, 100],
      showPageSizeSelector = false,
      showTotal = false,
      siblingCount = 1,
      disabled = false,
      size = 'md',
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const [internalPage, setInternalPage] = React.useState<number>(defaultPage);

    const isControlled = page !== undefined;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const currentPage = Math.min(
      Math.max(1, isControlled ? Number(page) : internalPage),
      totalPages
    );
    const isDisabled = Boolean(disabled);

    const handlePageClick = (p: number) => {
      if (isDisabled || p < 1 || p > totalPages || p === currentPage) return;
      if (!isControlled) {
        setInternalPage(p);
      }
      onPageChange?.(p);
    };

    const handleSizeSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newSize = Number(e.target.value);
      onPageSizeChange?.(newSize);
    };

    // Calculate pagination range with ellipses
    const range = (start: number, end: number) => {
      const length = end - start + 1;
      return Array.from({ length }, (_, idx) => idx + start);
    };

    const generatePageItems = (): (number | 'ellipsis-left' | 'ellipsis-right')[] => {
      const totalPageNumbers = siblingCount * 2 + 5; // siblingCount + first + last + current + 2*dots

      if (totalPageNumbers >= totalPages) {
        return range(1, totalPages);
      }

      const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
      const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

      const shouldShowLeftDots = leftSiblingIndex > 2;
      const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

      const firstPageIndex = 1;
      const lastPageIndex = totalPages;

      if (!shouldShowLeftDots && shouldShowRightDots) {
        const leftItemCount = 3 + 2 * siblingCount;
        const leftRange = range(1, leftItemCount);
        return [...leftRange, 'ellipsis-right', totalPages];
      }

      if (shouldShowLeftDots && !shouldShowRightDots) {
        const rightItemCount = 3 + 2 * siblingCount;
        const rightRange = range(totalPages - rightItemCount + 1, totalPages);
        return [firstPageIndex, 'ellipsis-left', ...rightRange];
      }

      if (shouldShowLeftDots && shouldShowRightDots) {
        const middleRange = range(leftSiblingIndex, rightSiblingIndex);
        return [firstPageIndex, 'ellipsis-left', ...middleRange, 'ellipsis-right', lastPageIndex];
      }

      return range(1, totalPages);
    };

    // Button sizing specs
    const sizeConfig: Record<PaginationSize, { btnSize: string; font: string; padding: string }> = {
      sm: { btnSize: '28px', font: '12px', padding: '0 6px' },
      md: { btnSize: '34px', font: '13px', padding: '0 8px' },
      lg: { btnSize: '40px', font: '14px', padding: '0 10px' },
    };

    const config = sizeConfig[size] || sizeConfig.md;

    const navClasses = [
      'eds-pagination',
      `eds-pagination--${size}`,
      isDisabled ? 'eds-pagination--disabled' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const navStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontFamily: 'var(--typography-font-family-sans, "Inter", sans-serif)',
      userSelect: 'none',
      ...style,
    };

    // 1. Total summary element
    let totalElement: React.ReactNode = null;
    if (showTotal) {
      const start = total === 0 ? 0 : (currentPage - 1) * pageSize + 1;
      const end = Math.min(currentPage * pageSize, total);
      const summaryText =
        typeof showTotal === 'function'
          ? showTotal(total, [start, end])
          : `Showing ${start}–${end} of ${total} items`;

      totalElement = React.createElement(
        'span',
        {
          key: 'total',
          className: 'eds-pagination__total',
          style: {
            fontSize: config.font,
            color: 'var(--sys-color-text-secondary, #475569)',
            fontVariantNumeric: 'tabular-nums',
            marginRight: '8px',
          },
        },
        summaryText
      );
    }

    // 2. Previous button
    const isPrevDisabled = isDisabled || currentPage <= 1;
    const prevButton = React.createElement(
      'button',
      {
        key: 'prev',
        type: 'button',
        className: 'eds-pagination__prev eds-pagination__item',
        'aria-label': 'Previous page',
        disabled: isPrevDisabled,
        onClick: () => handlePageClick(currentPage - 1),
        style: {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: config.btnSize,
          height: config.btnSize,
          padding: config.padding,
          fontSize: config.font,
          borderRadius: 'var(--radius-md, 6px)',
          border: '1px solid var(--sys-color-border-subtle, #E2E8F0)',
          backgroundColor: isPrevDisabled
            ? 'var(--sys-color-surface-sunken, #F1F5F9)'
            : 'var(--sys-color-surface-card, #FFFFFF)',
          color: isPrevDisabled
            ? 'var(--sys-color-text-tertiary, #94A3B8)'
            : 'var(--sys-color-text-primary, #0F172A)',
          cursor: isPrevDisabled ? 'not-allowed' : 'pointer',
          outline: 'none',
          boxSizing: 'border-box',
          transition: 'all 0.15s ease',
        },
      },
      renderChevronLeft()
    );

    // 3. Page list elements
    const pageItems = generatePageItems();
    const renderedPageButtons = pageItems.map((item, idx) => {
      if (item === 'ellipsis-left' || item === 'ellipsis-right') {
        return React.createElement(
          'span',
          {
            key: `ellipsis-${idx}`,
            className: 'eds-pagination__ellipsis',
            style: {
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: config.btnSize,
              height: config.btnSize,
              fontSize: config.font,
              color: 'var(--sys-color-text-tertiary, #94A3B8)',
              fontVariantNumeric: 'tabular-nums',
            },
          },
          '...'
        );
      }

      const pageNum = item as number;
      const isActive = pageNum === currentPage;

      return React.createElement(
        'button',
        {
          key: pageNum,
          type: 'button',
          className: [
            'eds-pagination__item',
            'eds-pagination__item--page',
            isActive ? 'eds-pagination__item--active' : '',
          ]
            .filter(Boolean)
            .join(' '),
          'aria-label': `Page ${pageNum}`,
          'aria-current': isActive ? 'page' : undefined,
          disabled: isDisabled,
          onClick: () => handlePageClick(pageNum),
          style: {
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: config.btnSize,
            height: config.btnSize,
            padding: config.padding,
            fontSize: config.font,
            fontWeight: isActive ? 600 : 500,
            fontVariantNumeric: 'tabular-nums',
            borderRadius: 'var(--radius-md, 6px)',
            border: isActive
              ? '1px solid var(--sys-color-brand-primary, #2563EB)'
              : '1px solid var(--sys-color-border-subtle, #E2E8F0)',
            backgroundColor: isActive
              ? 'var(--sys-color-brand-primary, #2563EB)'
              : 'var(--sys-color-surface-card, #FFFFFF)',
            color: isActive
              ? '#FFFFFF'
              : isDisabled
              ? 'var(--sys-color-text-tertiary, #94A3B8)'
              : 'var(--sys-color-text-primary, #0F172A)',
            cursor: isDisabled ? 'not-allowed' : 'pointer',
            outline: 'none',
            boxSizing: 'border-box',
            transition: 'all 0.15s ease',
          },
        },
        pageNum
      );
    });

    const pagesContainer = React.createElement(
      'div',
      {
        key: 'pages',
        className: 'eds-pagination__pages',
        style: {
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
        },
      },
      renderedPageButtons
    );

    // 4. Next button
    const isNextDisabled = isDisabled || currentPage >= totalPages;
    const nextButton = React.createElement(
      'button',
      {
        key: 'next',
        type: 'button',
        className: 'eds-pagination__next eds-pagination__item',
        'aria-label': 'Next page',
        disabled: isNextDisabled,
        onClick: () => handlePageClick(currentPage + 1),
        style: {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: config.btnSize,
          height: config.btnSize,
          padding: config.padding,
          fontSize: config.font,
          borderRadius: 'var(--radius-md, 6px)',
          border: '1px solid var(--sys-color-border-subtle, #E2E8F0)',
          backgroundColor: isNextDisabled
            ? 'var(--sys-color-surface-sunken, #F1F5F9)'
            : 'var(--sys-color-surface-card, #FFFFFF)',
          color: isNextDisabled
            ? 'var(--sys-color-text-tertiary, #94A3B8)'
            : 'var(--sys-color-text-primary, #0F172A)',
          cursor: isNextDisabled ? 'not-allowed' : 'pointer',
          outline: 'none',
          boxSizing: 'border-box',
          transition: 'all 0.15s ease',
        },
      },
      renderChevronRight()
    );

    // 5. Page size selector
    let sizeSelectorElement: React.ReactNode = null;
    if (showPageSizeSelector) {
      const options = pageSizeOptions.map((opt) =>
        React.createElement('option', { key: opt, value: opt }, `${opt} / page`)
      );

      sizeSelectorElement = React.createElement(
        'select',
        {
          key: 'size-selector',
          className: 'eds-pagination__size-selector',
          'aria-label': 'Items per page',
          disabled: isDisabled,
          value: pageSize,
          onChange: handleSizeSelectChange,
          style: {
            height: config.btnSize,
            padding: '0 8px',
            fontSize: config.font,
            fontVariantNumeric: 'tabular-nums',
            color: 'var(--sys-color-text-primary, #0F172A)',
            backgroundColor: 'var(--sys-color-surface-card, #FFFFFF)',
            border: '1px solid var(--sys-color-border-subtle, #E2E8F0)',
            borderRadius: 'var(--radius-md, 6px)',
            cursor: isDisabled ? 'not-allowed' : 'pointer',
            outline: 'none',
            marginLeft: '8px',
          },
        },
        options
      );
    }

    const items = [totalElement, prevButton, pagesContainer, nextButton, sizeSelectorElement].filter(
      Boolean
    );

    return React.createElement(
      'nav',
      {
        ref,
        role: 'navigation',
        'aria-label': 'Pagination Navigation',
        className: navClasses,
        style: navStyle,
        ...props,
      },
      ...items
    );
  }
);

Pagination.displayName = 'Pagination';

export default Pagination;

