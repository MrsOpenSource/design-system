import React from 'react';
import { Input as InputPrimitive, InputProps, inputVariants } from './Input.ts';

export { inputVariants, type InputProps };

export const Input: React.FC<InputProps> = (props) => {
  return <InputPrimitive {...props} />;
};

export default Input;
