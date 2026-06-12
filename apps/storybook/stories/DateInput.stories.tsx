import type { Meta, StoryObj } from '@storybook/react';
import { DateInput } from '@clementine-ds/ui';
const meta: Meta<typeof DateInput> = { title: 'Components/DateInput', component: DateInput, args: { label: 'Due date', placeholder: 'Pick or type a date' } };
export default meta; type Story = StoryObj<typeof DateInput>;
export const Default: Story = {};
export const ErrorState: Story = { args: { error: 'Date must be in the future' } };
export const Disabled: Story = { args: { disabled: true } };
