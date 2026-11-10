import React from 'react';

export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: string | number;
  badgeVariant?: 'default' | 'ai' | 'warning' | 'success';
  active?: boolean;
  onClick?: () => void;
}

export interface NavGroup {
  title?: string;
  items: NavItem[];
}

export interface SidebarProps {
  brandName?: string;
  brandLogo?: React.ReactNode;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  groups: NavGroup[];
  activeId?: string;
  onSelect?: (id: string) => void;
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
  className?: string;
  style?: React.CSSProperties;
}

export const Sidebar: React.FC<SidebarProps> = ({
  brandName = 'Enterprise',
  brandLogo,
  isCollapsed = false,
  onToggleCollapse,
  groups,
  activeId,
  onSelect,
  user,
  className = '',
  style,
}) => {
  const width = isCollapsed ? '68px' : '260px';

  return (
    <aside
      style={{
        width,
        height: '100vh',
        backgroundColor: 'var(--sys-color-surface-card, #FFFFFF)',
        borderRight: '1px solid var(--sys-color-border-subtle, #E2E8F0)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: isCollapsed ? '16px 8px' : '16px 14px',
        transition: 'width 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        fontFamily: 'var(--typography-font-family-sans, "Inter", sans-serif)',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
        position: 'relative',
        zIndex: 50,
        overflow: 'hidden',
        userSelect: 'none',
        ...style,
      }}
      className={`eds-sidebar ${isCollapsed ? 'eds-sidebar--collapsed' : ''} ${className}`}
    >
      {/* Top Brand Header */}
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: isCollapsed ? 'center' : 'space-between',
            height: '48px',
            marginBottom: '16px',
            padding: '0 4px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
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
                  flexShrink: 0,
                  boxShadow: '0 2px 6px rgba(37, 99, 235, 0.3)',
                }}
              >
                {brandName.charAt(0)}
              </div>
            )}
            {!isCollapsed && (
              <div style={{ minWidth: 0, overflow: 'hidden' }}>
                <div style={{ fontWeight: 800, fontSize: '15px', color: 'var(--sys-color-text-primary, #0F172A)', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                  {brandName}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--sys-color-text-tertiary, #94A3B8)', whiteSpace: 'nowrap' }}>
                  Enterprise Suite
                </div>
              </div>
            )}
          </div>

          {onToggleCollapse && !isCollapsed && (
            <button
              onClick={onToggleCollapse}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--sys-color-text-tertiary, #94A3B8)',
                cursor: 'pointer',
                padding: '4px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              title="Collapse Sidebar"
            >
              ◀
            </button>
          )}
        </div>

        {/* Navigation Groups */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {groups.map((group, gIdx) => (
            <div key={gIdx} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {group.title && !isCollapsed && (
                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: 'var(--sys-color-text-tertiary, #94A3B8)',
                    padding: '4px 10px',
                  }}
                >
                  {group.title}
                </div>
              )}
              {group.items.map((item) => {
                const isActive = activeId ? item.id === activeId : !!item.active;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (item.onClick) item.onClick();
                      if (onSelect) onSelect(item.id);
                    }}
                    title={isCollapsed ? item.label : undefined}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: isCollapsed ? 'center' : 'space-between',
                      gap: '10px',
                      height: '40px',
                      padding: isCollapsed ? '0' : '0 12px',
                      borderRadius: 'var(--radius-lg, 8px)',
                      border: 'none',
                      backgroundColor: isActive
                        ? 'rgba(37, 99, 235, 0.08)'
                        : 'transparent',
                      color: isActive
                        ? 'var(--sys-color-brand-primary, #2563EB)'
                        : 'var(--sys-color-text-secondary, #475569)',
                      cursor: 'pointer',
                      fontWeight: isActive ? 700 : 500,
                      fontSize: '14px',
                      transition: 'all 0.15s ease',
                      width: '100%',
                      outline: 'none',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ display: 'inline-flex', fontSize: '18px', color: isActive ? 'inherit' : 'var(--sys-color-text-tertiary, #94A3B8)' }}>
                        {item.icon}
                      </span>
                      {!isCollapsed && <span>{item.label}</span>}
                    </div>

                    {!isCollapsed && item.badge !== undefined && (
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '1px 7px',
                          borderRadius: '9999px',
                          backgroundColor:
                            item.badgeVariant === 'ai'
                              ? 'rgba(124, 58, 237, 0.12)'
                              : item.badgeVariant === 'warning'
                              ? '#FEF3C7'
                              : 'var(--sys-color-surface-sunken, #F1F5F9)',
                          color:
                            item.badgeVariant === 'ai'
                              ? '#7C3AED'
                              : item.badgeVariant === 'warning'
                              ? '#92400E'
                              : 'var(--sys-color-text-secondary, #64748B)',
                          fontFamily: 'var(--typography-font-family-mono, monospace)',
                          fontVariantNumeric: 'tabular-nums',
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>
      </div>

      {/* Bottom User Profile Section */}
      {user && (
        <div
          style={{
            borderTop: '1px solid var(--sys-color-border-subtle, #E2E8F0)',
            paddingTop: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: isCollapsed ? 'center' : 'flex-start',
            gap: '10px',
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'var(--sys-color-surface-sunken, #F1F5F9)',
              border: '1.5px solid var(--sys-color-border-subtle, #E2E8F0)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '13px',
              color: 'var(--sys-color-text-primary, #0F172A)',
              flexShrink: 0,
            }}
          >
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
            ) : (
              user.name.split(' ').map((n) => n[0]).slice(0, 2).join('')
            )}
          </div>

          {!isCollapsed && (
            <div style={{ minWidth: 0, flex: 1, overflow: 'hidden' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--sys-color-text-primary, #0F172A)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                {user.name}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--sys-color-text-tertiary, #94A3B8)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                {user.email}
              </div>
            </div>
          )}
        </div>
      )}
    </aside>
  );
};

