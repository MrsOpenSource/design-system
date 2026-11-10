import React, { useEffect } from 'react';

export interface MobileNavItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
  active?: boolean;
  onClick?: () => void;
}

export interface HamburgerMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  brandName?: string;
  brandLogo?: React.ReactNode;
  items: MobileNavItem[];
  activeId?: string;
  onSelect?: (id: string) => void;
  className?: string;
}

export const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
  isOpen,
  onToggle,
  brandName = 'Enterprise',
  brandLogo,
  items,
  activeId,
  onSelect,
  className = '',
}) => {
  // Prevent background body scroll when mobile drawer is open
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

  return (
    <>
      {/* Animated Hamburger Trigger Button */}
      <button
        onClick={onToggle}
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isOpen}
        style={{
          width: '40px',
          height: '40px',
          display: 'inline-flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '5px',
          backgroundColor: 'var(--sys-color-surface-card, #FFFFFF)',
          border: '1px solid var(--sys-color-border-default, #CBD5E1)',
          borderRadius: 'var(--radius-lg, 8px)',
          cursor: 'pointer',
          padding: '8px',
          transition: 'all 0.2s ease',
          zIndex: 1100,
        }}
        className={`eds-hamburger-btn ${isOpen ? 'eds-hamburger-btn--open' : ''} ${className}`}
      >
        <span
          style={{
            width: '20px',
            height: '2px',
            backgroundColor: 'var(--sys-color-text-primary, #0F172A)',
            borderRadius: '2px',
            transition: 'all 0.25s ease',
            transform: isOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
          }}
        />
        <span
          style={{
            width: '20px',
            height: '2px',
            backgroundColor: 'var(--sys-color-text-primary, #0F172A)',
            borderRadius: '2px',
            transition: 'all 0.25s ease',
            opacity: isOpen ? 0 : 1,
            transform: isOpen ? 'scale(0)' : 'none',
          }}
        />
        <span
          style={{
            width: '20px',
            height: '2px',
            backgroundColor: 'var(--sys-color-text-primary, #0F172A)',
            borderRadius: '2px',
            transition: 'all 0.25s ease',
            transform: isOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
          }}
        />
      </button>

      {/* Slide-over Mobile Drawer & Backdrop */}
      {isOpen && (
        <div
          onClick={onToggle}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1050,
            backgroundColor: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            animation: 'eds-fade-in 0.2s ease',
          }}
        >
          {/* Drawer Pane */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '280px',
              maxWidth: '80vw',
              height: '100%',
              backgroundColor: 'var(--sys-color-surface-card, #FFFFFF)',
              borderRight: '1px solid var(--sys-color-border-default, #CBD5E1)',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '20px 16px',
              animation: 'eds-slide-in-left 0.25s ease',
              fontFamily: 'var(--typography-font-family-sans, "Inter", sans-serif)',
            }}
          >
            <div>
              {/* Drawer Brand Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid var(--sys-color-border-subtle, #E2E8F0)' }}>
                {brandLogo || (
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      background: 'linear-gradient(135deg, var(--sys-color-brand-primary, #2563EB), var(--color-ai-special-accent-primary, #7C3AED))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFFFFF',
                      fontWeight: 800,
                      fontSize: '16px',
                      boxShadow: '0 2px 6px rgba(37, 99, 235, 0.3)',
                    }}
                  >
                    {brandName.charAt(0)}
                  </div>
                )}
                <div>
                  <div style={{ fontWeight: 800, fontSize: '16px', color: 'var(--sys-color-text-primary, #0F172A)' }}>
                    {brandName}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--sys-color-text-tertiary, #94A3B8)' }}>
                    Navigation
                  </div>
                </div>
              </div>

              {/* Navigation Links */}
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {items.map((item) => {
                  const isActive = activeId ? item.id === activeId : !!item.active;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        if (item.onClick) item.onClick();
                        if (onSelect) onSelect(item.id);
                        onToggle();
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        height: '42px',
                        padding: '0 14px',
                        borderRadius: 'var(--radius-lg, 8px)',
                        border: 'none',
                        backgroundColor: isActive
                          ? 'rgba(37, 99, 235, 0.08)'
                          : 'transparent',
                        color: isActive
                          ? 'var(--sys-color-brand-primary, #2563EB)'
                          : 'var(--sys-color-text-secondary, #475569)',
                        fontWeight: isActive ? 700 : 500,
                        fontSize: '14px',
                        cursor: 'pointer',
                        width: '100%',
                        textAlign: 'left',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        {item.icon && <span style={{ fontSize: '18px' }}>{item.icon}</span>}
                        <span>{item.label}</span>
                      </div>
                      {item.badge !== undefined && (
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: 700,
                            padding: '1px 6px',
                            borderRadius: '9999px',
                            backgroundColor: 'var(--sys-color-surface-sunken, #F1F5F9)',
                            color: 'var(--sys-color-text-secondary, #64748B)',
                          }}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div style={{ fontSize: '12px', color: 'var(--sys-color-text-tertiary, #94A3B8)', textAlign: 'center', paddingTop: '16px', borderTop: '1px solid var(--sys-color-border-subtle, #E2E8F0)' }}>
              © 2026 {brandName} Design System
            </div>
          </div>
        </div>
      )}
    </>
  );
};

