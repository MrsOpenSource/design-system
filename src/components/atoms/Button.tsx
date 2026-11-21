import React from 'react';
import { Button as ButtonPrimitive, ButtonProps, buttonVariants } from './Button.ts';

export { buttonVariants, type ButtonProps };

export const Button: React.FC<ButtonProps> = (props) => {
  return <ButtonPrimitive {...props} />;
};

export default Button;
