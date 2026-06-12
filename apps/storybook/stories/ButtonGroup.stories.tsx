import type { Meta, StoryObj } from '@storybook/react';
import { ButtonGroup, Button } from '@clementine-ds/ui';
const meta: Meta<typeof ButtonGroup> = { title:'Components/ButtonGroup', component: ButtonGroup, render:() => (
  <ButtonGroup><Button variant="default">Day</Button><Button variant="default">Week</Button><Button variant="default">Month</Button></ButtonGroup>
) };
export default meta; type Story = StoryObj<typeof ButtonGroup>;
export const Default: Story = {};
