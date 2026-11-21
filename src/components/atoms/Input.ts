import React from 'react';
import { cva, type VariantProps } from '../../core/cva.ts';

export const inputVariants = cva('eds-input', {
  variants: {
    variant: {
      default: 'eds-input--default',
      error: 'eds-input--error',
      filled: 'eds-input--filled',
    },
    size: {
      sm: 'eds-input--sm',
      md: 'eds-input--md',
      lg: 'eds-input--lg',
    },
    disabled: {
      true: 'eds-input--disabled',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  shortcutBadge?: string;
  variant?: 'default' | 'error' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    label,
    helperText,
    error,
    leftIcon,
    rightIcon,
    shortcutBadge,
    disabled = false,
    variant,
    size = 'md',
    className = '',
    style,
    ...restProps
  } = props || {};

  const effectiveVariant = error ? 'error' : variant || 'default';
  const computedInputClass = inputVariants({
    variant: effectiveVariant,
    size,
    disabled: Boolean(disabled),
    className,
  });

  const labelEl = label
    ? React.createElement(
        'label',
        {
          key: 'label',
          style: {
            fontSize: '13px',
            fontWeight: 600,
            color: 'var(--sys-color-text-primary, #0F172A)',
            fontFamily: 'var(--typography-font-family-sans, "Inter", sans-serif)',
          },
          className: 'eds-input-label',
        },
        label
      )
    : null;

  const leftIconEl = leftIcon
    ? React.createElement(
        'span',
        {
          key: 'left-icon',
          style: {
            paddingLeft: '12px',
            display: 'inline-flex',
            alignItems: 'center',
            color: 'var(--sys-color-text-tertiary, #94A3B8)',
          },
          className: 'eds-input-icon-left',
        },
        leftIcon
      )
    : null;

  const inputEl = React.createElement('input', {
    key: 'input',
    ref,
    disabled,
    style: {
      flex: 1,
      height: size === 'sm' ? '32px' : size === 'lg' ? '48px' : '40px',
      padding: `0 ${rightIcon || shortcutBadge ? '8px' : '14px'} 0 ${leftIcon ? '8px' : '14px'}`,
      fontSize: size === 'sm' ? '12px' : '14px',
      fontFamily: 'var(--typography-font-family-sans, "Inter", sans-serif)',
      color: 'var(--sys-color-text-primary, #0F172A)',
      backgroundColor: 'transparent',
      border: 'none',
      outline: 'none',
      ...style,
    },
    className: computedInputClass,
    ...restProps,
  });

  const shortcutBadgeEl = shortcutBadge
    ? React.createElement(
        'span',
        {
          key: 'shortcut-badge',
          style: {
            marginRight: '10px',
            padding: '2px 6px',
            fontSize: '11px',
            fontWeight: 600,
            fontFamily: 'var(--typography-font-family-mono, monospace)',
            backgroundColor: 'var(--sys-color-surface-sunken, #F1F5F9)',
            border: '1px solid var(--sys-color-border-subtle, #E2E8F0)',
            borderRadius: '4px',
            color: 'var(--sys-color-text-secondary, #64748B)',
          },
          className: 'eds-input-shortcut',
        },
        shortcutBadge
      )
    : null;

  const rightIconEl = rightIcon
    ? React.createElement(
        'span',
        {
          key: 'right-icon',
          style: {
            paddingRight: '12px',
            display: 'inline-flex',
            alignItems: 'center',
            color: 'var(--sys-color-text-tertiary, #94A3B8)',
          },
          className: 'eds-input-icon-right',
        },
        rightIcon
      )
    : null;

  const wrapperEl = React.createElement(
    'div',
    {
      key: 'wrapper',
      style: {
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        width: '100%',
        backgroundColor: disabled
          ? 'var(--sys-color-surface-sunken, #F1F5F9)'
          : effectiveVariant === 'filled'
          ? 'var(--sys-color-surface-sunken, #F1F5F9)'
          : 'var(--sys-color-surface-card, #FFFFFF)',
        border: `1.5px solid ${
          error
            ? 'var(--sys-color-status-danger-border, #EF4444)'
            : 'var(--sys-color-border-default, #CBD5E1)'
        }`,
        borderRadius: 'var(--radius-lg, 8px)',
        transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)',
      },
      className: 'eds-input-wrapper',
    },
    leftIconEl,
    inputEl,
    shortcutBadgeEl,
    rightIconEl
  );

  const helperEl =
    error || helperText
      ? React.createElement(
          'span',
          {
            key: 'helper',
            style: {
              fontSize: '12px',
              color: error
                ? 'var(--sys-color-status-danger-text, #EF4444)'
                : 'var(--sys-color-text-secondary, #64748B)',
              fontFamily: 'var(--typography-font-family-sans, "Inter", sans-serif)',
            },
            className: 'eds-input-helper-text',
          },
          error || helperText
        )
      : null;

  return React.createElement(
    'div',
    {
      style: { display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' },
      className: 'eds-input-container',
    },
    labelEl,
    wrapperEl,
    helperEl
  );
});

Input.displayName = 'Input';
export default Input;

