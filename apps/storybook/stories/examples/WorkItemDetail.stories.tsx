import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  Box, Flex, Group, Stack, Text, Title, Breadcrumbs, Anchor, Button, Select, Avatar, Badge, Divider,
  DescriptionList, Tabs, TabsList, TabsTab, TabsPanel, CommentThread, ActivityFeed, DateInput,
} from '@clementine-ds/ui';

// Worked example — docs/worked-examples/work-item-detail.md (pattern: issue tracker work item view)
function WorkItemDetailScreen() {
  const [status, setStatus] = useState<string | null>('In progress');
  const [priority, setPriority] = useState<string | null>('High');
  const [assignee, setAssignee] = useState<string | null>('Ana Lee');
  const unstyled = { variant: 'unstyled' as const, size: 'sm' as const, w: 180 };
  return (
    <Flex gap="xl" p="md" align="flex-start">
      <Stack gap="md" style={{ flex: 1, minWidth: 0 }}>
        <Breadcrumbs><Anchor href="#">Platform</Anchor><Anchor href="#">Sprint 14</Anchor><Text size="sm">WRK-95</Text></Breadcrumbs>
        <Title order={2}>Session timeout dialog</Title>
        <Text size="sm">
          Warn people two minutes before their session ends, let them extend it, and keep unsaved form input when it expires.
        </Text>
        <Group gap="xs"><Button size="xs" variant="default">Attach</Button><Button size="xs" variant="default">Link work item</Button></Group>
        <Divider />
        <Tabs defaultValue="comments">
          <TabsList>
            <TabsTab value="comments">Comments</TabsTab>
            <TabsTab value="history">History</TabsTab>
          </TabsList>
          <TabsPanel value="comments" pt="md">
            <CommentThread
              comments={[
                { id: '1', author: 'Jo Rivera', body: 'Should extending need a password re-entry?', when: '2h ago' },
                { id: '2', author: 'Ana Lee', body: 'Not under 30 minutes idle. Re-auth after that.', when: '1h ago' },
              ]}
              onSubmit={() => {}}
            />
          </TabsPanel>
          <TabsPanel value="history" pt="md">
            <ActivityFeed
              items={[
                { id: 'a', actor: 'Ana Lee', action: 'moved this to In progress', when: 'Today 09:12' },
                { id: 'b', actor: 'Jo Rivera', action: 'set priority to High', when: 'Yesterday' },
              ]}
            />
          </TabsPanel>
        </Tabs>
      </Stack>
      <Box w={320} style={{ flexShrink: 0 }}>
        <Stack gap="sm">
          <Text size="xs" fw={700} c="dimmed" tt="uppercase">Details</Text>
          {/* Property panel = DescriptionList whose details are controls. No new component needed. */}
          <DescriptionList
            items={[
              { term: 'Status', detail: <Select {...unstyled} aria-label="Status" data={['Todo', 'In progress', 'In review', 'Done']} value={status} onChange={setStatus} /> },
              { term: 'Priority', detail: <Select {...unstyled} aria-label="Priority" data={['Urgent', 'High', 'Medium', 'Low']} value={priority} onChange={setPriority} /> },
              {
                term: 'Assignee',
                detail: (
                  <Group gap={6} wrap="nowrap">
                    <Avatar size={20} radius="xl">{assignee?.split(' ').map((n) => n[0]).join('')}</Avatar>
                    <Select {...unstyled} w={150} aria-label="Assignee" data={['Ana Lee', 'Jo Rivera', 'Mo Khan']} value={assignee} onChange={setAssignee} />
                  </Group>
                ),
              },
              { term: 'Labels', detail: <Group gap={4}><Badge size="xs" variant="light">Feature</Badge><Badge size="xs" variant="light">Security</Badge></Group> },
              { term: 'Due date', detail: <DateInput {...unstyled} aria-label="Due date" placeholder="Set date" /> },
            ]}
          />
        </Stack>
      </Box>
    </Flex>
  );
}

const meta: Meta = { title: 'Worked examples/Work item detail' };
export default meta;
export const Screen: StoryObj = { render: () => <WorkItemDetailScreen /> };
