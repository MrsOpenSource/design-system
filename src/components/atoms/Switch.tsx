import React from 'react';

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  className = '',
  style,
}) => {
  return (
    <label
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        userSelect: 'none',
        ...style,
      }}
      className={`eds-switch ${className}`}
    >
      <div
        onClick={() => !disabled && onChange(!checked)}
        style={{
          width: '40px',
          height: '22px',
          borderRadius: '9999px',
          backgroundColor: checked
            ? 'var(--sys-color-brand-primary, #2563EB)'
            : 'var(--sys-color-border-default, #CBD5E1)',
          position: 'relative',
          transition: 'background-color 0.2s ease',
          boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '2px',
            left: checked ? '20px' : '2px',
            width: '18px',
            height: '18px',
            borderRadius: '50%',
            backgroundColor: '#FFFFFF',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
            transition: 'left 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      </div>

      {label && (
        <span
          style={{
            fontSize: '14px',
            fontWeight: 500,
            fontFamily: 'var(--typography-font-family-sans, "Inter", sans-serif)',
            color: 'var(--sys-color-text-primary, #0F172A)',
          }}
        >
          {label}
        </span>
      )}
    </label>
  );
};

