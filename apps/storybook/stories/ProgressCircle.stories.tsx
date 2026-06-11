import type { Meta, StoryObj } from '@storybook/react';
import { ProgressCircle, Group } from '@clementine-ds/ui';
const meta: Meta<typeof ProgressCircle> = { title: 'States & Forms/ProgressCircle', component: ProgressCircle, args: { value: 64 } };
export default meta; type Story = StoryObj<typeof ProgressCircle>;
export const Default: Story = {};
export const Scale: Story = { render: () => (<Group><ProgressCircle value={0} /><ProgressCircle value={50} /><ProgressCircle value={100} /></Group>) };
