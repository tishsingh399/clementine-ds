import type { Meta, StoryObj } from '@storybook/react';
import { DescriptionList } from '@clementine-ds/ui';
const meta: Meta<typeof DescriptionList> = { title:'Components/DescriptionList', component: DescriptionList, args:{ items:[{ term:'Owner', detail:'Tina Singh' },{ term:'Scope', detail:'read-only' },{ term:'Granted', detail:'Jan 2026' }] } };
export default meta; type Story = StoryObj<typeof DescriptionList>;
export const Default: Story = {};
