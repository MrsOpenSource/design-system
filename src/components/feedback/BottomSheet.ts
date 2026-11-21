import React from 'react';

export interface BottomSheetContextType {
  isOpen: boolean;
  onClose: () => void;
}

export const BottomSheetContext = React.createContext<BottomSheetContextType>({
  isOpen: false,
  onClose: () => {},
});

export const useBottomSheetContext = () => React.useContext(BottomSheetContext);

export interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export interface BottomSheetRootProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export const BottomSheetRoot: React.FC<BottomSheetRootProps> = (props) => {
  const { isOpen, onClose, children } = props || {};
  if (!isOpen) return null;
  return React.createElement(
    BottomSheetContext.Provider,
    { value: { isOpen: Boolean(isOpen), onClose: onClose || (() => {}) } },
    children
  );
};

export interface BottomSheetTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export const BottomSheetTrigger: React.FC<BottomSheetTriggerProps> = (props) => {
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

export interface BottomSheetBackdropProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const BottomSheetBackdrop: React.FC<BottomSheetBackdropProps> = (props) => {
  const { children, style, className = '', onClick, ...rest } = props || {};
  const { onClose } = useBottomSheetContext();
  return React.createElement(
    'div',
    {
      style: {
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        backgroundColor: 'rgba(15, 23, 42, 0.6)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        ...style,
      },
      className: `eds-bottom-sheet-backdrop ${className}`.trim(),
      onClick: onClick || onClose,
      ...rest,
    },
    children
  );
};

export interface BottomSheetHandleProps extends React.HTMLAttributes<HTMLDivElement> {}

export const BottomSheetHandle: React.FC<BottomSheetHandleProps> = (props) => {
  const { style, className = '', ...rest } = props || {};
  return React.createElement(
    'div',
    {
      style: { display: 'flex', justifyContent: 'center', padding: '4px 0 12px', ...style },
      className: `eds-bottom-sheet__handle-wrapper ${className}`.trim(),
      ...rest,
    },
    React.createElement('div', {
      style: {
        width: '36px',
        height: '4px',
        borderRadius: '9999px',
        backgroundColor: 'var(--sys-color-border-strong, #CBD5E1)',
        opacity: 0.6,
      },
      className: 'eds-bottom-sheet__handle',
    })
  );
};

export interface BottomSheetContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const BottomSheetContent: React.FC<BottomSheetContentProps> = (props) => {
  const { children, style, className = '', onClick, ...rest } = props || {};
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
        maxWidth: '600px',
        maxHeight: '90vh',
        backgroundColor: 'var(--sys-color-surface-card, #FFFFFF)',
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px',
        border: '1px solid var(--sys-color-border-default, #CBD5E1)',
        boxShadow: '0 -10px 25px -5px rgba(0, 0, 0, 0.15)',
        display: 'flex',
        flexDirection: 'column',
        padding: '12px 20px 24px',
        fontFamily: 'var(--typography-font-family-sans, "Inter", sans-serif)',
        boxSizing: 'border-box',
        ...style,
      },
      className: `eds-bottom-sheet ${className}`.trim(),
      ...rest,
    },
    children
  );
};

export interface BottomSheetHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const BottomSheetHeader: React.FC<BottomSheetHeaderProps> = (props) => {
  const { children, style, className = '', ...rest } = props || {};
  return React.createElement(
    'div',
    {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '16px',
        gap: '12px',
        ...style,
      },
      className: `eds-bottom-sheet__header ${className}`.trim(),
      ...rest,
    },
    children
  );
};

export interface BottomSheetTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode;
}

export const BottomSheetTitle: React.FC<BottomSheetTitleProps> = (props) => {
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
      className: `eds-bottom-sheet__title ${className}`.trim(),
      ...rest,
    },
    children
  );
};

export interface BottomSheetDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children?: React.ReactNode;
}

export const BottomSheetDescription: React.FC<BottomSheetDescriptionProps> = (props) => {
  const { children, style, className = '', ...rest } = props || {};
  return React.createElement(
    'p',
    {
      style: {
        fontSize: '13px',
        color: 'var(--sys-color-text-secondary, #64748B)',
        margin: '4px 0 0',
        lineHeight: 1.4,
        ...style,
      },
      className: `eds-bottom-sheet__description ${className}`.trim(),
      ...rest,
    },
    children
  );
};

export interface BottomSheetCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const BottomSheetClose: React.FC<BottomSheetCloseProps> = (props) => {
  const { onClick, style, className = '', ...rest } = props || {};
  const { onClose } = useBottomSheetContext();
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
      'aria-label': 'Close sheet',
      className: `eds-bottom-sheet__close ${className}`.trim(),
      ...rest,
    },
    '×'
  );
};

export interface BottomSheetBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const BottomSheetBody: React.FC<BottomSheetBodyProps> = (props) => {
  const { children, style, className = '', ...rest } = props || {};
  return React.createElement(
    'div',
    {
      style: {
        flex: 1,
        overflowY: 'auto',
        fontSize: '14px',
        color: 'var(--sys-color-text-primary, #0F172A)',
        lineHeight: 1.5,
        ...style,
      },
      className: `eds-bottom-sheet__body ${className}`.trim(),
      ...rest,
    },
    children
  );
};

export interface BottomSheetFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const BottomSheetFooter: React.FC<BottomSheetFooterProps> = (props) => {
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
      className: `eds-bottom-sheet__footer ${className}`.trim(),
      ...rest,
    },
    children
  );
};

export interface BottomSheetComponent extends React.FC<BottomSheetProps> {
  Root: typeof BottomSheetRoot;
  Trigger: typeof BottomSheetTrigger;
  Backdrop: typeof BottomSheetBackdrop;
  Handle: typeof BottomSheetHandle;
  Content: typeof BottomSheetContent;
  Header: typeof BottomSheetHeader;
  Title: typeof BottomSheetTitle;
  Description: typeof BottomSheetDescription;
  Close: typeof BottomSheetClose;
  Body: typeof BottomSheetBody;
  Footer: typeof BottomSheetFooter;
}

const BottomSheetInternal: React.FC<BottomSheetProps> = (props) => {
  const {
    isOpen,
    onClose,
    title,
    description,
    children,
    footer,
    className = '',
    style,
  } = props || {};

  if (!isOpen) return null;

  const headerItems: React.ReactNode[] = [];
  const textItems: React.ReactNode[] = [];

  if (title) {
    textItems.push(React.createElement(BottomSheetTitle, { key: 'title' }, title));
  }
  if (description) {
    textItems.push(React.createElement(BottomSheetDescription, { key: 'desc' }, description));
  }

  headerItems.push(
    React.createElement('div', { key: 'title-desc', style: { flex: 1, minWidth: 0 } }, textItems)
  );
  headerItems.push(React.createElement(BottomSheetClose, { key: 'close' }));

  const contentChildren: React.ReactNode[] = [
    React.createElement(BottomSheetHandle, { key: 'handle' }),
  ];

  if (title || description) {
    contentChildren.push(React.createElement(BottomSheetHeader, { key: 'header' }, headerItems));
  }

  contentChildren.push(React.createElement(BottomSheetBody, { key: 'body' }, children));

  if (footer) {
    contentChildren.push(React.createElement(BottomSheetFooter, { key: 'footer' }, footer));
  }

  return React.createElement(
    'div',
    {
      onClick: onClose,
      style: {
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        backgroundColor: 'rgba(15, 23, 42, 0.6)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
      },
      className: 'eds-bottom-sheet-backdrop',
    },
    React.createElement(
      BottomSheetContent,
      {
        role: 'dialog',
        'aria-modal': true,
        className: `eds-bottom-sheet ${className}`.trim(),
        style,
      },
      contentChildren
    )
  );
};

export const BottomSheet: BottomSheetComponent = Object.assign(BottomSheetInternal, {
  Root: BottomSheetRoot,
  Trigger: BottomSheetTrigger,
  Backdrop: BottomSheetBackdrop,
  Handle: BottomSheetHandle,
  Content: BottomSheetContent,
  Header: BottomSheetHeader,
  Title: BottomSheetTitle,
  Description: BottomSheetDescription,
  Close: BottomSheetClose,
  Body: BottomSheetBody,
  Footer: BottomSheetFooter,
});

export default BottomSheet;
