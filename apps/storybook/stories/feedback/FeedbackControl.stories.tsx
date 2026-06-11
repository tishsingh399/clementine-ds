import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FeedbackControl, type FeedbackValue } from '@clementine-ds/ui';

const meta: Meta<typeof FeedbackControl> = {
  title: 'Feedback/FeedbackControl',
  component: FeedbackControl,
};

export default meta;
type Story = StoryObj<typeof FeedbackControl>;

export const Default: Story = {
  render: () => {
    const [v, setV] = useState<FeedbackValue>(null);
    return <FeedbackControl value={v} onChange={setV} />;
  },
};

export const PositiveSelected: Story = {
  render: () => {
    const [v, setV] = useState<FeedbackValue>('up');
    return <FeedbackControl value={v} onChange={setV} />;
  },
};
