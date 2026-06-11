import type { Meta, StoryObj } from '@storybook/react';
import { Chip, ChipGroup, Group } from '@clementine-ds/ui';

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  args: { children: 'Standing access', defaultChecked: true },
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {};
export const Unchecked: Story = { args: { defaultChecked: false } };

export const SingleSelectGroup: Story = {
  render: () => (
    <ChipGroup defaultValue="all">
      <Group>
        <Chip value="all">All</Chip>
        <Chip value="standing">Standing</Chip>
        <Chip value="jit">Just-in-time</Chip>
      </Group>
    </ChipGroup>
  ),
};
