import React from 'react';
import { cva, type VariantProps } from '../../core/cva.ts';

export type CardVariant = 'elevated' | 'outlined' | 'outline' | 'filled';

export const cardVariants = cva('eds-card', {
  variants: {
    variant: {
      elevated: 'eds-card--elevated',
      outlined: 'eds-card--outlined',
      outline: 'eds-card--outlined',
      filled: 'eds-card--filled',
    },
    interactive: {
      true: 'eds-card--interactive',
    },
    selected: {
      true: 'eds-card--selected',
    },
  },
  defaultVariants: {
    variant: 'elevated',
  },
});

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  selectable?: boolean;
  selected?: boolean;
  interactive?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  subtitle,
  action,
  children,
  className = '',
  style,
  ...props
}) => {
  const baseStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
    padding: '16px 20px',
    borderBottom: '1px solid var(--sys-color-border-subtle, #E2E8F0)',
    fontFamily: 'var(--typography-font-family-sans, "Inter", sans-serif)',
  };

  let content = children;
  if (!content && (title || subtitle || action)) {
    const titleEl = title
      ? React.createElement(
          'h3',
          {
            key: 'title',
            style: {
              margin: 0,
              fontSize: '15px',
              fontWeight: 600,
              color: 'var(--sys-color-text-primary, #0F172A)',
              lineHeight: 1.4,
            },
            className: 'eds-card__title',
          },
          title
        )
      : null;

    const subtitleEl = subtitle
      ? React.createElement(
          'p',
          {
            key: 'subtitle',
            style: {
              margin: '2px 0 0',
              fontSize: '12px',
              color: 'var(--sys-color-text-secondary, #475569)',
              lineHeight: 1.4,
            },
            className: 'eds-card__subtitle',
          },
          subtitle
        )
      : null;

    const infoContainer = React.createElement(
      'div',
      {
        key: 'info',
        style: { flex: 1, minWidth: 0 },
        className: 'eds-card__header-info',
      },
      titleEl,
      subtitleEl
    );

    const actionContainer = action
      ? React.createElement(
          'div',
          {
            key: 'action',
            className: 'eds-card__header-action',
          },
          action
        )
      : null;

    content = [infoContainer, actionContainer];
  }

  return React.createElement(
    'div',
    {
      style: { ...baseStyles, ...style },
      className: `eds-card__header eds-card-header ${className}`.trim(),
      ...props,
    },
    content
  );
};

export const CardBody: React.FC<CardBodyProps> = ({
  children,
  className = '',
  style,
  ...props
}) => {
  const baseStyles: React.CSSProperties = {
    padding: '20px',
    flex: 1,
    fontFamily: 'var(--typography-font-family-sans, "Inter", sans-serif)',
    color: 'var(--sys-color-text-primary, #0F172A)',
    lineHeight: 1.5,
  };

  return React.createElement(
    'div',
    {
      style: { ...baseStyles, ...style },
      className: `eds-card__body eds-card-body ${className}`.trim(),
      ...props,
    },
    children
  );
};

export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className = '',
  style,
  ...props
}) => {
  const baseStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '12px',
    padding: '14px 20px',
    borderTop: '1px solid var(--sys-color-border-subtle, #E2E8F0)',
    fontFamily: 'var(--typography-font-family-sans, "Inter", sans-serif)',
  };

  return React.createElement(
    'div',
    {
      style: { ...baseStyles, ...style },
      className: `eds-card__footer eds-card-footer ${className}`.trim(),
      ...props,
    },
    children
  );
};

export interface CardComponent extends React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLDivElement>> {
  Header: typeof CardHeader;
  Body: typeof CardBody;
  Footer: typeof CardFooter;
}

const CardInternal = React.forwardRef<HTMLDivElement, CardProps>((
  {
    variant = 'elevated',
    selectable = false,
    selected = false,
    interactive = false,
    onClick,
    onKeyDown,
    children,
    className = '',
    style,
    role,
    tabIndex,
    ...props
  },
  ref
) => {
  const isInteractive = interactive || selectable || Boolean(onClick);
  const normalizedVariant = variant === 'outline' ? 'outlined' : variant;

  const baseStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    borderRadius: 'var(--radius-xl, 12px)',
    overflow: 'hidden',
    transition: 'all 0.15s ease-in-out',
    fontFamily: 'var(--typography-font-family-sans, "Inter", sans-serif)',
    boxSizing: 'border-box',
    cursor: isInteractive ? 'pointer' : 'default',
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    elevated: {
      backgroundColor: 'var(--sys-color-surface-card, #FFFFFF)',
      border: '1px solid var(--sys-color-border-subtle, #E2E8F0)',
      boxShadow: 'var(--shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.05))',
    },
    outlined: {
      backgroundColor: 'var(--sys-color-surface-card, #FFFFFF)',
      border: '1px solid var(--sys-color-border-default, #CBD5E1)',
      boxShadow: 'var(--shadow-none, none)',
    },
    filled: {
      backgroundColor: 'var(--sys-color-surface-sunken, #F1F5F9)',
      border: '1px solid transparent',
      boxShadow: 'var(--shadow-none, none)',
    },
  };

  const interactiveStyles: React.CSSProperties = isInteractive
    ? {
        userSelect: 'none',
        ...(selected
          ? {
              borderColor: 'var(--sys-color-brand-primary, var(--sys-color-primary))',
              boxShadow: '0 0 0 2px var(--sys-color-brand-primary, var(--sys-color-primary))',
            }
          : {}),
      }
    : {};

  const computedRole = role || (selectable ? 'checkbox' : onClick ? 'button' : 'region');
  const computedTabIndex = tabIndex ?? (isInteractive ? 0 : undefined);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (isInteractive && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick?.(e as any);
    }
    onKeyDown?.(e);
  };

  const classNames = cardVariants({
    variant: normalizedVariant,
    interactive: isInteractive,
    selected: Boolean(selected),
    className,
  });

  return React.createElement(
    'div',
    {
      ref,
      style: {
        ...baseStyles,
        ...(variantStyles[normalizedVariant] || variantStyles.elevated),
        ...interactiveStyles,
        ...style,
      },
      className: classNames,
      role: computedRole,
      tabIndex: computedTabIndex,
      'aria-selected': selectable ? selected : undefined,
      onClick,
      onKeyDown: handleKeyDown,
      ...props,
    },
    children
  );
});

export const Card: CardComponent = Object.assign(CardInternal, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
});

export default Card;
