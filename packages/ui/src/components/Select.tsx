import { Select as MantineSelect, type SelectProps as MantineSelectProps } from '@mantine/core';
import { forwardRef } from 'react';

export interface SelectProps extends MantineSelectProps {}

export const Select = forwardRef<HTMLInputElement, SelectProps>((props, ref) => {
  return <MantineSelect ref={ref} {...props} />;
});

Select.displayName = 'Select';
