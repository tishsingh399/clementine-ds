import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal, ModalDescription, ModalFooter, Button, Text, Stack, TextInput } from '@clementine-ds/ui';

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
    title: 'Modal title',
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
        <Button onClick={() => setOpened(true)}>Open modal</Button>
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
        <Button onClick={() => setOpened(true)}>Open centered</Button>
        <Modal {...args} opened={opened} onClose={() => setOpened(false)}>
          <Text>Centered modal content.</Text>
        </Modal>
      </>
    );
  },
};

export const InitiallyOpen: Story = {
  args: { opened: true, onClose: () => undefined },
  render: (args) => (
    <Modal {...args}>
      <Text>Open modal state for visual and accessibility review.</Text>
    </Modal>
  ),
};

export const WithForm: Story = {
  args: { title: 'Create access request' },
  render: (args) => {
    const [opened, setOpened] = useState(false);
    return (
      <>
        <Button onClick={() => setOpened(true)}>Request access</Button>
        <Modal {...args} opened={opened} onClose={() => setOpened(false)}>
          <Stack gap="md">
            <TextInput label="Target system" placeholder="e.g., prod-db-01" />
            <TextInput label="Justification" placeholder="Reason for access" />
            <Button fullWidth>Submit request</Button>
          </Stack>
        </Modal>
      </>
    );
  },
};

// Mirrors the Clementine Figma specimen: heading, supporting text, then a
// decision row with Cancel first and an action named for what it does.
export const ConfirmDestructive: Story = {
  args: { title: 'Revoke session?' },
  render: (args) => {
    const [opened, setOpened] = useState(false);
    return (
      <>
        <Button color="red" onClick={() => setOpened(true)}>
          Revoke session
        </Button>
        <Modal {...args} opened={opened} onClose={() => setOpened(false)}>
          <ModalDescription>
            This will sign out the user from all devices and require re-authentication.
          </ModalDescription>
          <ModalFooter>
            <Button variant="outline" onClick={() => setOpened(false)}>
              Cancel
            </Button>
            <Button color="red" onClick={() => setOpened(false)}>
              Revoke session
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};
