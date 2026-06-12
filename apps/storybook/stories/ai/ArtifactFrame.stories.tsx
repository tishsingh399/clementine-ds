import type { Meta, StoryObj } from '@storybook/react';
import { ArtifactFrame, Button, Text } from '@clementine-ds/ui';

const meta: Meta<typeof ArtifactFrame> = {
  title: 'AI/ArtifactFrame',
  component: ArtifactFrame,
  args: { title: 'revoke-sessions.ts', kind: 'code' },
  render: (args) => (
    <div style={{ width: 480 }}>
      <ArtifactFrame {...args} actions={<Button size="xs" variant="default">Copy</Button>}>
        <pre style={{ margin: 0, fontSize: 12, fontFamily: 'var(--mantine-font-family-monospace)', whiteSpace: 'pre-wrap' }}>
{`await revokeSessions(ids);
log('revoked', ids.length);`}
        </pre>
      </ArtifactFrame>
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof ArtifactFrame>;

export const Code: Story = {};

export const Document: Story = {
  args: { title: 'Q3 access review', kind: 'document' },
  render: (args) => (
    <div style={{ width: 480 }}>
      <ArtifactFrame {...args}>
        <Text size="sm">Summary of standing access across 12 systems, with recommended revocations…</Text>
      </ArtifactFrame>
    </div>
  ),
};
