import { Switch as MantineSwitch, type SwitchProps as MantineSwitchProps } from '@mantine/core';
import { forwardRef } from 'react';

export interface SwitchProps extends MantineSwitchProps {}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>((props, ref) => {
  return <MantineSwitch ref={ref} {...props} />;
});

Switch.displayName = 'Switch';
