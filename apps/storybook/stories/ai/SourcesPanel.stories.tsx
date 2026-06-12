import type { Meta, StoryObj } from '@storybook/react';
import { SourcesPanel } from '@clementine-ds/ui';
const meta: Meta<typeof SourcesPanel> = { title:'AI/SourcesPanel', component: SourcesPanel, render:(args) => (
  <div style={{ width: 380 }}><SourcesPanel {...args} sources={[{ index:1, title:'retention-policy.md', snippet:'400-day retention window', url:'#' },{ index:2, title:'architecture.md', url:'#' }]} /></div>
) };
export default meta; type Story = StoryObj<typeof SourcesPanel>;
export const Default: Story = {};
