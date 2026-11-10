import React from 'react';

export interface CircularProgressProps {
  value?: number; // 0 to 100 for determinate, undefined for indeterminate
  size?: 'sm' | 'md' | 'lg' | number;
  strokeWidth?: number;
  color?: string;
  showLabel?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  size = 'md',
  strokeWidth,
  color = 'var(--sys-color-brand-primary, #2563EB)',
  showLabel = false,
  className = '',
  style,
}) => {
  const isIndeterminate = value === undefined;

  const sizePixelMap: Record<string, number> = {
    sm: 24,
    md: 40,
    lg: 64,
  };

  const pixelSize = typeof size === 'number' ? size : sizePixelMap[size] || 40;
  const stroke = strokeWidth || (pixelSize <= 24 ? 2.5 : pixelSize <= 40 ? 3.5 : 5);
  const radius = (pixelSize - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = isIndeterminate ? 0 : circumference - ((value || 0) / 100) * circumference;

  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: `${pixelSize}px`,
        height: `${pixelSize}px`,
        ...style,
      }}
      className={`eds-circular-progress ${className}`}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <svg
        width={pixelSize}
        height={pixelSize}
        style={{
          transform: isIndeterminate ? 'none' : 'rotate(-90deg)',
          animation: isIndeterminate ? 'eds-spin 1.2s linear infinite' : 'none',
        }}
      >
        {/* Background Track */}
        <circle
          cx={pixelSize / 2}
          cy={pixelSize / 2}
          r={radius}
          stroke="var(--sys-color-surface-sunken, #E2E8F0)"
          strokeWidth={stroke}
          fill="none"
        />
        {/* Progress Stroke */}
        <circle
          cx={pixelSize / 2}
          cy={pixelSize / 2}
          r={radius}
          stroke={color}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={isIndeterminate ? circumference * 0.75 : strokeDashoffset}
          strokeLinecap="round"
          fill="none"
          style={{
            transition: isIndeterminate ? 'none' : 'stroke-dashoffset 0.35s ease',
          }}
        />
      </svg>

      {!isIndeterminate && showLabel && pixelSize >= 40 && (
        <span
          style={{
            position: 'absolute',
            fontSize: pixelSize >= 64 ? '13px' : '10px',
            fontWeight: 700,
            fontFamily: 'var(--typography-font-family-mono, monospace)',
            fontVariantNumeric: 'tabular-nums',
            color: 'var(--sys-color-text-primary, #0F172A)',
          }}
        >
          {Math.round(value || 0)}%
        </span>
      )}
    </div>
  );
};

