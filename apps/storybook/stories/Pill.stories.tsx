import type { Meta, StoryObj } from '@storybook/react';
import { Pill, PillGroup } from '@clementine-ds/ui';
const meta: Meta<typeof Pill> = { title:'Components/Pill', component: Pill, args:{ children:'prod', withRemoveButton:true } };
export default meta; type Story = StoryObj<typeof Pill>;
export const Default: Story = {};
export const Group: Story = { render:() => (<PillGroup><Pill withRemoveButton>prod</Pill><Pill withRemoveButton>read-only</Pill></PillGroup>) };
