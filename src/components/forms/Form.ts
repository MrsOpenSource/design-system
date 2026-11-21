import React, { createContext, useContext, useRef, useState, useEffect, useCallback } from 'react';

export type FormLayout = 'vertical' | 'horizontal' | 'inline';

export interface FormRule {
  required?: boolean;
  message?: string;
  min?: number;
  max?: number;
  pattern?: RegExp;
  validator?: (
    rule: FormRule,
    value: any
  ) => Promise<boolean | string | void> | boolean | string | void;
}

export interface ValidateResult {
  valid: boolean;
  values: Record<string, any>;
  errors: Record<string, string[]>;
}

export interface FormInstance {
  getFieldValue: (name: string) => any;
  getFieldsValue: () => Record<string, any>;
  setFieldValue: (name: string, value: any) => void;
  setFieldsValue: (values: Record<string, any>) => void;
  getFieldError: (name: string) => string[];
  getFieldsError: () => Record<string, string[]>;
  registerField: (name: string, rules: FormRule[]) => () => void;
  validateFields: (names?: string[]) => Promise<ValidateResult>;
  resetFields: () => void;
  submit: (options?: {
    onFinish?: (values: Record<string, any>) => void;
    onFinishFailed?: (errorInfo: { values: Record<string, any>; errors: Record<string, string[]> }) => void;
  }) => Promise<void>;
  subscribe: (listener: () => void) => () => void;
}

export interface FormProps extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  form?: FormInstance;
  initialValues?: Record<string, any>;
  onFinish?: (values: Record<string, any>) => void;
  onFinishFailed?: (errorInfo: { values: Record<string, any>; errors: Record<string, string[]> }) => void;
  layout?: FormLayout;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export interface FormItemProps {
  name?: string;
  label?: React.ReactNode;
  required?: boolean;
  rules?: FormRule[];
  help?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode | ((form: FormInstance) => React.ReactNode);
}

// -----------------------------------------------------------------------------
// Form Store Engine
// -----------------------------------------------------------------------------
export function createFormStore(initialValues: Record<string, any> = {}): FormInstance {
  let values: Record<string, any> = { ...initialValues };
  let errors: Record<string, string[]> = {};
  const fieldRules = new Map<string, FormRule[]>();
  const listeners = new Set<() => void>();

  function notify() {
    listeners.forEach((listener) => {
      try {
        listener();
      } catch (err) {
        console.error('Error in Form store listener:', err);
      }
    });
  }

  function getFieldValue(name: string) {
    return values[name];
  }

  function getFieldsValue() {
    return { ...values };
  }

  function setFieldValue(name: string, value: any) {
    values = { ...values, [name]: value };
    notify();
  }

  function setFieldsValue(newValues: Record<string, any>) {
    values = { ...values, ...newValues };
    notify();
  }

  function getFieldError(name: string): string[] {
    return errors[name] || [];
  }

  function getFieldsError(): Record<string, string[]> {
    return { ...errors };
  }

  function registerField(name: string, rules: FormRule[]) {
    fieldRules.set(name, rules);
    return () => {
      fieldRules.delete(name);
    };
  }

  async function validateFields(names?: string[]): Promise<ValidateResult> {
    const targetNames = names || Array.from(fieldRules.keys());
    const newErrors: Record<string, string[]> = { ...errors };
    let isValid = true;

    for (const name of targetNames) {
      const rules = fieldRules.get(name) || [];
      const val = values[name];
      const fieldErrorList: string[] = [];

      for (const rule of rules) {
        // 1. Required check
        if (rule.required) {
          const isEmpty =
            val === undefined ||
            val === null ||
            val === '' ||
            (Array.isArray(val) && val.length === 0);
          if (isEmpty) {
            fieldErrorList.push(rule.message || `${name} is required`);
            break; // Stop after first failing rule for this field
          }
        }

        // 2. Min check
        if (rule.min !== undefined && val !== undefined && val !== null && val !== '') {
          if (typeof val === 'string' && val.length < rule.min) {
            fieldErrorList.push(rule.message || `Minimum length is ${rule.min}`);
            break;
          }
          if (typeof val === 'number' && val < rule.min) {
            fieldErrorList.push(rule.message || `Minimum value is ${rule.min}`);
            break;
          }
        }

        // 3. Max check
        if (rule.max !== undefined && val !== undefined && val !== null && val !== '') {
          if (typeof val === 'string' && val.length > rule.max) {
            fieldErrorList.push(rule.message || `Maximum length is ${rule.max}`);
            break;
          }
          if (typeof val === 'number' && val > rule.max) {
            fieldErrorList.push(rule.message || `Maximum value is ${rule.max}`);
            break;
          }
        }

        // 4. Pattern check
        if (rule.pattern && val !== undefined && val !== null && val !== '') {
          if (typeof val === 'string' && !rule.pattern.test(val)) {
            fieldErrorList.push(rule.message || `Pattern mismatch`);
            break;
          }
        }

        // 5. Custom Validator check
        if (rule.validator) {
          try {
            const result = await rule.validator(rule, val);
            if (typeof result === 'string') {
              fieldErrorList.push(result);
              break;
            } else if (result === false) {
              fieldErrorList.push(rule.message || 'Validation failed');
              break;
            }
          } catch (err: any) {
            fieldErrorList.push(err?.message || 'Validation error');
            break;
          }
        }
      }

      if (fieldErrorList.length > 0) {
        newErrors[name] = fieldErrorList;
        isValid = false;
      } else {
        newErrors[name] = [];
      }
    }

    errors = newErrors;
    notify();

    return {
      valid: isValid,
      values: { ...values },
      errors: { ...errors },
    };
  }

  function resetFields() {
    values = { ...initialValues };
    errors = {};
    notify();
  }

  async function submit(options?: {
    onFinish?: (values: Record<string, any>) => void;
    onFinishFailed?: (errorInfo: { values: Record<string, any>; errors: Record<string, string[]> }) => void;
  }) {
    const result = await validateFields();
    if (result.valid) {
      if (options?.onFinish) {
        options.onFinish(result.values);
      }
    } else {
      if (options?.onFinishFailed) {
        options.onFinishFailed({ values: result.values, errors: result.errors });
      }
    }
  }

  function subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }

  return {
    getFieldValue,
    getFieldsValue,
    setFieldValue,
    setFieldsValue,
    getFieldError,
    getFieldsError,
    registerField,
    validateFields,
    resetFields,
    submit,
    subscribe,
  };
}

export function useForm(initialValues: Record<string, any> = {}): [FormInstance] {
  const formRef = useRef<FormInstance | null>(null);
  if (!formRef.current) {
    formRef.current = createFormStore(initialValues);
  }
  return [formRef.current];
}

// -----------------------------------------------------------------------------
// Form Context
// -----------------------------------------------------------------------------
interface FormContextType {
  form: FormInstance;
  layout: FormLayout;
}

export const FormContext = createContext<FormContextType | null>(null);
export const useFormContext = () => useContext(FormContext);

// -----------------------------------------------------------------------------
// FormItem Component
// -----------------------------------------------------------------------------
export const FormItem: React.FC<FormItemProps> = (props) => {
  const { name, label, required, rules = [], help, className = '', style, children } =
    props || {};
  const context = useFormContext();
  const form = context?.form;
  const layout = context?.layout || 'vertical';

  const [, forceUpdate] = useState({});

  useEffect(() => {
    if (!form || !name) return;
    const allRules = [...rules];
    if (required && !allRules.some((r) => r.required)) {
      allRules.unshift({ required: true, message: `${label || name} is required` });
    }
    const unregister = form.registerField(name, allRules);
    const unsubscribe = form.subscribe(() => {
      forceUpdate({});
    });
    return () => {
      unregister();
      unsubscribe();
    };
  }, [form, name, rules, required, label]);

  const errors = form && name ? form.getFieldError(name) : [];
  const hasError = errors.length > 0;
  const isRequired = required || rules.some((r) => r.required);

  const labelElement = label
    ? React.createElement(
        'label',
        {
          className: `eds-form-item__label ${
            isRequired ? 'eds-form-item__label--required' : ''
          }`.trim(),
          style: {
            display: 'block',
            fontSize: 'var(--typography-font-size-sm, 14px)',
            fontWeight: 500,
            color: 'var(--sys-color-text-primary, #0F172A)',
            marginBottom: layout === 'vertical' ? '6px' : '0',
          },
        },
        label,
        isRequired
          ? React.createElement(
              'span',
              {
                className: 'eds-form-item__required-mark',
                style: { color: 'var(--sys-color-status-danger-icon, #EF4444)', marginLeft: '4px' },
              },
              '*'
            )
          : null
      )
    : null;

  // Clone child with value, onChange, and error bindings if single React element
  let controlElement = children;
  if (typeof children === 'function' && form) {
    controlElement = children(form);
  } else if (React.isValidElement(children) && form && name) {
    const currentValue = form.getFieldValue(name);
    const childProps = children.props as any;
    controlElement = React.cloneElement(children as React.ReactElement<any>, {
      value: currentValue !== undefined ? currentValue : childProps.value || '',
      error: hasError || childProps.error,
      'aria-invalid': hasError ? true : childProps['aria-invalid'],
      onChange: (e: any) => {
        const val = e && e.target ? (e.target.type === 'checkbox' ? e.target.checked : e.target.value) : e;
        form.setFieldValue(name, val);
        if (childProps.onChange) {
          childProps.onChange(e);
        }
      },
    });
  }

  const errorElement = hasError
    ? React.createElement(
        'div',
        {
          className: 'eds-form-item__error',
          role: 'alert',
          style: {
            color: 'var(--sys-color-status-danger-text, #991B1B)',
            fontSize: 'var(--typography-font-size-xs, 12px)',
            marginTop: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          },
        },
        errors[0]
      )
    : null;

  const helpElement =
    !hasError && help
      ? React.createElement(
          'div',
          {
            className: 'eds-form-item__help',
            style: {
              color: 'var(--sys-color-text-secondary, #475569)',
              fontSize: 'var(--typography-font-size-xs, 12px)',
              marginTop: '4px',
            },
          },
          help
        )
      : null;

  return React.createElement(
    'div',
    {
      className: `eds-form-item ${hasError ? 'eds-form-item--error' : ''} ${className}`.trim(),
      style: {
        marginBottom: '16px',
        display: layout === 'inline' ? 'inline-flex' : 'flex',
        flexDirection: layout === 'horizontal' ? 'row' : 'column',
        alignItems: layout === 'horizontal' ? 'center' : 'stretch',
        ...style,
      },
    },
    labelElement,
    React.createElement('div', { className: 'eds-form-item__control' }, controlElement, errorElement, helpElement)
  );
};

// -----------------------------------------------------------------------------
// Form Component
// -----------------------------------------------------------------------------
export interface FormComponent extends React.FC<FormProps> {
  Item: typeof FormItem;
  useForm: typeof useForm;
}

const FormInternal: React.FC<FormProps> = (props) => {
  const {
    form: externalForm,
    initialValues,
    onFinish,
    onFinishFailed,
    layout = 'vertical',
    className = '',
    style,
    children,
    ...rest
  } = props || {};

  const [internalForm] = useForm(initialValues);
  const form = externalForm || internalForm;

  const handleSubmit = (e: React.FormEvent) => {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }
    form.submit({ onFinish, onFinishFailed });
  };

  return React.createElement(
    'form',
    {
      className: `eds-form eds-form--${layout} ${className}`.trim(),
      onSubmit: handleSubmit,
      noValidate: true,
      style: {
        display: 'flex',
        flexDirection: layout === 'inline' ? 'row' : 'column',
        gap: layout === 'inline' ? '12px' : '0',
        ...style,
      },
      ...rest,
    },
    React.createElement(
      FormContext.Provider,
      { value: { form, layout } },
      children
    )
  );
};

export const Form: FormComponent = Object.assign(FormInternal, {
  Item: FormItem,
  useForm: useForm,
});

export default Form;
