import React, { useEffect } from 'react';

export type SnackbarVariant = 'info' | 'success' | 'warning' | 'error';

export interface SnackbarProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  variant?: SnackbarVariant;
  actionText?: string;
  onAction?: () => void;
  /** Auto-dismiss duration in milliseconds. Set to 0 to disable. Default: 4000 */
  autoDismissMs?: number;
  className?: string;
}

const variantStyles: Record<SnackbarVariant, { bg: string; color: string; border: string; icon: string }> = {
  info: {
    bg: '#0F172A',
    color: '#F8FAFC',
    border: 'rgba(255, 255, 255, 0.1)',
    icon: 'ℹ',
  },
  success: {
    bg: '#064E3B',
    color: '#ECFDF5',
    border: '#059669',
    icon: '✓',
  },
  warning: {
    bg: '#78350F',
    color: '#FEF3C7',
    border: '#D97706',
    icon: '⚠',
  },
  error: {
    bg: '#7F1D1D',
    color: '#FEF2F2',
    border: '#DC2626',
    icon: '✕',
  },
};

/**
 * Snackbar / Toast Component
 * Responsive Positioning:
 * - Desktop/Tablet (>600px): Anchored bottom-right
 * - Mobile (<=600px): Anchored bottom-center, full-width thumb zone with 16px margins
 */
export const Snackbar: React.FC<SnackbarProps> = ({
  isOpen,
  onClose,
  message,
  variant = 'info',
  actionText,
  onAction,
  autoDismissMs = 4000,
  className = '',
}) => {
  useEffect(() => {
    if (isOpen && autoDismissMs > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, autoDismissMs);
      return () => clearTimeout(timer);
    }
  }, [isOpen, autoDismissMs, onClose]);

  if (!isOpen) return null;

  const currentVariant = variantStyles[variant];

  return (
    <div
      role="status"
      aria-live="polite"
      className={`eds-snackbar ${className}`}
      style={{
        position: 'fixed',
        zIndex: 2500,
        backgroundColor: currentVariant.bg,
        color: currentVariant.color,
        border: `1px solid ${currentVariant.border}`,
        borderRadius: '8px',
        padding: '12px 16px',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        fontSize: '13px',
        fontFamily: 'var(--typography-font-family-sans, "Inter", sans-serif)',
        minHeight: '44px', // Adaptive touch target standard
        animation: 'eds-fade-in 0.2s ease',
      }}
    >
      <style>{`
        .eds-snackbar {
          bottom: 24px;
          right: 24px;
          max-width: 420px;
        }
        @media (max-width: 600px) {
          .eds-snackbar {
            bottom: 76px; /* Above BottomNavigation */
            left: 16px;
            right: 16px;
            max-width: none;
            justify-content: space-between;
          }
        }
      `}</style>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
        <span style={{ fontWeight: 700, fontSize: '14px', flexShrink: 0 }}>{currentVariant.icon}</span>
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {message}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
        {actionText && (
          <button
            onClick={() => {
              onAction?.();
              onClose();
            }}
            style={{
              background: 'none',
              border: 'none',
              color: '#38BDF8',
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer',
              padding: '4px 8px',
              borderRadius: '4px',
              minHeight: '32px',
            }}
          >
            {actionText}
          </button>
        )}
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: 'inherit',
            opacity: 0.7,
            cursor: 'pointer',
            fontSize: '16px',
            padding: '4px',
            lineHeight: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '28px',
            minHeight: '28px',
          }}
          aria-label="Dismiss notification"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

