import React from 'react';

export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerVariant = 'fullBleed' | 'inset';
export type DividerTextAlign = 'left' | 'center' | 'right';

export interface DividerProps extends React.HTMLAttributes<HTMLElement> {
  orientation?: DividerOrientation;
  variant?: DividerVariant;
  fullBleed?: boolean;
  inset?: boolean;
  insetSize?: number | string;
  textAlign?: DividerTextAlign;
  decorative?: boolean;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Divider = React.forwardRef<HTMLElement, DividerProps>(
  (props, ref) => {
    const {
      orientation = 'horizontal',
      variant = 'fullBleed',
      fullBleed,
      inset,
      insetSize = '16px',
      textAlign = 'center',
      decorative = false,
      children,
      className = '',
      style,
      ...restProps
    } = props || {};
    const isVertical = orientation === 'vertical';
    const isInset = Boolean(inset || variant === 'inset');
    const isFullBleed = !isInset || Boolean(fullBleed || variant === 'fullBleed');
    const normalizedVariant = isInset ? 'inset' : 'full-bleed';
    const hasChildren = Boolean(children) && !isVertical;

    const computedRole = decorative ? 'presentation' : 'separator';
    const computedAriaOrientation = decorative ? undefined : orientation;
    const computedAriaHidden = decorative ? 'true' : undefined;

    // Case 1: Divider with children slot (e.g. <Divider>OR</Divider>)
    if (hasChildren) {
      const wrapperClasses = [
        'eds-divider',
        'eds-divider--horizontal',
        'eds-divider--with-children',
        `eds-divider--align-${textAlign}`,
        className,
      ]
        .filter(Boolean)
        .join(' ');

      const wrapperStyle: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        fontFamily: 'var(--typography-font-family-sans, "Inter", sans-serif)',
        ...style,
      };

      const lineBefore = React.createElement('div', {
        key: 'line-before',
        className: 'eds-divider__line eds-divider__line--before',
        style: {
          flex: textAlign === 'left' ? '0 0 24px' : '1',
          height: '1px',
          backgroundColor: 'var(--sys-color-border-subtle, #E2E8F0)',
        },
      });

      const textElement = React.createElement(
        'span',
        {
          key: 'content',
          className: 'eds-divider__content',
          style: {
            padding: '0 12px',
            fontSize: '12px',
            fontWeight: 500,
            color: 'var(--sys-color-text-tertiary, #94A3B8)',
            whiteSpace: 'nowrap',
          },
        },
        children
      );

      const lineAfter = React.createElement('div', {
        key: 'line-after',
        className: 'eds-divider__line eds-divider__line--after',
        style: {
          flex: textAlign === 'right' ? '0 0 24px' : '1',
          height: '1px',
          backgroundColor: 'var(--sys-color-border-subtle, #E2E8F0)',
        },
      });

      return React.createElement(
        'div',
        {
          ref: ref as React.Ref<HTMLDivElement>,
          role: computedRole,
          'aria-orientation': computedAriaOrientation,
          'aria-hidden': computedAriaHidden,
          className: wrapperClasses,
          style: wrapperStyle,
          ...restProps,
        },
        lineBefore,
        textElement,
        lineAfter
      );
    }

    // Case 2: Vertical Divider
    if (isVertical) {
      const verticalClasses = [
        'eds-divider',
        'eds-divider--vertical',
        isInset ? 'eds-divider--inset' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ');

      const verticalStyle: React.CSSProperties = {
        width: '1px',
        alignSelf: 'stretch',
        backgroundColor: 'var(--sys-color-border-subtle, #E2E8F0)',
        border: 'none',
        margin: isInset ? `${typeof insetSize === 'number' ? `${insetSize}px` : insetSize} 0` : '0 8px',
        ...style,
      };

      return React.createElement('div', {
        ref: ref as React.Ref<HTMLDivElement>,
        role: computedRole,
        'aria-orientation': computedAriaOrientation,
        'aria-hidden': computedAriaHidden,
        className: verticalClasses,
        style: verticalStyle,
        ...restProps,
      });
    }

    // Case 3: Horizontal native <hr> divider
    const hrClasses = [
      'eds-divider',
      'eds-divider--horizontal',
      `eds-divider--${normalizedVariant}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const hrStyle: React.CSSProperties = {
      border: 'none',
      height: '1px',
      backgroundColor: 'var(--sys-color-border-subtle, #E2E8F0)',
      margin: 0,
      width: isInset ? 'auto' : '100%',
      ...(isInset
        ? { marginLeft: typeof insetSize === 'number' ? `${insetSize}px` : insetSize }
        : {}),
      ...style,
    };

    return React.createElement('hr', {
      ref: ref as React.Ref<HTMLHRElement>,
      role: computedRole,
      'aria-orientation': computedAriaOrientation,
      'aria-hidden': computedAriaHidden,
      className: hrClasses,
      style: hrStyle,
      ...restProps,
    });
  }
);

Divider.displayName = 'Divider';

export default Divider;
