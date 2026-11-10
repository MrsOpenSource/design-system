import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'ai';
  size?: 'sm' | 'md';
  dot?: boolean;
  pulse?: boolean;
  icon?: React.ReactNode;
  tabular?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  size = 'md',
  dot = false,
  pulse = false,
  icon,
  tabular = false,
  children,
  className = '',
  style,
  ...props
}) => {
  const variantStyles: Record<string, { bg: string; text: string; border: string; dotColor: string }> = {
    success: {
      bg: 'var(--sys-color-status-success-surface, #ECFDF5)',
      text: 'var(--sys-color-status-success-text, #065F46)',
      border: 'var(--sys-color-status-success-border, #A7F3D0)',
      dotColor: '#10B981',
    },
    warning: {
      bg: 'var(--sys-color-status-warning-surface, #FFFBEB)',
      text: 'var(--sys-color-status-warning-text, #92400E)',
      border: 'var(--sys-color-status-warning-border, #FDE68A)',
      dotColor: '#F59E0B',
    },
    danger: {
      bg: 'var(--sys-color-status-danger-surface, #FEF2F2)',
      text: 'var(--sys-color-status-danger-text, #991B1B)',
      border: 'var(--sys-color-status-danger-border, #FCA5A5)',
      dotColor: '#EF4444',
    },
    info: {
      bg: 'var(--sys-color-status-info-surface, #EFF6FF)',
      text: 'var(--sys-color-status-info-text, #1E40AF)',
      border: 'var(--sys-color-status-info-border, #BFDBFE)',
      dotColor: '#3B82F6',
    },
    neutral: {
      bg: 'var(--sys-color-surface-sunken, #F1F5F9)',
      text: 'var(--sys-color-text-secondary, #475569)',
      border: 'var(--sys-color-border-subtle, #E2E8F0)',
      dotColor: '#64748B',
    },
    ai: {
      bg: 'rgba(124, 58, 237, 0.12)',
      text: 'var(--color-ai-special-accent-primary, #7C3AED)',
      border: 'rgba(124, 58, 237, 0.3)',
      dotColor: '#7C3AED',
    },
  };

  const current = variantStyles[variant];

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        padding: size === 'sm' ? '2px 8px' : '3px 10px',
        fontSize: size === 'sm' ? '11px' : '12px',
        fontWeight: 700,
        fontFamily: tabular ? 'var(--typography-font-family-mono, monospace)' : 'var(--typography-font-family-sans, "Inter", sans-serif)',
        fontVariantNumeric: tabular ? 'tabular-nums' : 'normal',
        borderRadius: '9999px',
        backgroundColor: current.bg,
        color: current.text,
        border: `1px solid ${current.border}`,
        lineHeight: 1.2,
        userSelect: 'none',
        whiteSpace: 'nowrap',
        ...style,
      }}
      className={`eds-badge eds-badge--${variant} ${tabular ? 'tabular-nums' : ''} ${className}`}
      {...props}
    >
      {dot && (
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: current.dotColor,
            boxShadow: pulse ? `0 0 6px ${current.dotColor}` : 'none',
          }}
        />
      )}
      {icon && <span style={{ display: 'inline-flex' }}>{icon}</span>}
      {children}
    </span>
  );
};

