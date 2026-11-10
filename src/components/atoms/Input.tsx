import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  shortcutBadge?: string;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  helperText,
  error,
  leftIcon,
  rightIcon,
  shortcutBadge,
  disabled,
  className = '',
  style,
  ...props
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
      {label && (
        <label
          style={{
            fontSize: '13px',
            fontWeight: 600,
            color: 'var(--sys-color-text-primary, #0F172A)',
            fontFamily: 'var(--typography-font-family-sans, "Inter", sans-serif)',
          }}
        >
          {label}
        </label>
      )}

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          width: '100%',
          backgroundColor: disabled
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
        }}
      >
        {leftIcon && (
          <span
            style={{
              paddingLeft: '12px',
              display: 'inline-flex',
              alignItems: 'center',
              color: 'var(--sys-color-text-tertiary, #94A3B8)',
            }}
          >
            {leftIcon}
          </span>
        )}

        <input
          disabled={disabled}
          style={{
            flex: 1,
            height: '40px',
            padding: `0 ${rightIcon || shortcutBadge ? '8px' : '14px'} 0 ${leftIcon ? '8px' : '14px'}`,
            fontSize: '14px',
            fontFamily: 'var(--typography-font-family-sans, "Inter", sans-serif)',
            color: 'var(--sys-color-text-primary, #0F172A)',
            backgroundColor: 'transparent',
            border: 'none',
            outline: 'none',
            ...style,
          }}
          className={`eds-input ${className}`}
          {...props}
        />

        {shortcutBadge && (
          <span
            style={{
              marginRight: '10px',
              padding: '2px 6px',
              fontSize: '11px',
              fontWeight: 600,
              fontFamily: 'var(--typography-font-family-mono, monospace)',
              backgroundColor: 'var(--sys-color-surface-sunken, #F1F5F9)',
              border: '1px solid var(--sys-color-border-subtle, #E2E8F0)',
              borderRadius: '4px',
              color: 'var(--sys-color-text-secondary, #64748B)',
            }}
          >
            {shortcutBadge}
          </span>
        )}

        {rightIcon && (
          <span
            style={{
              paddingRight: '12px',
              display: 'inline-flex',
              alignItems: 'center',
              color: 'var(--sys-color-text-tertiary, #94A3B8)',
            }}
          >
            {rightIcon}
          </span>
        )}
      </div>

      {(error || helperText) && (
        <span
          style={{
            fontSize: '12px',
            color: error
              ? 'var(--sys-color-status-danger-text, #EF4444)'
              : 'var(--sys-color-text-secondary, #64748B)',
            fontFamily: 'var(--typography-font-family-sans, "Inter", sans-serif)',
          }}
        >
          {error || helperText}
        </span>
      )}
    </div>
  );
};

