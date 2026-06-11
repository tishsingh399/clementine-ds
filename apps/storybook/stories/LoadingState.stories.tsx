import type { Meta, StoryObj } from '@storybook/react';
import { LoadingState } from '@clementine-ds/ui';
const meta: Meta<typeof LoadingState> = { title: 'States & Forms/LoadingState', component: LoadingState, args: { label: 'Loading…' } };
export default meta; type Story = StoryObj<typeof LoadingState>;
export const Default: Story = {};
