import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from '@clementine-ds/ui';
const meta: Meta<typeof Calendar> = { title: 'Components/Calendar', component: Calendar };
export default meta; type Story = StoryObj<typeof Calendar>;
export const Default: Story = {};
export const Static: Story = { args: { static: true } };
