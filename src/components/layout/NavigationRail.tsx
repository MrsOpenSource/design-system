import React from 'react';

export interface RailItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: string | number;
  active?: boolean;
  onClick?: () => void;
}

export interface NavigationRailProps {
  items: RailItem[];
  activeId?: string;
  onSelect?: (id: string) => void;
  headerAction?: React.ReactNode;
  footerAction?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const NavigationRail: React.FC<NavigationRailProps> = ({
  items,
  activeId,
  onSelect,
  headerAction,
  footerAction,
  className = '',
  style,
}) => {
  return (
    <aside
      style={{
        width: '72px',
        height: '100vh',
        backgroundColor: 'var(--sys-color-surface-card, #FFFFFF)',
        borderRight: '1px solid var(--sys-color-border-subtle, #E2E8F0)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 0',
        zIndex: 50,
        fontFamily: 'var(--typography-font-family-sans, "Inter", sans-serif)',
        userSelect: 'none',
        flexShrink: 0,
        ...style,
      }}
      className={`eds-nav-rail ${className}`}
      role="navigation"
      aria-label="Navigation Rail"
    >
      {/* Top Header / FAB Action */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', width: '100%' }}>
        {headerAction && (
          <div style={{ marginBottom: '8px' }}>
            {headerAction}
          </div>
        )}

        {/* Vertical Rail Destinations */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', alignItems: 'center' }}>
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
                title={item.label}
                style={{
                  width: '56px',
                  minHeight: '52px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: 'var(--radius-lg, 12px)',
                  padding: '6px 4px',
                  transition: 'all 0.15s ease',
                  outline: 'none',
                  position: 'relative',
                }}
              >
                {/* Active Pill Indicator */}
                <div
                  style={{
                    width: '44px',
                    height: '30px',
                    borderRadius: '9999px',
                    backgroundColor: isActive
                      ? 'rgba(37, 99, 235, 0.12)'
                      : 'transparent',
                    color: isActive
                      ? 'var(--sys-color-brand-primary, #2563EB)'
                      : 'var(--sys-color-text-secondary, #64748B)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    transition: 'all 0.15s ease',
                    position: 'relative',
                  }}
                >
                  {item.icon}
                  {item.badge !== undefined && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '-2px',
                        right: '-2px',
                        fontSize: '10px',
                        fontWeight: 700,
                        padding: '1px 4px',
                        borderRadius: '9999px',
                        backgroundColor: 'var(--color-danger-base, #EF4444)',
                        color: '#FFFFFF',
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
                    color: isActive
                      ? 'var(--sys-color-brand-primary, #2563EB)'
                      : 'var(--sys-color-text-secondary, #64748B)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '64px',
                  }}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Footer Action */}
      {footerAction && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          {footerAction}
        </div>
      )}
    </aside>
  );
};

