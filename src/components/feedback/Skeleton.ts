import React from 'react';

export type SkeletonVariant = 'text' | 'circular' | 'rectangular' | 'rounded';
export type SkeletonAnimation = 'pulse' | 'wave' | 'shimmer' | 'none';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
  shape?: SkeletonVariant;
  animation?: SkeletonAnimation;
  width?: number | string;
  height?: number | string;
  lines?: number;
  lineGap?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

const radiusMap: Record<SkeletonVariant, string> = {
  text: 'var(--radius-sm, 4px)',
  circular: '9999px',
  rectangular: '0px',
  rounded: 'var(--radius-lg, 8px)',
};

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (props, ref) => {
    const {
      variant,
      shape,
      animation = 'pulse',
      width,
      height,
      lines,
      lineGap = '8px',
      className = '',
      style,
      ...restProps
    } = props || {};

    const normalizedVariant: SkeletonVariant = shape || variant || 'text';
    const normalizedAnimation = animation === 'shimmer' ? 'wave' : animation;

    const formatDim = (dim: number | string | undefined): string | undefined => {
      if (dim === undefined) return undefined;
      return typeof dim === 'number' ? `${dim}px` : dim;
    };

    // Case 1: Multi-line text skeleton group
    if (lines && lines > 1) {
      const groupClasses = [
        'eds-skeleton-group',
        `eds-skeleton-group--${normalizedAnimation}`,
        className,
      ]
        .filter(Boolean)
        .join(' ');

      const groupStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        gap: formatDim(lineGap) || '8px',
        width: formatDim(width) || '100%',
        ...style,
      };

      const lineElements = Array.from({ length: lines }, (_, idx) => {
        const isLast = idx === lines - 1;
        const lineWidth = isLast ? '70%' : formatDim(width) || '100%';
        const lineHeight = formatDim(height) || '14px';

        return React.createElement('div', {
          key: `line-${idx}`,
          className: [
            'eds-skeleton',
            'eds-skeleton--text',
            `eds-skeleton--${normalizedAnimation}`,
          ].join(' '),
          style: {
            width: lineWidth,
            height: lineHeight,
            backgroundColor: 'var(--sys-color-surface-sunken, #F1F5F9)',
            borderRadius: radiusMap.text,
            transition: 'opacity 0.2s ease',
          },
        });
      });

      return React.createElement(
        'div',
        {
          ref,
          role: 'status',
          'aria-busy': 'true',
          'aria-live': 'polite',
          className: groupClasses,
          style: groupStyle,
          ...restProps,
        },
        ...lineElements
      );
    }

    // Case 2: Single skeleton element
    const skeletonClasses = [
      'eds-skeleton',
      `eds-skeleton--${normalizedVariant}`,
      `eds-skeleton--${normalizedAnimation}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const computedWidth = formatDim(width) || (normalizedVariant === 'text' ? '100%' : undefined);
    const computedHeight =
      formatDim(height) || (normalizedVariant === 'text' ? '14px' : undefined);

    const skeletonStyle: React.CSSProperties = {
      display: 'block',
      width: computedWidth,
      height: computedHeight,
      backgroundColor: 'var(--sys-color-surface-sunken, #F1F5F9)',
      borderRadius: radiusMap[normalizedVariant] || radiusMap.text,
      transition: 'opacity 0.2s ease',
      boxSizing: 'border-box',
      ...style,
    };

    return React.createElement('div', {
      ref,
      role: 'status',
      'aria-busy': 'true',
      'aria-live': 'polite',
      className: skeletonClasses,
      style: skeletonStyle,
      ...restProps,
    });
  }
);

Skeleton.displayName = 'Skeleton';

export default Skeleton;

