import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton, Stack, Group } from '@clementine-ds/ui';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  args: { height: 16, radius: 'md' },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Line: Story = { args: { width: 240 } };
export const Circle: Story = { args: { height: 48, width: 48, circle: true } };

export const CardLoading: Story = {
  render: () => (
    <Stack gap="sm" w={280}>
      <Group>
        <Skeleton height={40} circle />
        <Skeleton height={12} width={140} />
      </Group>
      <Skeleton height={120} />
      <Skeleton height={12} />
      <Skeleton height={12} width="70%" />
    </Stack>
  ),
};
