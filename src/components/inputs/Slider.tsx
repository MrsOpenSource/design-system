import React from 'react';

export interface SliderProps {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
  label?: string;
  showValueBadge?: boolean;
  unit?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const Slider: React.FC<SliderProps> = ({
  value,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  label,
  showValueBadge = true,
  unit = '',
  disabled = false,
  className = '',
  style,
}) => {
  const percentage = Math.min(Math.max(((value - min) / (max - min)) * 100, 0), 100);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        width: '100%',
        fontFamily: 'var(--typography-font-family-sans, "Inter", sans-serif)',
        userSelect: 'none',
        ...style,
      }}
      className={`eds-slider ${className}`}
    >
      {(label || showValueBadge) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {label && (
            <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--sys-color-text-primary, #0F172A)' }}>
              {label}
            </label>
          )}
          {showValueBadge && (
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '6px',
                backgroundColor: 'var(--sys-color-surface-sunken, #F1F5F9)',
                color: 'var(--sys-color-text-primary, #0F172A)',
                fontFamily: 'var(--typography-font-family-mono, monospace)',
                fontVariantNumeric: 'tabular-nums',
                border: '1px solid var(--sys-color-border-subtle, #E2E8F0)',
              }}
            >
              {value}{unit}
            </span>
          )}
        </div>
      )}

      {/* Track & Input */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', height: '36px' }}>
        {/* Background Track */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            height: '6px',
            borderRadius: '9999px',
            backgroundColor: 'var(--sys-color-surface-sunken, #E2E8F0)',
            overflow: 'hidden',
          }}
        >
          {/* Active Fill Track */}
          <div
            style={{
              width: `${percentage}%`,
              height: '100%',
              backgroundColor: disabled
                ? 'var(--sys-color-text-tertiary, #94A3B8)'
                : 'var(--sys-color-brand-primary, #2563EB)',
              borderRadius: '9999px',
            }}
          />
        </div>

        {/* Transparent Range Input */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{
            position: 'relative',
            width: '100%',
            height: '36px',
            opacity: 0,
            cursor: disabled ? 'not-allowed' : 'pointer',
            margin: 0,
            zIndex: 10,
          }}
        />

        {/* Custom Visual Thumb */}
        <div
          style={{
            position: 'absolute',
            left: `calc(${percentage}% - 10px)`,
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            backgroundColor: '#FFFFFF',
            border: `2px solid ${
              disabled
                ? 'var(--sys-color-text-tertiary, #94A3B8)'
                : 'var(--sys-color-brand-primary, #2563EB)'
            }`,
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.15)',
            pointerEvents: 'none',
            transition: 'left 0.05s ease',
          }}
        />
      </div>
    </div>
  );
};

