import { TextInput as MantineTextInput, type TextInputProps as MantineTextInputProps } from '@mantine/core';
import { forwardRef } from 'react';

export interface TextInputProps extends MantineTextInputProps {}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  return <MantineTextInput ref={ref} {...props} />;
});

TextInput.displayName = 'TextInput';
