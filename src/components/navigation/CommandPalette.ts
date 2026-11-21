import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CommandItemData {
  id: string;
  label: string;
  category?: string;
  shortcut?: string;
  icon?: React.ReactNode;
  onSelect?: () => void;
}

export interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  items?: CommandItemData[];
  placeholder?: string;
  searchQuery?: string;
  onSelect?: (item: CommandItemData) => void;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export interface CommandPaletteContextType {
  query: string;
  setQuery: (q: string) => void;
  onClose: () => void;
  activeIndex: number;
  setActiveIndex: (idx: number) => void;
}

export const CommandPaletteContext = createContext<CommandPaletteContextType>({
  query: '',
  setQuery: () => {},
  onClose: () => {},
  activeIndex: 0,
  setActiveIndex: () => {},
});

export const useCommandPaletteContext = () => useContext(CommandPaletteContext);

// -----------------------------------------------------------------------------
// 1. Root Backdrop & Modal Container
// -----------------------------------------------------------------------------
export interface CommandPaletteRootProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const CommandPaletteRoot: React.FC<CommandPaletteRootProps> = (props) => {
  const { isOpen, onClose, className = '', style, children } = props || {};
  if (!isOpen) return null;

  return React.createElement(
    'div',
    {
      className: `eds-command-palette-backdrop ${className}`.trim(),
      style: {
        position: 'fixed',
        inset: 0,
        zIndex: 2500,
        backgroundColor: 'rgba(15, 23, 42, 0.6)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '15vh',
        ...style,
      },
      onClick: (e: any) => {
        if (e.target === e.currentTarget && onClose) {
          onClose();
        }
      },
    },
    React.createElement(
      'div',
      {
        role: 'dialog',
        'aria-modal': true,
        className: 'eds-command-palette',
        style: {
          width: '100%',
          maxWidth: '580px',
          backgroundColor: 'var(--sys-color-surface-elevated, #FFFFFF)',
          borderRadius: 'var(--radius-xl, 12px)',
          boxShadow: 'var(--shadow-xl, 0 20px 25px -5px rgba(0, 0, 0, 0.1))',
          border: '1px solid var(--sys-color-border-subtle, #E2E8F0)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        },
      },
      children
    )
  );
};

// -----------------------------------------------------------------------------
// 2. Input
// -----------------------------------------------------------------------------
export interface CommandPaletteInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value?: string;
  onChange?: (val: string) => void;
}

export const CommandPaletteInput: React.FC<CommandPaletteInputProps> = (props) => {
  const { value, onChange, placeholder = 'Type a command or search...', className = '', style, ...rest } =
    props || {};
  const context = useCommandPaletteContext();
  const currentVal = value !== undefined ? value : context.query;

  return React.createElement(
    'div',
    {
      className: `eds-command-palette__input-wrapper ${className}`.trim(),
      style: {
        display: 'flex',
        alignItems: 'center',
        padding: '12px 16px',
        borderBottom: '1px solid var(--sys-color-border-subtle, #E2E8F0)',
        gap: '10px',
        ...style,
      },
    },
    React.createElement('span', { style: { fontSize: 16, opacity: 0.5 } }, '🔍'),
    React.createElement('input', {
      type: 'text',
      className: 'eds-command-palette__input',
      value: currentVal,
      placeholder,
      onChange: (e: any) => {
        const val = e.target.value;
        if (onChange) onChange(val);
        context.setQuery(val);
      },
      style: {
        width: '100%',
        border: 'none',
        outline: 'none',
        fontSize: 'var(--typography-font-size-base, 16px)',
        backgroundColor: 'transparent',
        color: 'var(--sys-color-text-primary, #0F172A)',
      },
      ...rest,
    }),
    React.createElement(CommandPaletteShortcut, null, 'Esc')
  );
};

// -----------------------------------------------------------------------------
// 3. List
// -----------------------------------------------------------------------------
export interface CommandPaletteListProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const CommandPaletteList: React.FC<CommandPaletteListProps> = (props) => {
  const { className = '', style, children } = props || {};
  return React.createElement(
    'div',
    {
      role: 'listbox',
      className: `eds-command-palette__list ${className}`.trim(),
      style: {
        maxHeight: '340px',
        overflowY: 'auto',
        padding: '8px',
        ...style,
      },
    },
    children
  );
};

// -----------------------------------------------------------------------------
// 4. Group
// -----------------------------------------------------------------------------
export interface CommandPaletteGroupProps {
  heading: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const CommandPaletteGroup: React.FC<CommandPaletteGroupProps> = (props) => {
  const { heading, className = '', style, children } = props || {};
  return React.createElement(
    'div',
    {
      className: `eds-command-palette__group ${className}`.trim(),
      style: { marginBottom: '8px', ...style },
    },
    React.createElement(
      'div',
      {
        className: 'eds-command-palette__group-heading',
        style: {
          fontSize: 'var(--typography-font-size-2xs, 10px)',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          color: 'var(--sys-color-text-tertiary, #94A3B8)',
          padding: '6px 8px 4px',
        },
      },
      heading
    ),
    children
  );
};

// -----------------------------------------------------------------------------
// 5. Item
// -----------------------------------------------------------------------------
export interface CommandPaletteItemProps {
  id?: string;
  active?: boolean;
  onSelect?: () => void;
  shortcut?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const CommandPaletteItem: React.FC<CommandPaletteItemProps> = (props) => {
  const { active, onSelect, shortcut, className = '', style, children } = props || {};
  return React.createElement(
    'div',
    {
      role: 'option',
      'aria-selected': Boolean(active),
      onClick: onSelect,
      className: `eds-command-palette__item ${
        active ? 'eds-command-palette__item--active' : ''
      } ${className}`.trim(),
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 12px',
        borderRadius: 'var(--geometry-base-radius, 8px)',
        cursor: 'pointer',
        fontSize: 'var(--typography-font-size-sm, 14px)',
        color: active
          ? 'var(--sys-color-interactive-primary-default, #2563EB)'
          : 'var(--sys-color-text-primary, #0F172A)',
        backgroundColor: active
          ? 'var(--color-brand-placeholder-primary-50, #EFF6FF)'
          : 'transparent',
        transition: 'background-color 0.15s ease',
        ...style,
      },
    },
    React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } }, children),
    shortcut ? React.createElement(CommandPaletteShortcut, null, shortcut) : null
  );
};

// -----------------------------------------------------------------------------
// 6. Shortcut Badge
// -----------------------------------------------------------------------------
export interface CommandPaletteShortcutProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const CommandPaletteShortcut: React.FC<CommandPaletteShortcutProps> = (props) => {
  const { className = '', style, children } = props || {};
  return React.createElement(
    'kbd',
    {
      className: `eds-command-palette__shortcut ${className}`.trim(),
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2px 6px',
        fontSize: '11px',
        fontFamily: 'var(--typography-font-family-mono, monospace)',
        fontWeight: 600,
        lineHeight: 1,
        color: 'var(--sys-color-text-secondary, #475569)',
        backgroundColor: 'var(--color-neutral-100, #F1F5F9)',
        border: '1px solid var(--sys-color-border-subtle, #E2E8F0)',
        borderRadius: '4px',
        boxShadow: '0 1px 0 rgba(0,0,0,0.05)',
        ...style,
      },
    },
    children
  );
};

// -----------------------------------------------------------------------------
// 7. Empty State
// -----------------------------------------------------------------------------
export interface CommandPaletteEmptyProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const CommandPaletteEmpty: React.FC<CommandPaletteEmptyProps> = (props) => {
  const { className = '', style, children } = props || {};
  return React.createElement(
    'div',
    {
      className: `eds-command-palette__empty ${className}`.trim(),
      style: {
        padding: '32px 16px',
        textAlign: 'center',
        color: 'var(--sys-color-text-tertiary, #94A3B8)',
        fontSize: 'var(--typography-font-size-sm, 14px)',
        ...style,
      },
    },
    children
  );
};

// -----------------------------------------------------------------------------
// 8. Main Component & Compound Attachments
// -----------------------------------------------------------------------------
export interface CommandPaletteComponent extends React.FC<CommandPaletteProps> {
  Root: typeof CommandPaletteRoot;
  Input: typeof CommandPaletteInput;
  List: typeof CommandPaletteList;
  Group: typeof CommandPaletteGroup;
  Item: typeof CommandPaletteItem;
  Shortcut: typeof CommandPaletteShortcut;
  Empty: typeof CommandPaletteEmpty;
}

const CommandPaletteInternal: React.FC<CommandPaletteProps> = (props) => {
  const {
    isOpen,
    onClose,
    items = [],
    placeholder = 'Type a command or search...',
    searchQuery: controlledQuery,
    onSelect,
    className = '',
    style,
    children,
  } = props || {};

  const [uncontrolledQuery, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  const query = controlledQuery !== undefined ? controlledQuery : uncontrolledQuery;

  if (!isOpen) return null;

  // Filter items
  const filtered = items.filter((item) => {
    if (!query) return true;
    return (
      item.label.toLowerCase().includes(query.toLowerCase()) ||
      (item.category && item.category.toLowerCase().includes(query.toLowerCase()))
    );
  });

  // Group items by category
  const groups: Record<string, CommandItemData[]> = {};
  filtered.forEach((item) => {
    const cat = item.category || 'Commands';
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push(item);
  });

  // Simple auto-rendered mode if children are not provided
  const bodyContent = children || (
    React.createElement(
      React.Fragment,
      null,
      React.createElement(CommandPaletteInput, { placeholder }),
      React.createElement(
        CommandPaletteList,
        null,
        filtered.length === 0
          ? React.createElement(CommandPaletteEmpty, null, 'No matching commands found.')
          : Object.entries(groups).map(([cat, groupItems]) =>
              React.createElement(
                CommandPaletteGroup,
                { key: cat, heading: cat },
                groupItems.map((item, idx) =>
                  React.createElement(
                    CommandPaletteItem,
                    {
                      key: item.id,
                      active: idx === activeIndex,
                      shortcut: item.shortcut,
                      onSelect: () => {
                        if (item.onSelect) item.onSelect();
                        if (onSelect) onSelect(item);
                        if (onClose) onClose();
                      },
                    },
                    item.label
                  )
                )
              )
            )
      )
    )
  );

  return CommandPaletteRoot({
    isOpen,
    onClose,
    className,
    style,
    children: React.createElement(
      CommandPaletteContext.Provider,
      { value: { query, setQuery, onClose, activeIndex, setActiveIndex } },
      bodyContent
    ),
  });
};

export const CommandPalette: CommandPaletteComponent = Object.assign(
  CommandPaletteInternal,
  {
    Root: CommandPaletteRoot,
    Input: CommandPaletteInput,
    List: CommandPaletteList,
    Group: CommandPaletteGroup,
    Item: CommandPaletteItem,
    Shortcut: CommandPaletteShortcut,
    Empty: CommandPaletteEmpty,
  }
);

export default CommandPalette;
