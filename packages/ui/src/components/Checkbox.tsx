import { Checkbox as MantineCheckbox, type CheckboxProps as MantineCheckboxProps } from '@mantine/core';
import { forwardRef } from 'react';

export interface CheckboxProps extends MantineCheckboxProps {}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  return <MantineCheckbox ref={ref} {...props} />;
});

Checkbox.displayName = 'Checkbox';
