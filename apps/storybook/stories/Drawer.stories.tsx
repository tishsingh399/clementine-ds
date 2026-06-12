import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Drawer, Button, Stack, Text, TextInput } from '@clementine-ds/ui';

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer',
  component: Drawer,
  argTypes: {
    position: { control: 'select', options: ['left', 'right', 'top', 'bottom'] },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  },
  args: { position: 'right', size: 'md', title: 'Filters' },
  render: (args) => {
    const [opened, setOpened] = useState(false);
    return (
      <>
        <Button onClick={() => setOpened(true)}>Open drawer</Button>
        <Drawer {...args} opened={opened} onClose={() => setOpened(false)}>
          <Stack gap="sm">
            <TextInput label="Search" placeholder="Filter results" />
            <Text size="sm" c="dimmed">Secondary tasks live here without leaving the page.</Text>
          </Stack>
        </Drawer>
      </>
    );
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

export const Default: Story = {};
export const Left: Story = { args: { position: 'left' } };
