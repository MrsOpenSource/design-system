import React from 'react';

export interface ChipProps {
  variant?: 'filter' | 'input' | 'suggestion' | 'assist';
  label: string;
  selected?: boolean;
  onSelect?: () => void;
  onRemove?: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const Chip: React.FC<ChipProps> = ({
  variant = 'filter',
  label,
  selected = false,
  onSelect,
  onRemove,
  icon,
  disabled = false,
  className = '',
  style,
}) => {
  const isFilter = variant === 'filter';
  const isInput = variant === 'input';

  return (
    <div
      onClick={() => !disabled && onSelect && onSelect()}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        height: '32px',
        padding: '0 12px',
        borderRadius: '9999px',
        fontSize: '13px',
        fontWeight: selected ? 700 : 500,
        fontFamily: 'var(--typography-font-family-sans, "Inter", sans-serif)',
        cursor: disabled ? 'not-allowed' : onSelect ? 'pointer' : 'default',
        opacity: disabled ? 0.5 : 1,
        backgroundColor: selected
          ? 'rgba(37, 99, 235, 0.1)'
          : variant === 'assist'
          ? 'rgba(124, 58, 237, 0.08)'
          : 'var(--sys-color-surface-card, #FFFFFF)',
        color: selected
          ? 'var(--sys-color-brand-primary, #2563EB)'
          : variant === 'assist'
          ? 'var(--color-ai-special-accent-primary, #7C3AED)'
          : 'var(--sys-color-text-primary, #0F172A)',
        border: `1.5px solid ${
          selected
            ? 'var(--sys-color-brand-primary, #2563EB)'
            : 'var(--sys-color-border-default, #CBD5E1)'
        }`,
        transition: 'all 0.15s ease',
        userSelect: 'none',
        whiteSpace: 'nowrap',
        ...style,
      }}
      className={`eds-chip eds-chip--${variant} ${selected ? 'eds-chip--selected' : ''} ${className}`}
    >
      {/* Leading Checkmark for selected filter chips */}
      {isFilter && selected && (
        <span style={{ fontSize: '12px', fontWeight: 800 }}>✓</span>
      )}

      {/* Custom Leading Icon */}
      {icon && <span style={{ display: 'inline-flex', fontSize: '14px' }}>{icon}</span>}

      <span>{label}</span>

      {/* Trailing Remove Button for Input chips */}
      {(isInput || onRemove) && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (onRemove) onRemove();
          }}
          style={{
            background: 'none',
            border: 'none',
            color: 'inherit',
            cursor: 'pointer',
            padding: '2px',
            fontSize: '14px',
            lineHeight: 1,
            marginLeft: '2px',
            opacity: 0.7,
          }}
          aria-label={`Remove ${label}`}
        >
          &times;
        </button>
      )}
    </div>
  );
};

