import type { Meta, StoryObj } from '@storybook/react';
import { Popover, PopoverTarget, PopoverDropdown, Button, Text } from '@clementine-ds/ui';

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  args: { width: 260, position: 'bottom', withArrow: true, shadow: 'lg' },
  render: (args) => (
    <Popover {...args}>
      <PopoverTarget>
        <Button variant="outline">Session details</Button>
      </PopoverTarget>
      <PopoverDropdown>
        <Text size="sm">Standing access since Jan 2026. Last used 2 hours ago.</Text>
      </PopoverDropdown>
    </Popover>
  ),
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {};
export const Opened: Story = { args: { defaultOpened: true } };
