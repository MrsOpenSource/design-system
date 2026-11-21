import React from 'react';

export interface ModalContextType {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalContext = React.createContext<ModalContextType>({
  isOpen: false,
  onClose: () => {},
});

export const useModalContext = () => React.useContext(ModalContext);

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: string;
  className?: string;
  style?: React.CSSProperties;
}

export interface ModalRootProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export const ModalRoot: React.FC<ModalRootProps> = (props) => {
  const { isOpen, onClose, children } = props || {};
  if (!isOpen) return null;
  return React.createElement(
    ModalContext.Provider,
    { value: { isOpen: Boolean(isOpen), onClose: onClose || (() => {}) } },
    children
  );
};

export interface ModalTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export const ModalTrigger: React.FC<ModalTriggerProps> = (props) => {
  const { children, onClick, ...rest } = props || {};
  return React.createElement(
    'button',
    {
      type: 'button',
      onClick,
      ...rest,
    },
    children
  );
};

export interface ModalBackdropProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const ModalBackdrop: React.FC<ModalBackdropProps> = (props) => {
  const { children, style, className = '', onClick, ...rest } = props || {};
  const { onClose } = useModalContext();
  return React.createElement(
    'div',
    {
      style: {
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(4px)',
        padding: '20px',
        ...style,
      },
      className: `eds-modal-backdrop ${className}`.trim(),
      onClick: onClick || onClose,
      ...rest,
    },
    children
  );
};

export interface ModalContentProps extends React.HTMLAttributes<HTMLDivElement> {
  maxWidth?: string;
  children?: React.ReactNode;
}

export const ModalContent: React.FC<ModalContentProps> = (props) => {
  const { maxWidth = '520px', children, className = '', style, onClick, ...rest } = props || {};
  return React.createElement(
    'div',
    {
      role: 'dialog',
      'aria-modal': true,
      onClick: (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        onClick?.(e);
      },
      style: {
        width: '100%',
        maxWidth,
        backgroundColor: 'var(--sys-color-surface-card, #FFFFFF)',
        borderRadius: 'var(--radius-2xl, 16px)',
        border: '1px solid var(--sys-color-border-default, #CBD5E1)',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        fontFamily: 'var(--typography-font-family-sans, "Inter", sans-serif)',
        boxSizing: 'border-box',
        ...style,
      },
      className: `eds-modal ${className}`.trim(),
      ...rest,
    },
    children
  );
};

export interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const ModalHeader: React.FC<ModalHeaderProps> = (props) => {
  const { children, style, className = '', ...rest } = props || {};
  return React.createElement(
    'div',
    {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '12px',
        ...style,
      },
      className: `eds-modal__header ${className}`.trim(),
      ...rest,
    },
    children
  );
};

export interface ModalTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode;
}

export const ModalTitle: React.FC<ModalTitleProps> = (props) => {
  const { children, style, className = '', ...rest } = props || {};
  return React.createElement(
    'h3',
    {
      style: {
        fontSize: '18px',
        fontWeight: 700,
        color: 'var(--sys-color-text-primary, #0F172A)',
        margin: 0,
        lineHeight: 1.3,
        ...style,
      },
      className: `eds-modal__title ${className}`.trim(),
      ...rest,
    },
    children
  );
};

export interface ModalDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children?: React.ReactNode;
}

export const ModalDescription: React.FC<ModalDescriptionProps> = (props) => {
  const { children, style, className = '', ...rest } = props || {};
  return React.createElement(
    'p',
    {
      style: {
        fontSize: '13px',
        color: 'var(--sys-color-text-secondary, #64748B)',
        margin: '4px 0 0 0',
        lineHeight: 1.4,
        ...style,
      },
      className: `eds-modal__description ${className}`.trim(),
      ...rest,
    },
    children
  );
};

export interface ModalCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const ModalClose: React.FC<ModalCloseProps> = (props) => {
  const { onClick, style, className = '', ...rest } = props || {};
  const { onClose } = useModalContext();
  return React.createElement(
    'button',
    {
      type: 'button',
      onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(e);
        onClose();
      },
      style: {
        background: 'none',
        border: 'none',
        fontSize: '20px',
        color: 'var(--sys-color-text-tertiary, #94A3B8)',
        cursor: 'pointer',
        lineHeight: 1,
        padding: '2px',
        ...style,
      },
      'aria-label': 'Close dialog',
      className: `eds-modal__close ${className}`.trim(),
      ...rest,
    },
    '×'
  );
};

export interface ModalBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const ModalBody: React.FC<ModalBodyProps> = (props) => {
  const { children, style, className = '', ...rest } = props || {};
  return React.createElement(
    'div',
    {
      style: {
        flex: 1,
        fontSize: '14px',
        color: 'var(--sys-color-text-primary, #0F172A)',
        lineHeight: 1.5,
        ...style,
      },
      className: `eds-modal__body ${className}`.trim(),
      ...rest,
    },
    children
  );
};

export interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const ModalFooter: React.FC<ModalFooterProps> = (props) => {
  const { children, style, className = '', ...rest } = props || {};
  return React.createElement(
    'div',
    {
      style: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '10px',
        borderTop: '1px solid var(--sys-color-border-subtle, #E2E8F0)',
        paddingTop: '16px',
        ...style,
      },
      className: `eds-modal__footer ${className}`.trim(),
      ...rest,
    },
    children
  );
};

export interface ModalComponent extends React.FC<ModalProps> {
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

const ModalInternal: React.FC<ModalProps> = (props) => {
  const {
    isOpen,
    onClose,
    title,
    description,
    children,
    footer,
    maxWidth = '520px',
    className = '',
    style,
  } = props || {};

  if (!isOpen) return null;

  const headerItems: React.ReactNode[] = [];
  const textItems: React.ReactNode[] = [];

  if (title) {
    textItems.push(React.createElement(ModalTitle, { key: 'title' }, title));
  }
  if (description) {
    textItems.push(React.createElement(ModalDescription, { key: 'desc' }, description));
  }

  headerItems.push(
    React.createElement('div', { key: 'title-desc', style: { flex: 1, minWidth: 0 } }, textItems)
  );
  headerItems.push(React.createElement(ModalClose, { key: 'close' }));

  const contentChildren: React.ReactNode[] = [
    React.createElement(ModalHeader, { key: 'header' }, headerItems),
    React.createElement(ModalBody, { key: 'body' }, children),
  ];

  if (footer) {
    contentChildren.push(React.createElement(ModalFooter, { key: 'footer' }, footer));
  }

  return React.createElement(
    'div',
    {
      style: {
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(4px)',
        padding: '20px',
      },
      onClick: onClose,
    },
    React.createElement(
      ModalContent,
      {
        role: 'dialog',
        'aria-modal': true,
        maxWidth,
        className: `eds-modal ${className}`.trim(),
        style,
      },
      contentChildren
    )
  );
};

export const Modal: ModalComponent = Object.assign(ModalInternal, {
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
});

export default Modal;
