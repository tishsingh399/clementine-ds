import type { Meta, StoryObj } from '@storybook/react';
import { RefusalState } from '@clementine-ds/ui';
const meta: Meta<typeof RefusalState> = { title:'AI/RefusalState', component: RefusalState, args:{ reason:"I can't revoke another user's access from here.", suggestion:'an admin can do this in Access settings' }, render:(args)=> <div style={{width:380}}><RefusalState {...args} /></div> };
export default meta; type Story = StoryObj<typeof RefusalState>;
export const Default: Story = {};
