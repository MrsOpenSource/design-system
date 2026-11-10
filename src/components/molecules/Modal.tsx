import React from 'react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: string;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  maxWidth = '520px',
  className = '',
}) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(4px)',
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth,
          backgroundColor: 'var(--sys-color-surface-card, #FFFFFF)',
          borderRadius: 'var(--radius-2xl, 16px)',
          border: '1px solid var(--sys-color-border-default, #CBD5E1)',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          fontFamily: 'var(--typography-font-family-sans, "Inter", sans-serif)',
          animation: 'eds-fade-in 0.2s ease',
        }}
        className={`eds-modal ${className}`}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h3
              style={{
                fontSize: '18px',
                fontWeight: 700,
                color: 'var(--sys-color-text-primary, #0F172A)',
                margin: 0,
              }}
            >
              {title}
            </h3>
            {description && (
              <p
                style={{
                  fontSize: '13px',
                  color: 'var(--sys-color-text-secondary, #64748B)',
                  margin: '4px 0 0 0',
                }}
              >
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
              padding: '2px',
            }}
            aria-label="Close dialog"
          >
            &times;
          </button>
        </div>

        <div style={{ flex: 1, fontSize: '14px', color: 'var(--sys-color-text-primary, #0F172A)' }}>
          {children}
        </div>

        {footer && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '10px',
              borderTop: '1px solid var(--sys-color-border-subtle, #E2E8F0)',
              paddingTop: '16px',
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

