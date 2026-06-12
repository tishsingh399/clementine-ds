import type { Meta, StoryObj } from '@storybook/react';
import { toast, Button, Group } from '@clementine-ds/ui';

/** The Notifications outlet is mounted by ClementineDSProvider (Storybook decorator). */
function ToastDemo() {
  return (
    <Group>
      <Button onClick={() => toast.success('Changes saved')}>Success</Button>
      <Button color="red" onClick={() => toast.error('Could not connect — retrying')}>Error</Button>
      <Button color="orange" variant="outline" onClick={() => toast.warning('Session expires in 5 minutes')}>Warning</Button>
      <Button variant="outline" onClick={() => toast.info('A new version is available')}>Info</Button>
      <Button variant="subtle" onClick={() => toast.undo('Deleted 3 items', { title: 'Undo available' })}>Undo pattern</Button>
    </Group>
  );
}

const meta: Meta<typeof ToastDemo> = { title: 'Components/Toast', component: ToastDemo };
export default meta; type Story = StoryObj<typeof ToastDemo>;
export const Playground: Story = {};
