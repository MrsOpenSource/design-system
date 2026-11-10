import React from 'react';

export interface StepItem {
  id: string | number;
  label: string;
  description?: string;
  optional?: boolean;
}

export interface StepperProps {
  steps: StepItem[];
  currentStep: number; // 0-indexed
  onStepClick?: (stepIndex: number) => void;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  style?: React.CSSProperties;
}

export const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  onStepClick,
  orientation = 'horizontal',
  className = '',
  style,
}) => {
  const isHorizontal = orientation === 'horizontal';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: isHorizontal ? 'row' : 'column',
        alignItems: isHorizontal ? 'center' : 'flex-start',
        justifyContent: 'space-between',
        width: '100%',
        gap: isHorizontal ? '12px' : '20px',
        fontFamily: 'var(--typography-font-family-sans, "Inter", sans-serif)',
        userSelect: 'none',
        ...style,
      }}
      className={`eds-stepper eds-stepper--${orientation} ${className}`}
      role="progressbar"
      aria-valuenow={currentStep + 1}
      aria-valuemin={1}
      aria-valuemax={steps.length}
    >
      {steps.map((step, idx) => {
        const isComplete = idx < currentStep;
        const isCurrent = idx === currentStep;
        const isPending = idx > currentStep;

        return (
          <React.Fragment key={step.id}>
            {/* Step Node */}
            <div
              onClick={() => onStepClick && isComplete && onStepClick(idx)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                cursor: onStepClick && isComplete ? 'pointer' : 'default',
              }}
            >
              {/* Step Circle */}
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '13px',
                  fontFamily: 'var(--typography-font-family-mono, monospace)',
                  backgroundColor: isComplete
                    ? 'var(--color-success-base, #10B981)'
                    : isCurrent
                    ? 'var(--sys-color-brand-primary, #2563EB)'
                    : 'var(--sys-color-surface-sunken, #F1F5F9)',
                  color: isPending
                    ? 'var(--sys-color-text-tertiary, #94A3B8)'
                    : '#FFFFFF',
                  border: isCurrent
                    ? '2px solid var(--sys-color-brand-primary, #2563EB)'
                    : isPending
                    ? '1.5px solid var(--sys-color-border-default, #CBD5E1)'
                    : 'none',
                  boxShadow: isCurrent ? '0 0 0 3px rgba(37, 99, 235, 0.2)' : 'none',
                  flexShrink: 0,
                  transition: 'all 0.2s ease',
                }}
              >
                {isComplete ? '✓' : idx + 1}
              </div>

              {/* Step Label */}
              <div>
                <div
                  style={{
                    fontSize: '13px',
                    fontWeight: isCurrent ? 700 : 500,
                    color: isCurrent
                      ? 'var(--sys-color-text-primary, #0F172A)'
                      : isComplete
                      ? 'var(--sys-color-text-primary, #0F172A)'
                      : 'var(--sys-color-text-tertiary, #94A3B8)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {step.label}
                </div>
                {step.description && isHorizontal && (
                  <div style={{ fontSize: '11px', color: 'var(--sys-color-text-tertiary, #94A3B8)' }}>
                    {step.description}
                  </div>
                )}
              </div>
            </div>

            {/* Connecting Bar */}
            {idx < steps.length - 1 && (
              <div
                style={{
                  flex: isHorizontal ? 1 : 'none',
                  height: isHorizontal ? '2px' : '24px',
                  width: isHorizontal ? 'auto' : '2px',
                  marginLeft: isHorizontal ? 0 : '15px',
                  backgroundColor: isComplete
                    ? 'var(--color-success-base, #10B981)'
                    : 'var(--sys-color-border-subtle, #E2E8F0)',
                  transition: 'background-color 0.2s ease',
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

