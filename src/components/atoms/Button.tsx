import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'ai';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isIconOnly?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  isIconOnly = false,
  children,
  className = '',
  disabled,
  style,
  ...props
}) => {
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

  return (
    <button
      style={{
        ...baseStyles,
        ...sizeStyles[size],
        ...variantStyles[variant],
        ...style,
      }}
      disabled={disabled || isLoading}
      className={`eds-button eds-button--${variant} eds-button--${size} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span
          style={{
            display: 'inline-block',
            width: size === 'sm' ? '12px' : '16px',
            height: size === 'sm' ? '12px' : '16px',
            border: '2px solid currentColor',
            borderRightColor: 'transparent',
            borderRadius: '50%',
            animation: 'eds-spin 0.6s linear infinite',
          }}
        />
      ) : (
        <>
          {leftIcon && <span style={{ display: 'inline-flex' }}>{leftIcon}</span>}
          {children}
          {rightIcon && <span style={{ display: 'inline-flex' }}>{rightIcon}</span>}
        </>
      )}
    </button>
  );
};

