import React from 'react';

export interface ListItemProps {
  headline: string;
  supportingText?: string;
  tertiaryText?: string;
  leadingVisual?: React.ReactNode;
  trailingMeta?: React.ReactNode;
  trailingAction?: React.ReactNode;
  onClick?: () => void;
  selected?: boolean;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const ListItem: React.FC<ListItemProps> = ({
  headline,
  supportingText,
  tertiaryText,
  leadingVisual,
  trailingMeta,
  trailingAction,
  onClick,
  selected = false,
  disabled = false,
  className = '',
  style,
}) => {
  const isInteractive = !!onClick && !disabled;

  return (
    <div
      onClick={isInteractive ? onClick : undefined}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 16px',
        backgroundColor: selected
          ? 'rgba(37, 99, 235, 0.08)'
          : 'var(--sys-color-surface-card, #FFFFFF)',
        borderBottom: '1px solid var(--sys-color-border-subtle, #E2E8F0)',
        cursor: isInteractive ? 'pointer' : 'default',
        opacity: disabled ? 0.5 : 1,
        transition: 'background-color 0.15s ease',
        fontFamily: 'var(--typography-font-family-sans, "Inter", sans-serif)',
        userSelect: 'none',
        ...style,
      }}
      className={`eds-list-item ${selected ? 'eds-list-item--selected' : ''} ${className}`}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0, flex: 1 }}>
        {leadingVisual && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {leadingVisual}
          </div>
        )}

        <div style={{ minWidth: 0, flex: 1 }}>
          <div
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--sys-color-text-primary, #0F172A)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {headline}
          </div>
          {supportingText && (
            <div
              style={{
                fontSize: '12px',
                color: 'var(--sys-color-text-secondary, #64748B)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                marginTop: '2px',
              }}
            >
              {supportingText}
            </div>
          )}
          {tertiaryText && (
            <div
              style={{
                fontSize: '11px',
                color: 'var(--sys-color-text-tertiary, #94A3B8)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                marginTop: '2px',
              }}
            >
              {tertiaryText}
            </div>
          )}
        </div>
      </div>

      {(trailingMeta || trailingAction) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0, marginLeft: '12px' }}>
          {trailingMeta && (
            <span
              style={{
                fontSize: '12px',
                color: 'var(--sys-color-text-tertiary, #94A3B8)',
                fontFamily: 'var(--typography-font-family-mono, monospace)',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {trailingMeta}
            </span>
          )}
          {trailingAction && <div>{trailingAction}</div>}
        </div>
      )}
    </div>
  );
};

