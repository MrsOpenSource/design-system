import React from 'react';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface SelectOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
  description?: React.ReactNode;
}

export type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  options?: SelectOption[];
  placeholder?: string;
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  error?: React.ReactNode;
  disabled?: boolean;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  size?: SelectSize;
  className?: string;
  style?: React.CSSProperties;
}

export interface SelectOptionProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  label?: React.ReactNode;
  selected?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  description?: React.ReactNode;
}

export interface SelectComponent extends React.ForwardRefExoticComponent<SelectProps & React.RefAttributes<HTMLDivElement>> {
  Option: React.FC<SelectOptionProps>;
}

export interface DropdownMenuItem {
  id?: string;
  label?: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  danger?: boolean;
  divider?: boolean;
}

export interface DropdownMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  trigger?: React.ReactNode;
  items?: DropdownMenuItem[];
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  align?: 'left' | 'right';
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export interface DropdownMenuTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export interface DropdownMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: 'left' | 'right';
  children?: React.ReactNode;
}

export interface DropdownMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  danger?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export interface DropdownMenuDividerProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface DropdownMenuComponent extends React.ForwardRefExoticComponent<DropdownMenuProps & React.RefAttributes<HTMLDivElement>> {
  Trigger: React.FC<DropdownMenuTriggerProps>;
  Content: React.FC<DropdownMenuContentProps>;
  Item: React.FC<DropdownMenuItemProps>;
  Divider: React.FC<DropdownMenuDividerProps>;
}

// Chevron down SVG icon helper
const renderChevronIcon = () =>
  React.createElement(
    'svg',
    {
      key: 'chevron',
      viewBox: '0 0 20 20',
      width: '16',
      height: '16',
      fill: 'none',
      stroke: 'var(--sys-color-text-secondary, #475569)',
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      style: { flexShrink: 0, marginLeft: 'auto' },
    },
    React.createElement('polyline', { points: '6 8 10 12 14 8' })
  );

// ============================================================================
// SELECT COMPONENT
// ============================================================================

export const SelectOptionItem: React.FC<SelectOptionProps> = ({
  value,
  label,
  children,
  selected = false,
  disabled = false,
  icon,
  description,
  className = '',
  style,
  ...props
}) => {
  const isSelected = Boolean(selected);
  const isDisabled = Boolean(disabled);

  const optionClasses = [
    'eds-select__option',
    isSelected ? 'eds-select__option--selected' : '',
    isDisabled ? 'eds-select__option--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const optionStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 12px',
    fontSize: '14px',
    color: isDisabled
      ? 'var(--sys-color-text-tertiary, #94A3B8)'
      : isSelected
      ? 'var(--sys-color-brand-primary, #2563EB)'
      : 'var(--sys-color-text-primary, #0F172A)',
    backgroundColor: isSelected
      ? 'var(--sys-color-surface-sunken, #F1F5F9)'
      : 'transparent',
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    userSelect: 'none',
    transition: 'background-color 0.1s ease',
    ...style,
  };

  return React.createElement(
    'div',
    {
      role: 'option',
      'aria-selected': isSelected ? 'true' : 'false',
      'aria-disabled': isDisabled ? 'true' : undefined,
      className: optionClasses,
      style: optionStyle,
      ...props,
    },
    icon,
    React.createElement(
      'div',
      { style: { display: 'flex', flexDirection: 'column', flex: 1 } },
      React.createElement('span', null, children || label || value),
      description &&
        React.createElement(
          'span',
          {
            style: {
              fontSize: '12px',
              color: 'var(--sys-color-text-secondary, #475569)',
            },
          },
          description
        )
    )
  );
};

SelectOptionItem.displayName = 'Select.Option';

const SelectInternal = React.forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      options = [],
      placeholder = 'Select an option...',
      label,
      helperText,
      error,
      disabled = false,
      isOpen,
      onOpenChange,
      size = 'md',
      className = '',
      style,
      children,
      id,
      ...props
    },
    ref
  ) => {
    const [internalOpen, setInternalOpen] = React.useState(false);
    const [internalVal, setInternalVal] = React.useState<string | undefined>(defaultValue);

    const isControlledOpen = isOpen !== undefined;
    const isMenuOpen = isControlledOpen ? Boolean(isOpen) : internalOpen;

    const isControlledVal = value !== undefined;
    const currentVal = isControlledVal ? value : internalVal;

    const isDisabled = Boolean(disabled);
    const hasError = Boolean(error);

    const handleToggle = () => {
      if (isDisabled) return;
      const next = !isMenuOpen;
      if (!isControlledOpen) setInternalOpen(next);
      onOpenChange?.(next);
    };

    const handleSelect = (val: string) => {
      if (isDisabled) return;
      if (!isControlledVal) setInternalVal(val);
      onChange?.(val);
      if (!isControlledOpen) setInternalOpen(false);
      onOpenChange?.(false);
    };

    // Find label for currently selected value
    const selectedOption = options.find((opt) => opt.value === currentVal);
    const displayLabel = selectedOption
      ? selectedOption.label
      : currentVal
      ? currentVal
      : placeholder;
    const isPlaceholder = !selectedOption && !currentVal;

    // Sizing
    const sizeHeights: Record<SelectSize, string> = {
      sm: '32px',
      md: '40px',
      lg: '48px',
    };

    const containerClasses = [
      'eds-select-container',
      `eds-select-container--${size}`,
      isDisabled ? 'eds-select-container--disabled' : '',
      hasError ? 'eds-select-container--error' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const rootStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      width: '100%',
      position: 'relative',
      fontFamily: 'var(--typography-font-family-sans, "Inter", sans-serif)',
      ...style,
    };

    // Label element
    const labelElement = label
      ? React.createElement(
          'label',
          {
            key: 'label',
            htmlFor: id,
            className: 'eds-select__label',
            style: {
              fontSize: '13px',
              fontWeight: 600,
              color: isDisabled
                ? 'var(--sys-color-text-tertiary, #94A3B8)'
                : 'var(--sys-color-text-primary, #0F172A)',
              lineHeight: 1.4,
            },
          },
          label
        )
      : null;

    // Trigger button
    const triggerBorderColor = hasError
      ? 'var(--sys-color-status-danger-border, #EF4444)'
      : 'var(--sys-color-border-default, #CBD5E1)';

    const triggerBg = isDisabled
      ? 'var(--sys-color-surface-sunken, #F1F5F9)'
      : 'var(--sys-color-surface-card, #FFFFFF)';

    const triggerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      height: sizeHeights[size] || sizeHeights.md,
      padding: '0 14px',
      backgroundColor: triggerBg,
      border: `1.5px solid ${triggerBorderColor}`,
      borderColor: triggerBorderColor,
      borderRadius: 'var(--radius-lg, 8px)',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      boxShadow: 'var(--shadow-xs, 0 1px 2px rgba(0, 0, 0, 0.04))',
      outline: 'none',
      userSelect: 'none',
      boxSizing: 'border-box',
    };

    const valueSpan = React.createElement(
      'span',
      {
        key: 'value-span',
        className: 'eds-select__value',
        style: {
          fontSize: '14px',
          color: isPlaceholder
            ? 'var(--sys-color-text-tertiary, #94A3B8)'
            : 'var(--sys-color-text-primary, #0F172A)',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
      },
      displayLabel
    );

    const triggerElement = React.createElement(
      'button',
      {
        key: 'trigger',
        type: 'button',
        id,
        role: 'combobox',
        'aria-haspopup': 'listbox',
        'aria-expanded': isMenuOpen,
        'aria-invalid': hasError ? 'true' : undefined,
        'aria-disabled': isDisabled ? 'true' : undefined,
        disabled: isDisabled,
        className: 'eds-select__trigger',
        style: triggerStyle,
        onClick: handleToggle,
      },
      valueSpan,
      renderChevronIcon()
    );

    // Listbox popup
    let listboxElement: React.ReactNode = null;
    if (isMenuOpen && !isDisabled) {
      const optionElements = options.map((opt) => {
        const isOptSelected = currentVal === opt.value;
        const isOptDisabled = Boolean(opt.disabled);
        return React.createElement(
          'div',
          {
            key: opt.value,
            role: 'option',
            'aria-selected': isOptSelected ? 'true' : 'false',
            'aria-disabled': isOptDisabled ? 'true' : undefined,
            className: [
              'eds-select__option',
              isOptSelected ? 'eds-select__option--selected' : '',
              isOptDisabled ? 'eds-select__option--disabled' : '',
            ]
              .filter(Boolean)
              .join(' '),
            style: {
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 12px',
              fontSize: '14px',
              color: isOptDisabled
                ? 'var(--sys-color-text-tertiary, #94A3B8)'
                : isOptSelected
                ? 'var(--sys-color-brand-primary, #2563EB)'
                : 'var(--sys-color-text-primary, #0F172A)',
              backgroundColor: isOptSelected
                ? 'var(--sys-color-surface-sunken, #F1F5F9)'
                : 'transparent',
              cursor: isOptDisabled ? 'not-allowed' : 'pointer',
              userSelect: 'none',
            },
            onClick: () => !isOptDisabled && handleSelect(opt.value),
          },
          opt.icon,
          React.createElement(
            'div',
            { key: 'content', style: { display: 'flex', flexDirection: 'column', flex: 1 } },
            React.createElement('span', null, opt.label || opt.value),
            opt.description &&
              React.createElement(
                'span',
                {
                  style: {
                    fontSize: '12px',
                    color: 'var(--sys-color-text-secondary, #475569)',
                  },
                },
                opt.description
              )
          )
        );
      });

      listboxElement = React.createElement(
        'div',
        {
          key: 'listbox',
          role: 'listbox',
          className: 'eds-select__listbox',
          style: {
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            marginTop: '4px',
            backgroundColor: 'var(--sys-color-surface-elevated, #FFFFFF)',
            border: '1px solid var(--sys-color-border-subtle, #E2E8F0)',
            borderRadius: 'var(--radius-lg, 8px)',
            boxShadow: 'var(--shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1))',
            zIndex: 50,
            maxHeight: '240px',
            overflowY: 'auto',
            padding: '4px 0',
          },
        },
        optionElements.length > 0 ? optionElements : children
      );
    }

    // Helper text or Error
    let statusElement: React.ReactNode = null;
    if (hasError) {
      statusElement = React.createElement(
        'span',
        {
          key: 'error',
          className: 'eds-select__error',
          style: {
            fontSize: '12px',
            fontWeight: 500,
            color: 'var(--sys-color-status-danger-text, #991B1B)',
            lineHeight: 1.4,
          },
        },
        error
      );
    } else if (helperText) {
      statusElement = React.createElement(
        'span',
        {
          key: 'helper',
          className: 'eds-select__helper-text',
          style: {
            fontSize: '12px',
            color: 'var(--sys-color-text-secondary, #475569)',
            lineHeight: 1.4,
          },
        },
        helperText
      );
    }

    const items = [labelElement, triggerElement, listboxElement, statusElement].filter(Boolean);

    return React.createElement(
      'div',
      {
        ref,
        className: containerClasses,
        style: rootStyle,
        ...props,
      },
      ...items
    );
  }
);

SelectInternal.displayName = 'Select';

export const Select: SelectComponent = Object.assign(SelectInternal, {
  Option: SelectOptionItem,
});

// ============================================================================
// DROPDOWNMENU COMPONENT
// ============================================================================

export const DropdownMenuTrigger: React.FC<DropdownMenuTriggerProps> = ({
  children,
  className = '',
  style,
  ...props
}) => {
  return React.createElement(
    'button',
    {
      type: 'button',
      className: `eds-dropdown-menu__trigger ${className}`.trim(),
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '8px 14px',
        fontSize: '14px',
        fontWeight: 500,
        backgroundColor: 'var(--sys-color-surface-card, #FFFFFF)',
        border: '1px solid var(--sys-color-border-default, #CBD5E1)',
        borderRadius: 'var(--radius-lg, 8px)',
        cursor: 'pointer',
        userSelect: 'none',
        ...style,
      },
      ...props,
    },
    children
  );
};

export const DropdownMenuContent: React.FC<DropdownMenuContentProps> = ({
  align = 'left',
  children,
  className = '',
  style,
  ...props
}) => {
  const alignStyle = align === 'right' ? { right: '0px' } : { left: '0px' };

  return React.createElement(
    'div',
    {
      role: 'menu',
      className: `eds-dropdown-menu__content ${className}`.trim(),
      style: {
        position: 'absolute',
        top: '100%',
        ...alignStyle,
        marginTop: '4px',
        minWidth: '180px',
        backgroundColor: 'var(--sys-color-surface-elevated, #FFFFFF)',
        border: '1px solid var(--sys-color-border-subtle, #E2E8F0)',
        borderRadius: 'var(--radius-lg, 8px)',
        boxShadow: 'var(--shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1))',
        padding: '4px',
        zIndex: 50,
        ...style,
      },
      ...props,
    },
    children
  );
};

export const DropdownMenuItemComponent: React.FC<DropdownMenuItemProps> = ({
  danger = false,
  disabled = false,
  icon,
  children,
  className = '',
  style,
  ...props
}) => {
  const itemClasses = [
    'eds-dropdown-menu__item',
    danger ? 'eds-dropdown-menu__item--danger' : '',
    disabled ? 'eds-dropdown-menu__item--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const itemColor = danger
    ? 'var(--sys-color-status-danger-text, #991B1B)'
    : disabled
    ? 'var(--sys-color-text-tertiary, #94A3B8)'
    : 'var(--sys-color-text-primary, #0F172A)';

  return React.createElement(
    'div',
    {
      role: 'menuitem',
      className: itemClasses,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 12px',
        fontSize: '13px',
        fontWeight: 500,
        color: itemColor,
        borderRadius: 'var(--radius-md, 6px)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        userSelect: 'none',
        ...style,
      },
      ...props,
    },
    icon,
    children
  );
};

export const DropdownMenuDivider: React.FC<DropdownMenuDividerProps> = ({
  className = '',
  style,
  ...props
}) => {
  return React.createElement('div', {
    role: 'separator',
    className: `eds-dropdown-menu__divider ${className}`.trim(),
    style: {
      height: '1px',
      backgroundColor: 'var(--sys-color-border-subtle, #E2E8F0)',
      margin: '4px 0',
      ...style,
    },
    ...props,
  });
};

const DropdownMenuInternal = React.forwardRef<HTMLDivElement, DropdownMenuProps>(
  (
    {
      trigger = 'Menu',
      items = [],
      isOpen,
      onOpenChange,
      align = 'left',
      disabled = false,
      className = '',
      style,
      children,
      ...props
    },
    ref
  ) => {
    const [internalOpen, setInternalOpen] = React.useState(false);
    const isControlledOpen = isOpen !== undefined;
    const isMenuOpen = isControlledOpen ? Boolean(isOpen) : internalOpen;
    const isDisabled = Boolean(disabled);

    const handleToggle = () => {
      if (isDisabled) return;
      const next = !isMenuOpen;
      if (!isControlledOpen) setInternalOpen(next);
      onOpenChange?.(next);
    };

    const rootClasses = [
      'eds-dropdown-menu',
      `eds-dropdown-menu--${align}`,
      isDisabled ? 'eds-dropdown-menu--disabled' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const triggerEl = React.createElement(
      'button',
      {
        key: 'trigger',
        type: 'button',
        className: 'eds-dropdown-menu__trigger',
        'aria-haspopup': 'menu',
        'aria-expanded': isMenuOpen,
        disabled: isDisabled,
        onClick: handleToggle,
        style: {
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '8px 14px',
          fontSize: '14px',
          fontWeight: 500,
          backgroundColor: 'var(--sys-color-surface-card, #FFFFFF)',
          border: '1px solid var(--sys-color-border-default, #CBD5E1)',
          borderRadius: 'var(--radius-lg, 8px)',
          cursor: isDisabled ? 'not-allowed' : 'pointer',
          userSelect: 'none',
        },
      },
      typeof trigger === 'string' ? trigger : trigger
    );

    let contentEl: React.ReactNode = null;
    if (isMenuOpen && !isDisabled) {
      let renderedItems: React.ReactNode = children;

      if (items.length > 0) {
        renderedItems = items.map((item, idx) => {
          if (item.divider) {
            return React.createElement('div', {
              key: `div-${idx}`,
              role: 'separator',
              className: 'eds-dropdown-menu__divider',
              style: {
                height: '1px',
                backgroundColor: 'var(--sys-color-border-subtle, #E2E8F0)',
                margin: '4px 0',
              },
            });
          }

          const itemClasses = [
            'eds-dropdown-menu__item',
            item.danger ? 'eds-dropdown-menu__item--danger' : '',
            item.disabled ? 'eds-dropdown-menu__item--disabled' : '',
          ]
            .filter(Boolean)
            .join(' ');

          const itemColor = item.danger
            ? 'var(--sys-color-status-danger-text, #991B1B)'
            : item.disabled
            ? 'var(--sys-color-text-tertiary, #94A3B8)'
            : 'var(--sys-color-text-primary, #0F172A)';

          return React.createElement(
            'div',
            {
              key: item.id || `item-${idx}`,
              role: 'menuitem',
              className: itemClasses,
              style: {
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 12px',
                fontSize: '13px',
                fontWeight: 500,
                color: itemColor,
                borderRadius: 'var(--radius-md, 6px)',
                cursor: item.disabled ? 'not-allowed' : 'pointer',
                userSelect: 'none',
              },
              onClick: item.onClick,
            },
            item.icon,
            item.label
          );
        });
      }

      const alignStyle = align === 'right' ? { right: '0px' } : { left: '0px' };

      contentEl = React.createElement(
        'div',
        {
          key: 'content',
          role: 'menu',
          className: 'eds-dropdown-menu__content',
          style: {
            position: 'absolute',
            top: '100%',
            ...alignStyle,
            marginTop: '4px',
            minWidth: '180px',
            backgroundColor: 'var(--sys-color-surface-elevated, #FFFFFF)',
            border: '1px solid var(--sys-color-border-subtle, #E2E8F0)',
            borderRadius: 'var(--radius-lg, 8px)',
            boxShadow: 'var(--shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1))',
            padding: '4px',
            zIndex: 50,
          },
        },
        renderedItems
      );
    }

    return React.createElement(
      'div',
      {
        ref,
        className: rootClasses,
        style: {
          position: 'relative',
          display: 'inline-block',
          fontFamily: 'var(--typography-font-family-sans, "Inter", sans-serif)',
          ...style,
        },
        ...props,
      },
      triggerEl,
      contentEl
    );
  }
);

DropdownMenuInternal.displayName = 'DropdownMenu';

export const DropdownMenu: DropdownMenuComponent = Object.assign(DropdownMenuInternal, {
  Trigger: DropdownMenuTrigger,
  Content: DropdownMenuContent,
  Item: DropdownMenuItemComponent,
  Divider: DropdownMenuDivider,
});

export default DropdownMenu;
