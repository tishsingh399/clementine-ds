import type { Meta, StoryObj } from '@storybook/react';
import { PresenceIndicator } from '@clementine-ds/ui';
const meta: Meta<typeof PresenceIndicator> = { title:'Enterprise/PresenceIndicator', component: PresenceIndicator, args:{ users:[{ name:'Tina Singh', status:'online' },{ name:'Jordan Lee', status:'away' },{ name:'Sam Park', status:'busy' }] } };
export default meta; type Story = StoryObj<typeof PresenceIndicator>; export const Default: Story = {};
