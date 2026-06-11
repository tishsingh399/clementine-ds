import { PinInput as MantinePinInput } from '@mantine/core';

export type { PinInputProps } from '@mantine/core';

/** Clementine PinInput — A segmented input for short codes — OTP / MFA / verification PINs. Spec: specs/pin-input/index.md */
export const PinInput: typeof MantinePinInput = MantinePinInput;
