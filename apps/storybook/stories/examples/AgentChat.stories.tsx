import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  Flex, Stack, Group, Text, Box, ConversationThread, Message, MessageActions, ToolCallCard, JsonViewer,
  PermissionRequest, Composer, ModelSelector, ArtifactFrame, CodeBlock, ContextMeter, DisclosureBadge,
} from '@clementine-ds/ui';

// Worked example — docs/worked-examples/agent-chat.md (pattern: AI chat assistants)
const searchResult = { hits: [{ id: 'runbook-12', title: 'Rotating API keys', score: 0.82 }, { id: 'adr-40', title: 'Key storage', score: 0.77 }] };

function AgentChatScreen() {
  const [model, setModel] = useState<string | null>('Large');
  const [draft, setDraft] = useState('');
  const [approved, setApproved] = useState<boolean | null>(null);
  return (
    <Flex gap="md" p="md" align="flex-start">
      <Stack gap="md" style={{ flex: '1 1 560px', minWidth: 0 }}>
        <Group justify="space-between">
          <ModelSelector models={['Large', 'Fast']} value={model} onChange={setModel} size="xs" w={140} aria-label="Model" />
          <Group gap="xs"><DisclosureBadge /><ContextMeter used={38000} total={200000} /></Group>
        </Group>
        <ConversationThread>
          <Message role="user" authorName="You">Rotate the staging API key and update the deploy secret.</Message>
          <Message role="assistant" authorName="Assistant">
            <Stack gap="sm">
              <Text size="sm">I found the runbook. Rotating needs your approval because it revokes the current key.</Text>
              {/* ToolCallCard puts `result` inside a <p>; keep it a short string and show the payload in JsonViewer below. */}
              <ToolCallCard name="search_docs" args={{ query: 'rotate api key', top_k: 5 }} result="2 documents" status="success" />
              <Box pl="sm"><JsonViewer data={searchResult} defaultExpandDepth={1} aria-label="search_docs output" /></Box>
              {approved === null ? (
                <PermissionRequest
                  action="Revoke key stg-7f2 and create a new staging key"
                  scope="staging · secrets:write"
                  onAllow={() => setApproved(true)}
                  onDeny={() => setApproved(false)}
                />
              ) : (
                <ToolCallCard name="rotate_key" args={{ env: 'staging' }} status={approved ? 'running' : 'error'} result={approved ? 'Rotating…' : 'Denied by you'} />
              )}
            </Stack>
          </Message>
          <MessageActions onCopy={() => {}} onRegenerate={() => {}} />
        </ConversationThread>
        <Composer value={draft} onChange={setDraft} onSubmit={() => setDraft('')} placeholder="Reply to the assistant…" />
      </Stack>
      <Box style={{ flex: '1 1 360px', minWidth: 0 }}>
        <ArtifactFrame title="deploy-secrets.yaml" kind="Code">
          <CodeBlock code={'STAGING_API_KEY: ${{ secrets.STAGING_API_KEY }}\nROTATED_AT: pending'} language="yaml" />
        </ArtifactFrame>
      </Box>
    </Flex>
  );
}

const meta: Meta = { title: 'Worked examples/Agent chat' };
export default meta;
export const Screen: StoryObj = { render: () => <AgentChatScreen /> };
