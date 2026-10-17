import type { Meta, StoryObj } from '@storybook/react';
import {
  Flex, Box, Stack, Group, Title, Text, Breadcrumbs, Anchor, Avatar, Badge, Alert, Tree, Divider,
  Table, TableThead, TableTbody, TableTr, TableTh, TableTd, CommentThread, Button, List,
} from '@clementine-ds/ui';

// Worked example — docs/worked-examples/doc-page.md (pattern: team wiki pages)
const pages = [
  { value: 'eng', label: 'Engineering', children: [
    { value: 'runbooks', label: 'Runbooks', children: [{ value: 'keys', label: 'Rotating API keys' }, { value: 'oncall', label: 'On-call handover' }] },
    { value: 'adrs', label: 'Decision records' },
  ] },
];

function DocPageScreen() {
  return (
    <Flex gap="xl" p="md" align="flex-start">
      <Box w={240} style={{ flexShrink: 0 }}>
        <Text size="xs" fw={700} c="dimmed" mb="xs">PAGES</Text>
        <Tree data={pages} />
      </Box>
      <Stack gap="md" style={{ flex: 1, minWidth: 0, maxWidth: 760 }}>
        <Breadcrumbs><Anchor href="#">Engineering</Anchor><Anchor href="#">Runbooks</Anchor><Text size="sm">Rotating API keys</Text></Breadcrumbs>
        <Group justify="space-between" align="flex-start">
          <Title order={1}>Rotating API keys</Title>
          <Group gap="xs"><Badge variant="light" color="green">Verified</Badge><Button size="xs" variant="default">Edit</Button></Group>
        </Group>
        <Group gap="xs">
          <Avatar size={24} radius="xl">AL</Avatar>
          <Text size="sm" c="dimmed">Owned by Ana Lee · Updated 3 days ago · 4 min read</Text>
        </Group>
        {/* Callout / info panel = Alert. Not a Card with a coloured border. */}
        <Alert intent="warning" title="Revoking is immediate">Services using the old key fail until they pick up the new secret.</Alert>
        <Title order={3}>Steps</Title>
        <List type="ordered" spacing="xs">
          <List.Item>Create the new key in Settings → Keys.</List.Item>
          <List.Item>Update the deploy secret and redeploy.</List.Item>
          <List.Item>Revoke the old key after traffic moves.</List.Item>
        </List>
        <Title order={3}>Owners</Title>
        <Table>
          <TableThead><TableTr><TableTh>Environment</TableTh><TableTh>Owner</TableTh><TableTh>Rotation</TableTh></TableTr></TableThead>
          <TableTbody>
            <TableTr><TableTd>Staging</TableTd><TableTd>Platform</TableTd><TableTd>90 days</TableTd></TableTr>
            <TableTr><TableTd>Production</TableTd><TableTd>Security</TableTd><TableTd>30 days</TableTd></TableTr>
          </TableTbody>
        </Table>
        <Divider />
        <CommentThread comments={[{ id: '1', author: 'Jo Rivera', body: 'Add the rollback step?', when: 'yesterday' }]} onSubmit={() => {}} />
      </Stack>
    </Flex>
  );
}

const meta: Meta = { title: 'Worked examples/Doc page' };
export default meta;
export const Screen: StoryObj = { render: () => <DocPageScreen /> };
