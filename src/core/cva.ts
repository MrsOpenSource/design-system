/**
 * Class Variance Authority (CVA) & Class Composition Engine
 * Zero-dependency, type-safe variant orchestration for the Enterprise Design System.
 */

export type ClassValue =
  | string
  | number
  | boolean
  | undefined
  | null
  | ClassValue[]
  | { [key: string]: any };

/**
 * Combines class names conditionally (similar to clsx / classnames).
 */
export function cx(...inputs: ClassValue[]): string {
  const classes: string[] = [];

  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    if (!input) continue;

    if (typeof input === 'string' || typeof input === 'number') {
      const str = String(input).trim();
      if (str) classes.push(str);
    } else if (Array.isArray(input)) {
      const inner = cx(...input);
      if (inner) classes.push(inner);
    } else if (typeof input === 'object') {
      for (const key in input) {
        if (Object.prototype.hasOwnProperty.call(input, key) && input[key]) {
          const trimmed = key.trim();
          if (trimmed) classes.push(trimmed);
        }
      }
    }
  }

  return classes.join(' ');
}

export type VariantValues = Record<string, ClassValue>;
export type VariantDefinitions = Record<string, VariantValues>;

export interface CVAOptions<T extends VariantDefinitions> {
  variants?: T;
  compoundVariants?: Array<
    {
      [K in keyof T]?: keyof T[K] | boolean | string | number;
    } & {
      class?: ClassValue;
      className?: ClassValue;
    }
  >;
  defaultVariants?: {
    [K in keyof T]?: keyof T[K] | boolean | string | number;
  };
}

export type VariantProps<T extends (...args: any) => any> =
  T extends (props?: infer P) => string
    ? Omit<P, 'class' | 'className'>
    : never;

/**
 * Creates a variant function with type-safe variant resolution.
 */
export function cva<T extends VariantDefinitions>(
  base?: ClassValue,
  options?: CVAOptions<T>
) {
  const variants = options?.variants;
  const defaultVariants = options?.defaultVariants || {};
  const compoundVariants = options?.compoundVariants || [];

  return function variantFn(props?: {
    [K in keyof T]?: keyof T[K] | boolean | string | number | undefined | null;
  } & {
    class?: ClassValue;
    className?: ClassValue;
    [key: string]: any;
  }): string {
    const resolvedVariants: Record<string, any> = { ...defaultVariants };

    if (props) {
      for (const key in props) {
        if (props[key] !== undefined) {
          resolvedVariants[key] = props[key];
        }
      }
    }

    const output: string[] = [];

    // Base classes
    if (base) {
      const baseClass = cx(base);
      if (baseClass) output.push(baseClass);
    }

    // Process defined variants
    if (variants) {
      for (const variantKey in variants) {
        const val = resolvedVariants[variantKey];
        if (val === undefined || val === null) continue;

        const variantMap = variants[variantKey];
        const stringVal = String(val);

        if (variantMap && Object.prototype.hasOwnProperty.call(variantMap, stringVal)) {
          const variantClass = cx(variantMap[stringVal]);
          if (variantClass) output.push(variantClass);
        } else if (variantMap && Object.prototype.hasOwnProperty.call(variantMap, val)) {
          const variantClass = cx(variantMap[val]);
          if (variantClass) output.push(variantClass);
        }
      }
    }

    // Process compound variants
    for (let i = 0; i < compoundVariants.length; i++) {
      const cv = compoundVariants[i];
      let matches = true;

      for (const key in cv) {
        if (key === 'class' || key === 'className') continue;

        const expected = cv[key];
        const actual = resolvedVariants[key];

        // Compare stringified for boolean vs string compatibility
        if (String(actual) !== String(expected) && actual !== expected) {
          matches = false;
          break;
        }
      }

      if (matches) {
        const compoundClass = cx(cv.class, cv.className);
        if (compoundClass) output.push(compoundClass);
      }
    }

    // Custom class and className
    if (props) {
      const userClass = cx(props.class, props.className);
      if (userClass) output.push(userClass);
    }

    return output.join(' ').trim();
  };
}

export default cva;
