import React from 'react';

export interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'danger';
  title?: string;
  description: string;
  onDismiss?: () => void;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
  style?: React.CSSProperties;
}

export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  description,
  onDismiss,
  action,
  className = '',
  style,
}) => {
  const styles: Record<string, { bg: string; border: string; text: string; icon: string }> = {
    info: {
      bg: 'var(--sys-color-status-info-surface, #EFF6FF)',
      border: 'var(--sys-color-status-info-border, #BFDBFE)',
      text: 'var(--sys-color-status-info-text, #1E40AF)',
      icon: 'ℹ️',
    },
    success: {
      bg: 'var(--sys-color-status-success-surface, #ECFDF5)',
      border: 'var(--sys-color-status-success-border, #A7F3D0)',
      text: 'var(--sys-color-status-success-text, #065F46)',
      icon: '✓',
    },
    warning: {
      bg: 'var(--sys-color-status-warning-surface, #FFFBEB)',
      border: 'var(--sys-color-status-warning-border, #FDE68A)',
      text: 'var(--sys-color-status-warning-text, #92400E)',
      icon: '⚠️',
    },
    danger: {
      bg: 'var(--sys-color-status-danger-surface, #FEF2F2)',
      border: 'var(--sys-color-status-danger-border, #FCA5A5)',
      text: 'var(--sys-color-status-danger-text, #991B1B)',
      icon: '✕',
    },
  };

  const current = styles[variant];

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        padding: '14px 16px',
        borderRadius: 'var(--radius-xl, 12px)',
        backgroundColor: current.bg,
        border: `1px solid ${current.border}`,
        color: current.text,
        fontFamily: 'var(--typography-font-family-sans, "Inter", sans-serif)',
        fontSize: '14px',
        ...style,
      }}
      className={`eds-alert eds-alert--${variant} ${className}`}
      role="alert"
    >
      <span style={{ fontSize: '16px', lineHeight: 1 }}>{current.icon}</span>

      <div style={{ flex: 1, minWidth: 0 }}>
        {title && <div style={{ fontWeight: 700, marginBottom: '2px' }}>{title}</div>}
        <div style={{ opacity: 0.9, lineHeight: 1.5 }}>{description}</div>
      </div>

      {action && (
        <button
          onClick={action.onClick}
          style={{
            background: 'transparent',
            border: `1px solid ${current.border}`,
            padding: '4px 10px',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: 700,
            color: current.text,
            cursor: 'pointer',
          }}
        >
          {action.label}
        </button>
      )}

      {onDismiss && (
        <button
          onClick={onDismiss}
          style={{
            background: 'none',
            border: 'none',
            color: current.text,
            cursor: 'pointer',
            fontSize: '16px',
            padding: '2px',
            opacity: 0.7,
            lineHeight: 1,
          }}
          aria-label="Dismiss alert"
        >
          &times;
        </button>
      )}
    </div>
  );
};

