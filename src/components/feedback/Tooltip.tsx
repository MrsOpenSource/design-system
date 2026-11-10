import React, { useState, useRef, useEffect } from 'react';

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

/**
 * Responsive Tooltip Component
 * - Desktop (mouse pointer): Hover-triggered with subtle delay.
 * - Mobile / Touch: Converted to tap-to-open popover with outside click dismiss.
 */
export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipId = useRef(`tooltip-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (triggerRef.current && !triggerRef.current.contains(e.target as Node)) {
        setIsVisible(false);
      }
    };

    if (isVisible) {
      document.addEventListener('click', handleOutsideClick);
      document.addEventListener('touchend', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('click', handleOutsideClick);
      document.removeEventListener('touchend', handleOutsideClick);
    };
  }, [isVisible]);

  const positionStyles: Record<string, React.CSSProperties> = {
    top: {
      bottom: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      marginBottom: '8px',
    },
    bottom: {
      top: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      marginTop: '8px',
    },
    left: {
      right: '100%',
      top: '50%',
      transform: 'translateY(-50%)',
      marginRight: '8px',
    },
    right: {
      left: '100%',
      top: '50%',
      transform: 'translateY(-50%)',
      marginLeft: '8px',
    },
  };

  return (
    <div
      ref={triggerRef}
      style={{ position: 'relative', display: 'inline-flex' }}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onClick={() => setIsVisible(!isVisible)}
      className="eds-tooltip-wrapper"
    >
      {React.cloneElement(children, {
        'aria-describedby': isVisible ? tooltipId.current : undefined,
      })}

      {isVisible && (
        <div
          id={tooltipId.current}
          role="tooltip"
          className={`eds-tooltip-bubble ${className}`}
          style={{
            position: 'absolute',
            zIndex: 3000,
            backgroundColor: 'var(--sys-color-surface-contrast, #0F172A)',
            color: '#FFFFFF',
            fontSize: '11px',
            lineHeight: 1.4,
            fontWeight: 500,
            padding: '6px 10px',
            borderRadius: '6px',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
            fontFamily: 'var(--typography-font-family-sans, "Inter", sans-serif)',
            ...positionStyles[position],
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
};

