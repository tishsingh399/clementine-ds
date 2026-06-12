import { ColorInput as MantineColorInput } from '@mantine/core';

export type { ColorInputProps } from '@mantine/core';

/** Clementine ColorInput — pick a color via swatch + hex field. Show the hex value as text, never rely on the swatch alone. Spec: specs/color-input/index.md */
export const ColorInput: typeof MantineColorInput = MantineColorInput;
