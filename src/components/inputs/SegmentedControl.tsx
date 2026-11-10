import React from 'react';

export interface SegmentedControlOption<T extends string = string> {
  value: T;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface SegmentedControlProps<T extends string = string> {
  options: SegmentedControlOption<T>[];
  value: T;
  onChange: (value: T) => void;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
}

export function SegmentedControl<T extends string = string>({
  options,
  value,
  onChange,
  size = 'md',
  fullWidth = false,
  className = '',
}: SegmentedControlProps<T>) {
  const sizeStyles = {
    sm: { height: '32px', padding: '2px', fontSize: '12px', minTarget: '32px' },
    md: { height: '40px', padding: '3px', fontSize: '13px', minTarget: '40px' },
    lg: { height: '48px', padding: '4px', fontSize: '14px', minTarget: '44px' }, // 44px+ touch compliant
  };

  const currentSize = sizeStyles[size];

  return (
    <div
      role="radiogroup"
      className={`eds-segmented-control ${className}`}
      style={{
        display: fullWidth ? 'flex' : 'inline-flex',
        alignItems: 'center',
        backgroundColor: 'var(--sys-color-surface-subtle, #F1F5F9)',
        borderRadius: '8px',
        padding: currentSize.padding,
        height: currentSize.height,
        boxSizing: 'border-box',
        border: '1px solid var(--sys-color-border-subtle, #E2E8F0)',
        fontFamily: 'var(--typography-font-family-sans, "Inter", sans-serif)',
        userSelect: 'none',
      }}
    >
      {options.map((option) => {
        const isSelected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            disabled={option.disabled}
            onClick={() => !option.disabled && onChange(option.value)}
            style={{
              flex: fullWidth ? 1 : 'none',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              height: '100%',
              padding: '0 12px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: isSelected
                ? 'var(--sys-color-surface-card, #FFFFFF)'
                : 'transparent',
              color: isSelected
                ? 'var(--sys-color-text-primary, #0F172A)'
                : 'var(--sys-color-text-secondary, #64748B)',
              fontWeight: isSelected ? 600 : 400,
              fontSize: currentSize.fontSize,
              cursor: option.disabled ? 'not-allowed' : 'pointer',
              opacity: option.disabled ? 0.5 : 1,
              boxShadow: isSelected
                ? '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)'
                : 'none',
              transition: 'all 0.15s ease',
              whiteSpace: 'nowrap',
              minHeight: currentSize.minTarget,
            }}
          >
            {option.icon && <span>{option.icon}</span>}
            <span>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}

