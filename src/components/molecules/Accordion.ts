import React from 'react';

export type AccordionVariant = 'outlined' | 'filled' | 'borderless';

export interface AccordionItemData {
  id: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
  variant?: AccordionVariant;
  expanded?: boolean;
  defaultExpanded?: boolean;
  onToggle?: (expanded: boolean) => void;
  disabled?: boolean;
  items?: AccordionItemData[];
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

export interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export interface AccordionComponent extends React.ForwardRefExoticComponent<AccordionProps & React.RefAttributes<HTMLDivElement>> {
  Item: React.FC<AccordionItemProps>;
  Trigger: React.FC<AccordionTriggerProps>;
  Content: React.FC<AccordionContentProps>;
}

// Chevron Down Icon
const renderChevronDown = (isExpanded: boolean) =>
  React.createElement(
    'svg',
    {
      key: 'chevron',
      viewBox: '0 0 20 20',
      width: '18',
      height: '18',
      fill: 'none',
      stroke: 'var(--sys-color-text-tertiary, #94A3B8)',
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      style: {
        transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        flexShrink: 0,
      },
    },
    React.createElement('polyline', { points: '6 8 10 12 14 8' })
  );

// ============================================================================
// COMPOUND SUB-COMPONENTS
// ============================================================================

export const AccordionItem: React.FC<AccordionItemProps> = ({
  children,
  className = '',
  style,
  ...props
}) => {
  return React.createElement(
    'div',
    {
      className: `eds-accordion-item ${className}`.trim(),
      style: {
        borderBottom: '1px solid var(--sys-color-border-subtle, #E2E8F0)',
        ...style,
      },
      ...props,
    },
    children
  );
};

AccordionItem.displayName = 'Accordion.Item';

export const AccordionTrigger: React.FC<AccordionTriggerProps> = ({
  children,
  className = '',
  style,
  ...props
}) => {
  return React.createElement(
    'button',
    {
      type: 'button',
      className: `eds-accordion__trigger ${className}`.trim(),
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        padding: '14px 18px',
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        outline: 'none',
        fontFamily: 'var(--typography-font-family-sans, "Inter", sans-serif)',
        ...style,
      },
      ...props,
    },
    children
  );
};

AccordionTrigger.displayName = 'Accordion.Trigger';

export const AccordionContent: React.FC<AccordionContentProps> = ({
  children,
  className = '',
  style,
  ...props
}) => {
  return React.createElement(
    'div',
    {
      role: 'region',
      className: `eds-accordion__content ${className}`.trim(),
      style: {
        padding: '0 18px 16px',
        fontSize: '14px',
        color: 'var(--sys-color-text-secondary, #475569)',
        lineHeight: 1.5,
        fontFamily: 'var(--typography-font-family-sans, "Inter", sans-serif)',
        ...style,
      },
      ...props,
    },
    children
  );
};

AccordionContent.displayName = 'Accordion.Content';

// ============================================================================
// ACCORDION ROOT COMPONENT
// ============================================================================

const AccordionInternal = React.forwardRef<HTMLDivElement, AccordionProps>(
  (props, ref) => {
    const {
      title,
      subtitle,
      action,
      variant = 'outlined',
      expanded,
      defaultExpanded = false,
      onToggle,
      disabled = false,
      items,
      children,
      className = '',
      style,
      ...restProps
    } = props || {};

    const [internalExpanded, setInternalExpanded] = React.useState<boolean>(defaultExpanded);

    const isControlled = expanded !== undefined;
    const isExpanded = isControlled ? Boolean(expanded) : internalExpanded;
    const isDisabled = Boolean(disabled);

    const handleToggle = () => {
      if (isDisabled) return;
      const next = !isExpanded;
      if (!isControlled) {
        setInternalExpanded(next);
      }
      onToggle?.(next);
    };

    // Case 1: Items Array Group Mode
    if (items && items.length > 0) {
      const groupClasses = [
        'eds-accordion-group',
        `eds-accordion-group--${variant}`,
        className,
      ]
        .filter(Boolean)
        .join(' ');

      const renderedItems = items.map((item) => {
        return React.createElement(AccordionInternal, {
          key: item.id,
          title: item.title,
          subtitle: item.subtitle,
          action: item.action,
          disabled: item.disabled,
          variant,
          children: item.content,
        });
      });

      return React.createElement(
        'div',
        {
          ref,
          className: groupClasses,
          style: {
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            width: '100%',
            ...style,
          },
          ...restProps,
        },
        ...renderedItems
      );
    }

    // Case 2: Standalone Accordion Item
    const rootClasses = [
      'eds-accordion',
      `eds-accordion--${variant}`,
      isExpanded ? 'eds-accordion--expanded' : '',
      isDisabled ? 'eds-accordion--disabled' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const variantStyles: Record<AccordionVariant, React.CSSProperties> = {
      outlined: {
        backgroundColor: 'var(--sys-color-surface-card, #FFFFFF)',
        border: '1px solid var(--sys-color-border-subtle, #E2E8F0)',
        borderRadius: 'var(--radius-lg, 8px)',
      },
      filled: {
        backgroundColor: 'var(--sys-color-surface-sunken, #F1F5F9)',
        border: '1px solid transparent',
        borderRadius: 'var(--radius-lg, 8px)',
      },
      borderless: {
        backgroundColor: 'transparent',
        border: 'none',
        borderRadius: '0px',
      },
    };

    const rootStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      fontFamily: 'var(--typography-font-family-sans, "Inter", sans-serif)',
      boxSizing: 'border-box',
      overflow: 'hidden',
      transition: 'border-color 0.15s ease, background-color 0.15s ease',
      cursor: isDisabled ? 'not-allowed' : 'default',
      opacity: isDisabled ? 0.6 : 1,
      ...variantStyles[variant],
      ...style,
    };

    // Header Trigger
    const titleEl = title
      ? React.createElement(
          'span',
          {
            key: 'title',
            className: 'eds-accordion__title',
            style: {
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--sys-color-text-primary, #0F172A)',
              lineHeight: 1.4,
            },
          },
          title
        )
      : null;

    const subtitleEl = subtitle
      ? React.createElement(
          'span',
          {
            key: 'subtitle',
            className: 'eds-accordion__subtitle',
            style: {
              fontSize: '12px',
              color: 'var(--sys-color-text-secondary, #475569)',
              lineHeight: 1.4,
              marginLeft: '12px',
            },
          },
          subtitle
        )
      : null;

    const actionEl = action
      ? React.createElement(
          'span',
          {
            key: 'action',
            className: 'eds-accordion__action',
            style: {
              fontSize: '13px',
              fontWeight: 500,
              color: 'var(--sys-color-brand-primary, #2563EB)',
              marginLeft: 'auto',
              marginRight: '12px',
            },
          },
          action
        )
      : null;

    const triggerElement = React.createElement(
      'button',
      {
        key: 'trigger',
        type: 'button',
        className: 'eds-accordion__trigger',
        'aria-expanded': isExpanded,
        'aria-disabled': isDisabled ? 'true' : undefined,
        disabled: isDisabled,
        onClick: handleToggle,
        style: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          width: '100%',
          padding: '14px 18px',
          backgroundColor: 'transparent',
          border: 'none',
          cursor: isDisabled ? 'not-allowed' : 'pointer',
          outline: 'none',
          fontFamily: 'var(--typography-font-family-sans, "Inter", sans-serif)',
          boxSizing: 'border-box',
        },
      },
      ...[titleEl, subtitleEl, actionEl, renderChevronDown(isExpanded)].filter(Boolean)
    );

    // Content Panel
    let contentElement: React.ReactNode = null;
    if (isExpanded) {
      contentElement = React.createElement(
        'div',
        {
          key: 'content',
          role: 'region',
          className: 'eds-accordion__content',
          style: {
            padding: '0 18px 16px',
            fontSize: '14px',
            color: 'var(--sys-color-text-secondary, #475569)',
            lineHeight: 1.5,
            borderTop:
              variant === 'outlined'
                ? '1px solid var(--sys-color-border-subtle, #E2E8F0)'
                : 'none',
            paddingTop: variant === 'outlined' ? '14px' : '0',
            boxSizing: 'border-box',
          },
        },
        children
      );
    }

    const itemsContent = [triggerElement, contentElement].filter(Boolean);

    return React.createElement(
      'div',
      {
        ref,
        className: rootClasses,
        style: rootStyle,
        ...restProps,
      },
      ...itemsContent
    );
  }
);

AccordionInternal.displayName = 'Accordion';

export const Accordion: AccordionComponent = Object.assign(AccordionInternal, {
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
});

export default Accordion;
