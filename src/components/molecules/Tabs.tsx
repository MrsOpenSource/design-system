import React from 'react';

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
}

export interface TabsProps {
  items: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  variant?: 'underline' | 'segmented';
  className?: string;
  style?: React.CSSProperties;
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  activeId,
  onChange,
  variant = 'underline',
  className = '',
  style,
}) => {
  const isSegmented = variant === 'segmented';

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: isSegmented ? '4px' : '24px',
        padding: isSegmented ? '4px' : '0',
        backgroundColor: isSegmented ? 'var(--sys-color-surface-sunken, #F1F5F9)' : 'transparent',
        borderRadius: isSegmented ? 'var(--radius-lg, 8px)' : '0',
        borderBottom: isSegmented ? 'none' : '1px solid var(--sys-color-border-subtle, #E2E8F0)',
        width: isSegmented ? 'auto' : '100%',
        ...style,
      }}
      className={`eds-tabs eds-tabs--${variant} ${className}`}
      role="tablist"
    >
      {items.map((tab) => {
        const isActive = tab.id === activeId;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: isSegmented ? '6px 14px' : '12px 4px',
              fontSize: '14px',
              fontWeight: isActive ? 700 : 500,
              fontFamily: 'var(--typography-font-family-sans, "Inter", sans-serif)',
              color: isActive
                ? 'var(--sys-color-brand-primary, #2563EB)'
                : 'var(--sys-color-text-secondary, #64748B)',
              backgroundColor: isSegmented
                ? isActive
                  ? 'var(--sys-color-surface-card, #FFFFFF)'
                  : 'transparent'
                : 'transparent',
              borderRadius: isSegmented ? 'var(--radius-md, 6px)' : '0',
              border: 'none',
              borderBottom: !isSegmented && isActive ? '2px solid var(--sys-color-brand-primary, #2563EB)' : 'none',
              cursor: 'pointer',
              boxShadow: isSegmented && isActive ? '0 1px 3px rgba(0, 0, 0, 0.08)' : 'none',
              transition: 'all 0.15s ease',
              marginBottom: !isSegmented ? '-1px' : '0',
            }}
          >
            {tab.icon && <span>{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span
                style={{
                  fontSize: '11px',
                  padding: '1px 6px',
                  borderRadius: '9999px',
                  backgroundColor: isActive
                    ? 'rgba(37, 99, 235, 0.1)'
                    : 'var(--sys-color-surface-sunken, #E2E8F0)',
                  color: isActive
                    ? 'var(--sys-color-brand-primary, #2563EB)'
                    : 'var(--sys-color-text-tertiary, #94A3B8)',
                  fontWeight: 600,
                }}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

