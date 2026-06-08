import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal, Button, Text, Stack, TextInput } from '@clementine-ds/ui';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    centered: { control: 'boolean' },
    withCloseButton: { control: 'boolean' },
  },
  args: {
    title: 'Modal Title',
    size: 'md',
    centered: false,
    withCloseButton: true,
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: (args) => {
    const [opened, setOpened] = useState(false);
    return (
      <>
        <Button onClick={() => setOpened(true)}>Open Modal</Button>
        <Modal {...args} opened={opened} onClose={() => setOpened(false)}>
          <Text>Modal content goes here.</Text>
        </Modal>
      </>
    );
  },
};

export const Centered: Story = {
  args: { centered: true },
  render: (args) => {
    const [opened, setOpened] = useState(false);
    return (
      <>
        <Button onClick={() => setOpened(true)}>Open Centered</Button>
        <Modal {...args} opened={opened} onClose={() => setOpened(false)}>
          <Text>Centered modal content.</Text>
        </Modal>
      </>
    );
  },
};

export const WithForm: Story = {
  args: { title: 'Create Access Request' },
  render: (args) => {
    const [opened, setOpened] = useState(false);
    return (
      <>
        <Button onClick={() => setOpened(true)}>Request Access</Button>
        <Modal {...args} opened={opened} onClose={() => setOpened(false)}>
          <Stack gap="md">
            <TextInput label="Target System" placeholder="e.g., prod-db-01" />
            <TextInput label="Justification" placeholder="Reason for access" />
            <Button fullWidth>Submit Request</Button>
          </Stack>
        </Modal>
      </>
    );
  },
};
