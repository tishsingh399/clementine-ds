import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from '@clementine-ds/ui';
const meta: Meta<typeof DatePicker> = { title: 'Components/DatePicker', component: DatePicker };
export default meta; type Story = StoryObj<typeof DatePicker>;
export const Default: Story = {};
export const Range: Story = { args: { type: 'range' } };
export const Multiple: Story = { args: { type: 'multiple' } };
export const WithMinMax: Story = { args: { minDate: new Date(), maxDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) } };
