import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabsList, TabsTab, TabsPanel } from '@tina-ds/ui';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline', 'pills'],
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
  args: {
    defaultValue: 'overview',
    variant: 'default',
    orientation: 'horizontal',
  },
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTab value="overview">Overview</TabsTab>
        <TabsTab value="sessions">Sessions</TabsTab>
        <TabsTab value="audit">Audit Log</TabsTab>
      </TabsList>
      <TabsPanel value="overview" pt="md">Overview content</TabsPanel>
      <TabsPanel value="sessions" pt="md">Sessions content</TabsPanel>
      <TabsPanel value="audit" pt="md">Audit log content</TabsPanel>
    </Tabs>
  ),
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {};

export const Outline: Story = {
  args: { variant: 'outline' },
};

export const Pills: Story = {
  args: { variant: 'pills' },
};

export const Vertical: Story = {
  args: { orientation: 'vertical' },
};
