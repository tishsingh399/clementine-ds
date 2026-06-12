import type { Meta, StoryObj } from '@storybook/react';
import { Fab } from '@clementine-ds/ui';
const meta: Meta<typeof Fab> = { title:'Components/Fab', component: Fab, args:{ 'aria-label':'New session', children:'+' } };
export default meta; type Story = StoryObj<typeof Fab>;
export const Default: Story = {};
