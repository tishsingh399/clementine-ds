import type { Meta, StoryObj } from '@storybook/react';
import { Menu, MenuTarget, MenuDropdown, MenuItem, MenuLabel, MenuDivider, Button } from '@clementine-ds/ui';

const meta: Meta<typeof Menu> = {
  title: 'Components/Menu',
  component: Menu,
  argTypes: {
    position: { control: 'select', options: ['bottom-start', 'bottom-end', 'top-start', 'right-start'] },
  },
  args: { position: 'bottom-start', shadow: 'lg', width: 220 },
  render: (args) => (
    <Menu {...args}>
      <MenuTarget>
        <Button variant="outline">Actions</Button>
      </MenuTarget>
      <MenuDropdown>
        <MenuLabel>Session</MenuLabel>
        <MenuItem>View details</MenuItem>
        <MenuItem>Export log</MenuItem>
        <MenuDivider />
        <MenuLabel>Danger zone</MenuLabel>
        <MenuItem color="red">Revoke access</MenuItem>
      </MenuDropdown>
    </Menu>
  ),
};

export default meta;
type Story = StoryObj<typeof Menu>;

export const Default: Story = {};

export const Opened: Story = { args: { defaultOpened: true } };

export const RightAligned: Story = { args: { position: 'bottom-end' } };
