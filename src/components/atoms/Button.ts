import React from 'react';
import { cva, type VariantProps } from '../../core/cva.ts';

export const buttonVariants = cva('eds-btn eds-button', {
  variants: {
    variant: {
      primary: 'eds-btn--primary eds-button--primary',
      secondary: 'eds-btn--secondary eds-button--secondary',
      outline: 'eds-btn--outline eds-button--outline',
      ghost: 'eds-btn--ghost eds-button--ghost',
      danger: 'eds-btn--danger eds-button--danger',
      ai: 'eds-btn--ai eds-button--ai',
    },
    size: {
      sm: 'eds-btn--sm eds-button--sm',
      md: 'eds-btn--md eds-button--md',
      lg: 'eds-btn--lg eds-button--lg',
    },
    isLoading: {
      true: 'eds-btn--loading',
    },
    isIconOnly: {
      true: 'eds-btn--icon-only',
    },
    disabled: {
      true: 'eds-btn--disabled',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'ai';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isIconOnly?: boolean;
  className?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      isIconOnly = false,
      children,
      className = '',
      disabled = false,
      style,
      ...restProps
    } = props || {};

    const baseStyles: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--typography-font-family-sans, "Inter", sans-serif)',
      fontWeight: 600,
      cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
      opacity: disabled || isLoading ? 0.6 : 1,
      transition: 'all 0.15s ease',
      outline: 'none',
      textDecoration: 'none',
      position: 'relative',
      userSelect: 'none',
      borderRadius: 'var(--radius-lg, 8px)',
      border: '1px solid transparent',
      boxSizing: 'border-box',
    };

    const sizeStyles: Record<string, React.CSSProperties> = {
      sm: {
        padding: isIconOnly ? '6px' : '6px 12px',
        fontSize: '12px',
        gap: '6px',
        height: '32px',
        minWidth: isIconOnly ? '32px' : 'auto',
      },
      md: {
        padding: isIconOnly ? '9px' : '9px 16px',
        fontSize: '14px',
        gap: '8px',
        height: '40px',
        minWidth: isIconOnly ? '40px' : 'auto',
      },
      lg: {
        padding: isIconOnly ? '12px' : '12px 24px',
        fontSize: '16px',
        gap: '10px',
        height: '48px',
        minWidth: isIconOnly ? '48px' : 'auto',
      },
    };

    const variantStyles: Record<string, React.CSSProperties> = {
      primary: {
        backgroundColor: 'var(--sys-color-brand-primary, #2563EB)',
        color: '#FFFFFF',
        borderColor: 'var(--sys-color-brand-primary, #2563EB)',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
      },
      secondary: {
        backgroundColor: 'var(--sys-color-surface-card, #FFFFFF)',
        color: 'var(--sys-color-text-primary, #0F172A)',
        borderColor: 'var(--sys-color-border-default, #CBD5E1)',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
      },
      outline: {
        backgroundColor: 'transparent',
        color: 'var(--sys-color-brand-primary, #2563EB)',
        borderColor: 'var(--sys-color-brand-primary, #2563EB)',
      },
      ghost: {
        backgroundColor: 'transparent',
        color: 'var(--sys-color-text-secondary, #475569)',
        borderColor: 'transparent',
      },
      danger: {
        backgroundColor: 'var(--sys-color-status-danger-surface, #FEF2F2)',
        color: 'var(--sys-color-status-danger-text, #991B1B)',
        borderColor: 'var(--sys-color-status-danger-border, #FCA5A5)',
      },
      ai: {
        background: 'linear-gradient(135deg, var(--sys-color-brand-primary, #2563EB), var(--color-ai-special-accent-primary, #7C3AED))',
        color: '#FFFFFF',
        borderColor: 'transparent',
        boxShadow: '0 0 16px rgba(124, 58, 237, 0.25)',
      },
    };

    const computedClassName = buttonVariants({
      variant,
      size,
      isLoading,
      isIconOnly,
      disabled,
      className,
    });

    let contentChildren: React.ReactNode;
    if (isLoading) {
      contentChildren = React.createElement('span', {
        style: {
          display: 'inline-block',
          width: size === 'sm' ? '12px' : '16px',
          height: size === 'sm' ? '12px' : '16px',
          border: '2px solid currentColor',
          borderRightColor: 'transparent',
          borderRadius: '50%',
          animation: 'eds-spin 0.6s linear infinite',
        },
        className: 'eds-btn__spinner',
      });
    } else {
      const items: React.ReactNode[] = [];
      if (leftIcon) {
        items.push(
          React.createElement(
            'span',
            { key: 'left-icon', style: { display: 'inline-flex' }, className: 'eds-btn__icon-left' },
            leftIcon
          )
        );
      }
      if (children !== undefined && children !== null) {
        items.push(children);
      }
      if (rightIcon) {
        items.push(
          React.createElement(
            'span',
            { key: 'right-icon', style: { display: 'inline-flex' }, className: 'eds-btn__icon-right' },
            rightIcon
          )
        );
      }
      contentChildren = items.length === 1 ? items[0] : items;
    }

    return React.createElement(
      'button',
      {
        ref,
        style: {
          ...baseStyles,
          ...(sizeStyles[size] || sizeStyles.md),
          ...(variantStyles[variant] || variantStyles.primary),
          ...style,
        },
        disabled: disabled || isLoading,
        className: computedClassName,
        ...restProps,
      },
      contentChildren
    );
  }
);

Button.displayName = 'Button';
export default Button;

