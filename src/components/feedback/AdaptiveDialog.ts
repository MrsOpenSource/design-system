import React, { useState, useEffect, useRef } from 'react';
import { createDialogStateMachine } from '../../core/dialogStateMachine.ts';
import {
  Modal,
  ModalRoot,
  ModalTrigger,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalClose,
  ModalBody,
  ModalFooter,
} from '../molecules/Modal.ts';
import {
  BottomSheet,
  BottomSheetRoot,
  BottomSheetTrigger,
  BottomSheetBackdrop,
  BottomSheetContent,
  BottomSheetHeader,
  BottomSheetTitle,
  BottomSheetDescription,
  BottomSheetClose,
  BottomSheetBody,
  BottomSheetFooter,
} from './BottomSheet.ts';

export interface AdaptiveDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: string;
  className?: string;
  breakpoint?: number;
}

export interface AdaptiveDialogComponent extends React.FC<AdaptiveDialogProps> {
  Root: typeof ModalRoot;
  Trigger: typeof ModalTrigger;
  Backdrop: typeof ModalBackdrop;
  Content: typeof ModalContent;
  Header: typeof ModalHeader;
  Title: typeof ModalTitle;
  Description: typeof ModalDescription;
  Close: typeof ModalClose;
  Body: typeof ModalBody;
  Footer: typeof ModalFooter;
}

const AdaptiveDialogInternal: React.FC<AdaptiveDialogProps> = ({
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
  const machineRef = useRef<ReturnType<typeof createDialogStateMachine> | null>(null);
  if (!machineRef.current) {
    machineRef.current = createDialogStateMachine({
      isOpen,
      breakpoint,
      onClose,
    });
  }

  const [machineState, setMachineState] = useState(() => machineRef.current!.getState());

  useEffect(() => {
    const machine = machineRef.current!;
    const unsubscribe = machine.subscribe((state) => {
      setMachineState(state);
    });

    if (typeof window === 'undefined') return unsubscribe;

    const handleResize = () => {
      machine.send({ type: 'VIEWPORT_RESIZE', width: window.innerWidth });
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      unsubscribe();
    };
  }, []);

  if (machineState.mode === 'mobile') {
    return React.createElement(
      BottomSheet,
      {
        isOpen,
        onClose,
        title,
        description,
        footer,
        className,
      },
      children
    );
  }

  return React.createElement(
    Modal,
    {
      isOpen,
      onClose,
      title: title || '',
      description,
      footer,
      maxWidth,
      className,
    },
    children
  );
};

export const AdaptiveDialog: AdaptiveDialogComponent = Object.assign(
  AdaptiveDialogInternal,
  {
    Root: ModalRoot,
    Trigger: ModalTrigger,
    Backdrop: ModalBackdrop,
    Content: ModalContent,
    Header: ModalHeader,
    Title: ModalTitle,
    Description: ModalDescription,
    Close: ModalClose,
    Body: ModalBody,
    Footer: ModalFooter,
  }
);

export default AdaptiveDialog;

