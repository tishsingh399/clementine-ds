import { Stepper as MantineStepper } from '@mantine/core';

export type { StepperProps } from '@mantine/core';

/**
 * Clementine Stepper — ordered progress through a multi-step flow (wizard, onboarding).
 * Compose `Stepper` > `StepperStep` (+ optional `StepperCompleted`). Mark the active step
 * `aria-current="step"`. Spec: specs/stepper/index.md
 */
export const Stepper: typeof MantineStepper = MantineStepper;
export const StepperStep: typeof MantineStepper.Step = MantineStepper.Step;
export const StepperCompleted: typeof MantineStepper.Completed = MantineStepper.Completed;
