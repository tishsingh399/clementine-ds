import type { Meta, StoryObj } from '@storybook/react';
import { ColorInput } from '@clementine-ds/ui';

const meta: Meta<typeof ColorInput> = {
  title: 'Components/ColorInput',
  component: ColorInput,
  args: { label: 'Token color', defaultValue: '#1a1a18' },
};

export default meta;
type Story = StoryObj<typeof ColorInput>;
export const Default: Story = {};
