import type { Meta, StoryObj } from '@storybook/react';
import { Rating } from '@clementine-ds/ui';
const meta: Meta<typeof Rating> = { title:'Components/Rating', component: Rating, args:{ defaultValue:3 } };
export default meta; type Story = StoryObj<typeof Rating>;
export const Default: Story = {};
export const ReadOnly: Story = { args:{ value:4, readOnly:true } };
export const Fractions: Story = { args:{ defaultValue:3.5, fractions:2 } };
