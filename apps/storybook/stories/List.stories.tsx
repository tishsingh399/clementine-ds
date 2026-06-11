import type { Meta, StoryObj } from '@storybook/react';
import { List, ListItem } from '@clementine-ds/ui';
const meta: Meta<typeof List> = { title:'Components/List', component: List, render:() => (
  <List><ListItem>Standing access</ListItem><ListItem>Just-in-time access</ListItem><ListItem>Audit retention 400 days</ListItem></List>
) };
export default meta; type Story = StoryObj<typeof List>;
export const Default: Story = {};
export const Ordered: Story = { render:() => (<List type="ordered"><ListItem>Request</ListItem><ListItem>Approve</ListItem><ListItem>Grant</ListItem></List>) };
