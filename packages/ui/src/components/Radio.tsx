import {
  Radio as MantineRadio,
  type RadioProps as MantineRadioProps,
  type RadioGroupProps as MantineRadioGroupProps,
} from '@mantine/core';
import { forwardRef } from 'react';

export interface RadioProps extends MantineRadioProps {}
export interface RadioGroupProps extends MantineRadioGroupProps {}

export const Radio = forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
  return <MantineRadio ref={ref} {...props} />;
});

Radio.displayName = 'Radio';

export const RadioGroup = MantineRadio.Group;
