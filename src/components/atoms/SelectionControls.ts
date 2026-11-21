import React from 'react';

export type SelectionControlSize = 'sm' | 'md' | 'lg';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  error?: React.ReactNode;
  indeterminate?: boolean;
  size?: SelectionControlSize;
}

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  error?: React.ReactNode;
  size?: SelectionControlSize;
}

export interface RadioOption {
  value: string;
  label: React.ReactNode;
  helperText?: React.ReactNode;
  disabled?: boolean;
}

export type RadioGroupOrientation = 'vertical' | 'horizontal';

export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  options?: RadioOption[];
  orientation?: RadioGroupOrientation;
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  error?: React.ReactNode;
  disabled?: boolean;
  size?: SelectionControlSize;
}

export interface RadioGroupComponent extends React.ForwardRefExoticComponent<RadioGroupProps & React.RefAttributes<HTMLDivElement>> {
  Item: typeof Radio;
}

const sizeConfig: Record<
  SelectionControlSize,
  {
    box: string;
    dot: string;
    iconWidth: string;
    iconHeight: string;
    labelFont: string;
    helperFont: string;
    marginTop: string;
  }
> = {
  sm: {
    box: '16px',
    dot: '6px',
    iconWidth: '10px',
    iconHeight: '10px',
    labelFont: '13px',
    helperFont: '11px',
    marginTop: '2px',
  },
  md: {
    box: '18px',
    dot: '8px',
    iconWidth: '12px',
    iconHeight: '12px',
    labelFont: '14px',
    helperFont: '12px',
    marginTop: '1px',
  },
  lg: {
    box: '22px',
    dot: '10px',
    iconWidth: '14px',
    iconHeight: '14px',
    labelFont: '16px',
    helperFont: '13px',
    marginTop: '1px',
  },
};

// ============================================================================
// CHECKBOX COMPONENT
// ============================================================================

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      checked = false,
      indeterminate = false,
      disabled = false,
      size = 'md',
      label,
      helperText,
      error,
      className = '',
      style,
      id,
      onChange,
      ...props
    },
    ref
  ) => {
    const isChecked = Boolean(checked);
    const isIndeterminate = Boolean(indeterminate);
    const isDisabled = Boolean(disabled);
    const hasError = Boolean(error);
    const config = sizeConfig[size] || sizeConfig.md;

    const classNames = [
      'eds-checkbox',
      `eds-checkbox--${size}`,
      isChecked ? 'eds-checkbox--checked' : '',
      isIndeterminate ? 'eds-checkbox--indeterminate' : '',
      isDisabled ? 'eds-checkbox--disabled' : '',
      hasError ? 'eds-checkbox--error' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const rootStyles: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'flex-start',
      gap: '8px',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      opacity: isDisabled ? 0.6 : 1,
      userSelect: 'none',
      position: 'relative',
      fontFamily: 'var(--typography-font-family-sans, "Inter", sans-serif)',
      ...style,
    };

    // Native hidden input for accessible keyboard & form handling
    const inputElement = React.createElement('input', {
      key: 'input',
      ref,
      type: 'checkbox',
      id,
      checked: isChecked,
      disabled: isDisabled,
      'aria-checked': isIndeterminate ? 'mixed' : isChecked ? 'true' : 'false',
      'aria-invalid': hasError ? 'true' : undefined,
      'aria-disabled': isDisabled ? 'true' : undefined,
      onChange,
      style: {
        position: 'absolute',
        opacity: 0,
        width: 0,
        height: 0,
        margin: 0,
        pointerEvents: 'none',
      },
      ...props,
    });

    // Custom visual control
    const controlBorderColor = hasError
      ? 'var(--sys-color-status-danger-border, #EF4444)'
      : isChecked || isIndeterminate
      ? 'var(--sys-color-brand-primary, #2563EB)'
      : 'var(--sys-color-border-default, #CBD5E1)';

    const controlBgColor = isChecked || isIndeterminate
      ? 'var(--sys-color-brand-primary, #2563EB)'
      : 'var(--sys-color-surface-card, #FFFFFF)';

    // Icon glyph
    let iconElement: React.ReactNode = null;
    if (isIndeterminate) {
      iconElement = React.createElement(
        'svg',
        {
          key: 'icon-minus',
          viewBox: '0 0 16 16',
          width: config.iconWidth,
          height: config.iconHeight,
          fill: 'none',
          stroke: '#FFFFFF',
          strokeWidth: 2.5,
          strokeLinecap: 'round',
          style: { display: 'block' },
        },
        React.createElement('line', { x1: 3, y1: 8, x2: 13, y2: 8 })
      );
    } else if (isChecked) {
      iconElement = React.createElement(
        'svg',
        {
          key: 'icon-check',
          viewBox: '0 0 16 16',
          width: config.iconWidth,
          height: config.iconHeight,
          fill: 'none',
          stroke: '#FFFFFF',
          strokeWidth: 2.2,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          style: { display: 'block' },
        },
        React.createElement('polyline', { points: '3.5 8.5 6.5 11.5 12.5 4.5' })
      );
    }

    const controlElement = React.createElement(
      'span',
      {
        key: 'control',
        className: 'eds-checkbox__control',
        style: {
          width: config.box,
          height: config.box,
          minWidth: config.box,
          minHeight: config.box,
          borderRadius: 'var(--radius-sm, 4px)',
          border: `1.5px solid ${controlBorderColor}`,
          borderColor: controlBorderColor,
          backgroundColor: controlBgColor,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          marginTop: config.marginTop,
          transition: 'all 0.15s ease-in-out',
          boxShadow: 'var(--shadow-xs, 0 1px 2px rgba(0, 0, 0, 0.05))',
          boxSizing: 'border-box',
        },
      },
      iconElement
    );

    // Label & text container
    let labelContainer: React.ReactNode = null;
    if (label || helperText || error) {
      const labelEl = label
        ? React.createElement(
            'span',
            {
              key: 'label',
              className: 'eds-checkbox__label',
              style: {
                fontSize: config.labelFont,
                fontWeight: 500,
                color: isDisabled
                  ? 'var(--sys-color-text-tertiary, #94A3B8)'
                  : 'var(--sys-color-text-primary, #0F172A)',
                lineHeight: 1.4,
              },
            },
            label
          )
        : null;

      const helperEl = helperText
        ? React.createElement(
            'span',
            {
              key: 'helper',
              className: 'eds-checkbox__helper-text',
              style: {
                fontSize: config.helperFont,
                color: 'var(--sys-color-text-secondary, #475569)',
                lineHeight: 1.4,
              },
            },
            helperText
          )
        : null;

      const errorEl = error
        ? React.createElement(
            'span',
            {
              key: 'error',
              className: 'eds-checkbox__error',
              style: {
                fontSize: config.helperFont,
                fontWeight: 500,
                color: 'var(--sys-color-status-danger-text, #991B1B)',
                lineHeight: 1.4,
              },
            },
            error
          )
        : null;

      labelContainer = React.createElement(
        'div',
        {
          key: 'labels',
          className: 'eds-checkbox__label-container',
          style: {
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
          },
        },
        labelEl,
        helperEl,
        errorEl
      );
    }

    return React.createElement(
      'label',
      {
        className: classNames,
        style: rootStyles,
      },
      inputElement,
      controlElement,
      labelContainer
    );
  }
);

Checkbox.displayName = 'Checkbox';

// ============================================================================
// RADIO COMPONENT
// ============================================================================

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      checked = false,
      disabled = false,
      size = 'md',
      value,
      name,
      label,
      helperText,
      error,
      className = '',
      style,
      id,
      onChange,
      ...props
    },
    ref
  ) => {
    const isChecked = Boolean(checked);
    const isDisabled = Boolean(disabled);
    const hasError = Boolean(error);
    const config = sizeConfig[size] || sizeConfig.md;

    const classNames = [
      'eds-radio',
      `eds-radio--${size}`,
      isChecked ? 'eds-radio--checked' : '',
      isDisabled ? 'eds-radio--disabled' : '',
      hasError ? 'eds-radio--error' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const rootStyles: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'flex-start',
      gap: '8px',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      opacity: isDisabled ? 0.6 : 1,
      userSelect: 'none',
      position: 'relative',
      fontFamily: 'var(--typography-font-family-sans, "Inter", sans-serif)',
      ...style,
    };

    const inputElement = React.createElement('input', {
      key: 'input',
      ref,
      type: 'radio',
      id,
      name,
      value,
      checked: isChecked,
      disabled: isDisabled,
      'aria-checked': isChecked ? 'true' : 'false',
      'aria-invalid': hasError ? 'true' : undefined,
      'aria-disabled': isDisabled ? 'true' : undefined,
      onChange,
      style: {
        position: 'absolute',
        opacity: 0,
        width: 0,
        height: 0,
        margin: 0,
        pointerEvents: 'none',
      },
      ...props,
    });

    const controlBorderColor = hasError
      ? 'var(--sys-color-status-danger-border, #EF4444)'
      : isChecked
      ? 'var(--sys-color-brand-primary, #2563EB)'
      : 'var(--sys-color-border-default, #CBD5E1)';

    const innerDot = isChecked
      ? React.createElement('span', {
          key: 'dot',
          className: 'eds-radio__dot',
          style: {
            width: config.dot,
            height: config.dot,
            borderRadius: '9999px',
            backgroundColor: isDisabled
              ? 'var(--sys-color-text-tertiary, #94A3B8)'
              : 'var(--sys-color-brand-primary, #2563EB)',
            transition: 'transform 0.15s ease-in-out',
          },
        })
      : null;

    const controlElement = React.createElement(
      'span',
      {
        key: 'control',
        className: 'eds-radio__control',
        style: {
          width: config.box,
          height: config.box,
          minWidth: config.box,
          minHeight: config.box,
          borderRadius: '9999px',
          border: `1.5px solid ${controlBorderColor}`,
          borderColor: controlBorderColor,
          backgroundColor: 'var(--sys-color-surface-card, #FFFFFF)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          marginTop: config.marginTop,
          transition: 'all 0.15s ease-in-out',
          boxShadow: 'var(--shadow-xs, 0 1px 2px rgba(0, 0, 0, 0.05))',
          boxSizing: 'border-box',
        },
      },
      innerDot
    );

    let labelContainer: React.ReactNode = null;
    if (label || helperText || error) {
      const labelEl = label
        ? React.createElement(
            'span',
            {
              key: 'label',
              className: 'eds-radio__label',
              style: {
                fontSize: config.labelFont,
                fontWeight: 500,
                color: isDisabled
                  ? 'var(--sys-color-text-tertiary, #94A3B8)'
                  : 'var(--sys-color-text-primary, #0F172A)',
                lineHeight: 1.4,
              },
            },
            label
          )
        : null;

      const helperEl = helperText
        ? React.createElement(
            'span',
            {
              key: 'helper',
              className: 'eds-radio__helper-text',
              style: {
                fontSize: config.helperFont,
                color: 'var(--sys-color-text-secondary, #475569)',
                lineHeight: 1.4,
              },
            },
            helperText
          )
        : null;

      const errorEl = error
        ? React.createElement(
            'span',
            {
              key: 'error',
              className: 'eds-radio__error',
              style: {
                fontSize: config.helperFont,
                fontWeight: 500,
                color: 'var(--sys-color-status-danger-text, #991B1B)',
                lineHeight: 1.4,
              },
            },
            error
          )
        : null;

      labelContainer = React.createElement(
        'div',
        {
          key: 'labels',
          className: 'eds-radio__label-container',
          style: {
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
          },
        },
        labelEl,
        helperEl,
        errorEl
      );
    }

    return React.createElement(
      'label',
      {
        className: classNames,
        style: rootStyles,
      },
      inputElement,
      controlElement,
      labelContainer
    );
  }
);

Radio.displayName = 'Radio';

export const RadioButton = Radio;

// ============================================================================
// RADIOGROUP COMPONENT
// ============================================================================

const RadioGroupInternal = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      name,
      value,
      defaultValue,
      onChange,
      options,
      orientation = 'vertical',
      label,
      helperText,
      error,
      disabled = false,
      size = 'md',
      className = '',
      style,
      children,
      role = 'radiogroup',
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState<string | undefined>(
      defaultValue
    );
    const currentValue = value !== undefined ? value : internalValue;
    const hasError = Boolean(error);

    const handleOptionChange = (optValue: string) => {
      if (value === undefined) {
        setInternalValue(optValue);
      }
      onChange?.(optValue);
    };

    const classNames = [
      'eds-radio-group',
      `eds-radio-group--${orientation}`,
      hasError ? 'eds-radio-group--error' : '',
      disabled ? 'eds-radio-group--disabled' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const rootStyles: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      fontFamily: 'var(--typography-font-family-sans, "Inter", sans-serif)',
      ...style,
    };

    // Group Header Label
    const labelElement = label
      ? React.createElement(
          'span',
          {
            key: 'group-label',
            className: 'eds-radio-group__label',
            style: {
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--sys-color-text-primary, #0F172A)',
              lineHeight: 1.4,
            },
          },
          label
        )
      : null;

    // Error element
    const errorElement = error
      ? React.createElement(
          'span',
          {
            key: 'group-error',
            className: 'eds-radio-group__error',
            style: {
              fontSize: '12px',
              fontWeight: 500,
              color: 'var(--sys-color-status-danger-text, #991B1B)',
              lineHeight: 1.4,
            },
          },
          error
        )
      : null;

    // Helper element
    const helperElement = helperText && !error
      ? React.createElement(
          'span',
          {
            key: 'group-helper',
            className: 'eds-radio-group__helper-text',
            style: {
              fontSize: '12px',
              color: 'var(--sys-color-text-secondary, #475569)',
              lineHeight: 1.4,
            },
          },
          helperText
        )
      : null;

    // Options rendering
    let content: React.ReactNode;

    if (options && options.length > 0) {
      const renderedOptions = options.map((opt) => {
        const isOptChecked = currentValue !== undefined && currentValue === opt.value;
        const isOptDisabled = disabled || Boolean(opt.disabled);

        return React.createElement(Radio, {
          key: opt.value,
          name,
          value: opt.value,
          label: opt.label,
          helperText: opt.helperText,
          disabled: isOptDisabled,
          size,
          checked: isOptChecked,
          onChange: () => handleOptionChange(opt.value),
        });
      });

      const optionsContainer = React.createElement(
        'div',
        {
          key: 'options-container',
          className: 'eds-radio-group__options',
          style: {
            display: 'flex',
            flexDirection: orientation === 'horizontal' ? 'row' : 'column',
            gap: orientation === 'horizontal' ? '16px' : '10px',
            flexWrap: orientation === 'horizontal' ? 'wrap' : 'nowrap',
          },
        },
        renderedOptions
      );

      const items = [labelElement, optionsContainer, helperElement, errorElement].filter(Boolean);
      content = items.length === 1 ? items[0] : items;
    } else if (children) {
      if (!labelElement && !helperElement && !errorElement) {
        content = children;
      } else {
        const items = [labelElement, children, helperElement, errorElement].filter(Boolean);
        content = items.length === 1 ? items[0] : items;
      }
    }

    return React.createElement(
      'div',
      {
        ref,
        role,
        'aria-label': typeof label === 'string' ? label : undefined,
        'aria-invalid': hasError ? 'true' : undefined,
        className: classNames,
        style: rootStyles,
        ...props,
      },
      content
    );
  }
);

RadioGroupInternal.displayName = 'RadioGroup';

export const RadioGroup: RadioGroupComponent = Object.assign(RadioGroupInternal, {
  Item: Radio,
});

// Combined bundle export
export const SelectionControls = {
  Checkbox,
  Radio,
  RadioButton,
  RadioGroup,
};

export default SelectionControls;
