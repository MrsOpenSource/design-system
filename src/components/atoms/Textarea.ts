import React from 'react';
import { cva, type VariantProps } from '../../core/cva.ts';

export type TextareaVariant = 'outlined' | 'filled';
export type TextareaResize = 'none' | 'vertical' | 'horizontal' | 'both';

export const textareaVariants = cva('eds-textarea', {
  variants: {
    variant: {
      outlined: 'eds-textarea--outlined',
      filled: 'eds-textarea--filled',
    },
    resize: {
      none: 'eds-textarea--resize-none',
      vertical: 'eds-textarea--resize-vertical',
      horizontal: 'eds-textarea--resize-horizontal',
      both: 'eds-textarea--resize-both',
    },
    disabled: {
      true: 'eds-textarea--disabled',
    },
    error: {
      true: 'eds-textarea--error',
    },
  },
  defaultVariants: {
    variant: 'outlined',
    resize: 'vertical',
  },
});

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  error?: React.ReactNode;
  variant?: TextareaVariant;
  autoExpand?: boolean;
  minRows?: number;
  maxRows?: number;
  showCount?: boolean;
  resize?: TextareaResize;
  className?: string;
  style?: React.CSSProperties;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      helperText,
      error,
      variant = 'outlined',
      autoExpand = false,
      rows = 3,
      minRows,
      maxRows,
      showCount = false,
      maxLength,
      resize = 'vertical',
      disabled = false,
      readOnly = false,
      value,
      defaultValue,
      onChange,
      className = '',
      style,
      id,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState<string>(
      defaultValue !== undefined ? String(defaultValue) : ''
    );
    const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

    const isControlled = value !== undefined;
    const currentValue = isControlled ? String(value || '') : internalValue;
    const hasError = Boolean(error);
    const isDisabled = Boolean(disabled);
    const isReadOnly = Boolean(readOnly);

    // Auto-expand height calculation in browser environment
    const adjustHeight = React.useCallback(() => {
      if (!autoExpand) return;
      const el = textareaRef.current;
      if (!el) return;

      el.style.height = 'auto';
      let nextHeight = el.scrollHeight;

      if (minRows) {
        const approxMin = minRows * 21 + 20; // 21px line-height + 20px padding
        if (nextHeight < approxMin) nextHeight = approxMin;
      }
      if (maxRows) {
        const approxMax = maxRows * 21 + 20;
        if (nextHeight > approxMax) nextHeight = approxMax;
      }

      el.style.height = `${nextHeight}px`;
    }, [autoExpand, minRows, maxRows]);

    React.useEffect(() => {
      adjustHeight();
    }, [currentValue, adjustHeight]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (!isControlled) {
        setInternalValue(e.target.value);
      }
      adjustHeight();
      onChange?.(e);
    };

    const setMergedRef = (node: HTMLTextAreaElement | null) => {
      textareaRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref && typeof ref === 'object') {
        (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
      }
    };

    // Container class names
    const containerClasses = [
      'eds-textarea-container',
      `eds-textarea-container--${variant}`,
      isDisabled ? 'eds-textarea-container--disabled' : '',
      hasError ? 'eds-textarea-container--error' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const containerStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      width: '100%',
      fontFamily: 'var(--typography-font-family-sans, "Inter", sans-serif)',
      ...style,
    };

    // Label element
    const labelElement = label
      ? React.createElement(
          'label',
          {
            key: 'label',
            htmlFor: id,
            className: 'eds-textarea__label',
            style: {
              fontSize: '13px',
              fontWeight: 600,
              color: isDisabled
                ? 'var(--sys-color-text-tertiary, #94A3B8)'
                : 'var(--sys-color-text-primary, #0F172A)',
              lineHeight: 1.4,
            },
          },
          label
        )
      : null;

    // Styling for Textarea element
    const borderColor = hasError
      ? 'var(--sys-color-status-danger-border, #EF4444)'
      : variant === 'filled'
      ? 'var(--sys-color-border-subtle, #E2E8F0)'
      : 'var(--sys-color-border-default, #CBD5E1)';

    const backgroundColor = isDisabled
      ? 'var(--sys-color-surface-sunken, #F1F5F9)'
      : variant === 'filled'
      ? 'var(--sys-color-surface-sunken, #F1F5F9)'
      : 'var(--sys-color-surface-card, #FFFFFF)';

    const textareaStyle: React.CSSProperties = {
      width: '100%',
      padding: '10px 14px',
      fontSize: '14px',
      lineHeight: 1.5,
      fontFamily: 'var(--typography-font-family-sans, "Inter", sans-serif)',
      color: isDisabled
        ? 'var(--sys-color-text-tertiary, #94A3B8)'
        : 'var(--sys-color-text-primary, #0F172A)',
      backgroundColor,
      border: `1.5px solid ${borderColor}`,
      borderColor,
      borderRadius: 'var(--radius-lg, 8px)',
      boxShadow: 'var(--shadow-xs, 0 1px 2px rgba(0, 0, 0, 0.04))',
      outline: 'none',
      resize: autoExpand ? 'none' : resize,
      cursor: isDisabled ? 'not-allowed' : 'text',
      transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
      boxSizing: 'border-box',
    };

    const textareaClasses = textareaVariants({
      variant,
      resize: autoExpand ? 'none' : resize,
      disabled: isDisabled,
      error: hasError,
      className: 'eds-textarea__wrapper',
    });

    const textareaElement = React.createElement('textarea', {
      key: 'textarea',
      ref: setMergedRef,
      id,
      rows,
      value: isControlled ? value : undefined,
      defaultValue: !isControlled ? defaultValue : undefined,
      disabled: isDisabled,
      readOnly: isReadOnly,
      maxLength,
      className: textareaClasses,
      style: textareaStyle,
      'data-auto-expand': autoExpand ? 'true' : undefined,
      'aria-invalid': hasError ? 'true' : undefined,
      'aria-disabled': isDisabled ? 'true' : undefined,
      onChange: handleChange,
      ...props,
    });

    // Footer with helperText / error and character counter
    let footerElement: React.ReactNode = null;
    const hasFooterContent = helperText || error || showCount;

    if (hasFooterContent) {
      const helperOrError = hasError
        ? React.createElement(
            'span',
            {
              key: 'error',
              className: 'eds-textarea__error',
              style: {
                fontSize: '12px',
                fontWeight: 500,
                color: 'var(--sys-color-status-danger-text, #991B1B)',
                lineHeight: 1.4,
              },
            },
            error
          )
        : helperText
        ? React.createElement(
            'span',
            {
              key: 'helper',
              className: 'eds-textarea__helper-text',
              style: {
                fontSize: '12px',
                color: 'var(--sys-color-text-secondary, #475569)',
                lineHeight: 1.4,
              },
            },
            helperText
          )
        : null;

      const currentLen = currentValue.length;
      const counterText = maxLength ? `${currentLen} / ${maxLength}` : String(currentLen);

      const counterElement = showCount
        ? React.createElement(
            'span',
            {
              key: 'counter',
              className: 'eds-textarea__counter',
              style: {
                fontSize: '12px',
                color: 'var(--sys-color-text-tertiary, #94A3B8)',
                fontVariantNumeric: 'tabular-nums',
                fontFamily: 'var(--typography-font-family-mono, monospace)',
                marginLeft: 'auto',
                lineHeight: 1.4,
              },
            },
            counterText
          )
        : null;

      footerElement = React.createElement(
        'div',
        {
          key: 'footer',
          className: 'eds-textarea__footer',
          style: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '8px',
            marginTop: '2px',
          },
        },
        helperOrError || React.createElement('span', { key: 'spacer' }),
        counterElement
      );
    }

    const items = [labelElement, textareaElement, footerElement].filter(Boolean);

    return React.createElement(
      'div',
      {
        className: containerClasses,
        style: containerStyle,
      },
      ...items
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;

