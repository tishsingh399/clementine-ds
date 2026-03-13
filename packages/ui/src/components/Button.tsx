import { Button as MantineButton, type ButtonProps as MantineButtonProps } from '@mantine/core';
import { forwardRef } from 'react';

export interface ButtonProps extends MantineButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  return <MantineButton ref={ref} {...props} />;
});

Button.displayName = 'Button';
