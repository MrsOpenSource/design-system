import React, { useEffect } from 'react';

export interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  className = '',
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        backgroundColor: 'rgba(15, 23, 42, 0.6)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        animation: 'eds-fade-in 0.2s ease',
      }}
      className="eds-bottom-sheet-backdrop"
    >
      {/* Sheet Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '600px',
          maxHeight: '90vh',
          backgroundColor: 'var(--sys-color-surface-card, #FFFFFF)',
          borderTopLeftRadius: '20px',
          borderTopRightRadius: '20px',
          border: '1px solid var(--sys-color-border-default, #CBD5E1)',
          boxShadow: '0 -10px 25px -5px rgba(0, 0, 0, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          padding: '12px 20px 24px',
          animation: 'eds-slide-in-up 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          fontFamily: 'var(--typography-font-family-sans, "Inter", sans-serif)',
        }}
        className={`eds-bottom-sheet ${className}`}
        role="dialog"
        aria-modal="true"
      >
        {/* Grab Handle */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '4px 0 12px' }}>
          <div
            style={{
              width: '36px',
              height: '4px',
              borderRadius: '9999px',
              backgroundColor: 'var(--sys-color-border-strong, #CBD5E1)',
              opacity: 0.6,
            }}
          />
        </div>

        {/* Header */}
        {(title || description) && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div>
              {title && (
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--sys-color-text-primary, #0F172A)', margin: 0 }}>
                  {title}
                </h3>
              )}
              {description && (
                <p style={{ fontSize: '13px', color: 'var(--sys-color-text-secondary, #64748B)', margin: '4px 0 0' }}>
                  {description}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '20px',
                color: 'var(--sys-color-text-tertiary, #94A3B8)',
                cursor: 'pointer',
                lineHeight: 1,
              }}
              aria-label="Close sheet"
            >
              &times;
            </button>
          </div>
        )}

        {/* Content Body */}
        <div style={{ flex: 1, overflowY: 'auto', fontSize: '14px', color: 'var(--sys-color-text-primary, #0F172A)' }}>
          {children}
        </div>

        {/* Footer Actions */}
        {footer && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '10px',
              borderTop: '1px solid var(--sys-color-border-subtle, #E2E8F0)',
              paddingTop: '16px',
              marginTop: '16px',
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

