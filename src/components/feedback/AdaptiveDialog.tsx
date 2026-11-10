import React, { useState, useEffect } from 'react';
import { Modal, ModalProps } from '../molecules/Modal';
import { BottomSheet, BottomSheetProps } from './BottomSheet';

export interface AdaptiveDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: string;
  className?: string;
  /** Breakpoint in pixels below which the dialog transforms into a bottom sheet. Default: 600 */
  breakpoint?: number;
}

/**
 * AdaptiveDialog: Responsive Metamorphosis Component
 * - Viewport > 600px (Desktop/Tablet): Centered dialog window with backdrop dimming.
 * - Viewport <= 600px (Phone): Thumb-friendly Bottom Sheet sliding up from bottom with grab handle.
 *
 * Uses the exact same logical API regardless of device.
 */
export const AdaptiveDialog: React.FC<AdaptiveDialogProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  maxWidth = '520px',
  className = '',
  breakpoint = 600,
}) => {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth <= breakpoint;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= breakpoint);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  if (isMobile) {
    return (
      <BottomSheet
        isOpen={isOpen}
        onClose={onClose}
        title={title}
        description={description}
        footer={footer}
        className={className}
      >
        {children}
      </BottomSheet>
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title || ''}
      description={description}
      footer={footer}
      maxWidth={maxWidth}
      className={className}
    >
      {children}
    </Modal>
  );
};

