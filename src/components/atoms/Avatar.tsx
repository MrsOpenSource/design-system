import React from 'react';

export interface AvatarProps {
  src?: string;
  name?: string;
  variant?: 'user' | 'ai';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  status?: 'online' | 'offline' | 'away';
  className?: string;
  style?: React.CSSProperties;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name = 'User',
  variant = 'user',
  size = 'md',
  status,
  className = '',
  style,
}) => {
  const sizeMap: Record<string, { size: number; font: number }> = {
    xs: { size: 24, font: 10 },
    sm: { size: 32, font: 12 },
    md: { size: 40, font: 14 },
    lg: { size: 48, font: 16 },
  };

  const current = sizeMap[size];
  const initials = name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const isAI = variant === 'ai';

  return (
    <div
      style={{
        position: 'relative',
        width: `${current.size}px`,
        height: `${current.size}px`,
        borderRadius: isAI ? '12px' : '50%',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        overflow: 'hidden',
        background: isAI
          ? 'linear-gradient(135deg, #7C3AED, #2563EB)'
          : 'var(--sys-color-surface-sunken, #E2E8F0)',
        color: isAI ? '#FFFFFF' : 'var(--sys-color-text-primary, #0F172A)',
        fontFamily: 'var(--typography-font-family-sans, "Inter", sans-serif)',
        fontWeight: 700,
        fontSize: `${current.font}px`,
        boxShadow: isAI ? '0 0 16px rgba(124, 58, 237, 0.4)' : 'none',
        border: isAI ? 'none' : '1.5px solid var(--sys-color-border-subtle, #E2E8F0)',
        ...style,
      }}
      className={`eds-avatar eds-avatar--${variant} eds-avatar--${size} ${className}`}
    >
      {src ? (
        <img
          src={src}
          alt={name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : isAI ? (
        <span>✨</span>
      ) : (
        <span>{initials}</span>
      )}

      {status && (
        <span
          style={{
            position: 'absolute',
            bottom: '0',
            right: '0',
            width: size === 'xs' ? '6px' : '10px',
            height: size === 'xs' ? '6px' : '10px',
            borderRadius: '50%',
            backgroundColor:
              status === 'online' ? '#10B981' : status === 'away' ? '#F59E0B' : '#94A3B8',
            border: '2px solid #FFFFFF',
          }}
        />
      )}
    </div>
  );
};

