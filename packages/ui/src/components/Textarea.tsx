import { Textarea as MantineTextarea, type TextareaProps as MantineTextareaProps } from '@mantine/core';
import { forwardRef } from 'react';

export interface TextareaProps extends MantineTextareaProps {}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => {
  return <MantineTextarea ref={ref} {...props} />;
});

Textarea.displayName = 'Textarea';
