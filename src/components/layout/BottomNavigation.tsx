import React from 'react';

export interface BottomNavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: string | number;
  active?: boolean;
  onClick?: () => void;
}

export interface BottomNavigationProps {
  items: BottomNavItem[];
  activeId?: string;
  onSelect?: (id: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  items,
  activeId,
  onSelect,
  className = '',
  style,
}) => {
  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '64px',
        backgroundColor: 'var(--sys-color-surface-card, #FFFFFF)',
        borderTop: '1px solid var(--sys-color-border-subtle, #E2E8F0)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '0 8px',
        zIndex: 1000,
        boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.05)',
        fontFamily: 'var(--typography-font-family-sans, "Inter", sans-serif)',
        userSelect: 'none',
        ...style,
      }}
      className={`eds-bottom-nav ${className}`}
      role="navigation"
      aria-label="Mobile Bottom Navigation"
    >
      {items.map((item) => {
        const isActive = activeId ? item.id === activeId : !!item.active;
        return (
          <button
            key={item.id}
            onClick={() => {
              if (item.onClick) item.onClick();
              if (onSelect) onSelect(item.id);
            }}
            aria-selected={isActive}
            style={{
              flex: 1,
              height: '100%',
              minWidth: '44px',
              minHeight: '44px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: isActive
                ? 'var(--sys-color-brand-primary, #2563EB)'
                : 'var(--sys-color-text-secondary, #64748B)',
              transition: 'all 0.15s ease',
              padding: '6px 0',
              position: 'relative',
              outline: 'none',
            }}
          >
            <div style={{ position: 'relative', display: 'inline-flex', fontSize: '20px' }}>
              {item.icon}
              {item.badge !== undefined && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-8px',
                    fontSize: '10px',
                    fontWeight: 700,
                    padding: '1px 5px',
                    borderRadius: '9999px',
                    backgroundColor: 'var(--color-danger-base, #EF4444)',
                    color: '#FFFFFF',
                    fontFamily: 'var(--typography-font-family-mono, monospace)',
                    lineHeight: 1.2,
                  }}
                >
                  {item.badge}
                </span>
              )}
            </div>
            <span
              style={{
                fontSize: '11px',
                fontWeight: isActive ? 700 : 500,
                letterSpacing: '-0.01em',
              }}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

