import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Composer } from '@clementine-ds/ui';

const meta: Meta<typeof Composer> = {
  title: 'AI/Composer',
  component: Composer,
};

export default meta;
type Story = StoryObj<typeof Composer>;

export const Default: Story = {
  render: () => {
    const [v, setV] = useState('');
    return (
      <div style={{ width: 520 }}>
        <Composer value={v} onChange={setV} onSubmit={() => setV('')} />
      </div>
    );
  },
};

export const Busy: Story = {
  render: () => {
    const [v, setV] = useState('Summarize the audit log for the last 24 hours');
    return (
      <div style={{ width: 520 }}>
        <Composer value={v} onChange={setV} busy />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ width: 520 }}>
      <Composer disabled placeholder="Connect a model to start" />
    </div>
  ),
};
