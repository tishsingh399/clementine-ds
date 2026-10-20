import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';
import {
  Box, Group, Stack, Text, Title, Breadcrumbs, Anchor, SegmentedControl, Button, IconButton, Menu,
  Card, Badge, Avatar, KanbanBoard, KanbanColumn, CommandPalette, SavedViews, Kbd,
} from '@clementine-ds/ui';

// Worked example — docs/worked-examples/issue-board.md (pattern: issue tracker boards)
type Status = 'Backlog' | 'Todo' | 'In progress' | 'Done';
interface Issue { id: string; title: string; status: Status; label?: string; assignee?: string }
const STATUSES: Status[] = ['Backlog', 'Todo', 'In progress', 'Done'];
const seed: Issue[] = [
  { id: 'WRK-88', title: 'Audit empty states', status: 'Backlog', label: 'Design' },
  { id: 'WRK-91', title: 'Retry failed exports', status: 'Todo', label: 'Bug', assignee: 'AL' },
  { id: 'WRK-92', title: 'Keyboard shortcuts sheet', status: 'Todo', assignee: 'MK' },
  { id: 'WRK-95', title: 'Session timeout dialog', status: 'In progress', label: 'Feature', assignee: 'JR' },
  { id: 'WRK-96', title: 'Fix timezone in CSV', status: 'In progress', label: 'Bug', assignee: 'AL' },
  { id: 'WRK-97', title: 'Paginate audit log', status: 'In progress', assignee: 'MK' },
  { id: 'WRK-80', title: 'Remove legacy settings', status: 'Done', assignee: 'JR' },
];

function IssueCard({ issue, onMove }: { issue: Issue; onMove: (to: Status) => void }) {
  return (
    <Card padding="sm">
      <Group justify="space-between" wrap="nowrap" align="flex-start">
        <Stack gap={2}>
          <Text size="xs" c="dimmed">{issue.id}</Text>
          <Text size="sm" fw={500}>{issue.title}</Text>
        </Stack>
        <Menu position="bottom-end">
          <Menu.Target>
            <IconButton variant="subtle" size="sm" aria-label={`Move ${issue.id}`}>⋯</IconButton>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>Move to</Menu.Label>
            {STATUSES.filter((s) => s !== issue.status).map((s) => (
              <Menu.Item key={s} onClick={() => onMove(s)}>{s}</Menu.Item>
            ))}
          </Menu.Dropdown>
        </Menu>
      </Group>
      <Group justify="space-between" mt={8}>
        {issue.label ? <Badge size="xs" variant="light">{issue.label}</Badge> : <span />}
        {issue.assignee && <Avatar size={22} radius="xl" aria-label={`Assignee ${issue.assignee}`}>{issue.assignee}</Avatar>}
      </Group>
    </Card>
  );
}

function IssueBoardScreen() {
  const [issues, setIssues] = useState(seed);
  const [view, setView] = useState('board');
  const [palette, setPalette] = useState(false);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPalette(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  const move = (id: string, status: Status) => setIssues((all) => all.map((i) => (i.id === id ? { ...i, status } : i)));

  return (
    <Stack gap="md" p="md">
      <Group justify="space-between">
        <Stack gap={2}>
          <Breadcrumbs><Anchor href="#">Platform</Anchor><Text size="sm">Sprint 14</Text></Breadcrumbs>
          <Title order={2}>Sprint 14</Title>
        </Stack>
        <Group gap="sm">
          <Text size="xs" c="dimmed">Press <Kbd size="xs">⌘</Kbd> <Kbd size="xs">K</Kbd> for commands</Text>
          <SegmentedControl size="xs" value={view} onChange={setView} data={[{ label: 'Board', value: 'board' }, { label: 'List', value: 'list' }]} />
          <Button size="xs">New work item</Button>
        </Group>
      </Group>
      <SavedViews views={[{ id: 'all', name: 'All work' }, { id: 'mine', name: 'Assigned to me' }, { id: 'bugs', name: 'Bugs' }]} activeId="all" />
      <Box>
        <KanbanBoard aria-label="Sprint 14 board">
          {STATUSES.map((status) => (
            <KanbanColumn
              key={status}
              title={status}
              limit={status === 'In progress' ? 2 : undefined}
              actions={<IconButton variant="subtle" size="sm" aria-label={`Add to ${status}`}>+</IconButton>}
            >
              {issues.filter((i) => i.status === status).map((i) => (
                <IssueCard key={i.id} issue={i} onMove={(to) => move(i.id, to)} />
              ))}
            </KanbanColumn>
          ))}
        </KanbanBoard>
      </Box>
      <CommandPalette
        opened={palette}
        onClose={() => setPalette(false)}
        items={[
          { id: 'new', label: 'Create work item', group: 'Actions', shortcut: 'C', onSelect: () => {} },
          ...issues.filter((i) => i.status !== 'Done').map((i) => ({
            id: `done-${i.id}`, label: `Mark ${i.id} done`, group: 'Actions', keywords: [i.title], onSelect: () => move(i.id, 'Done'),
          })),
          { id: 'list', label: 'Switch to list view', group: 'View', onSelect: () => setView('list') },
          { id: 'board', label: 'Switch to board view', group: 'View', onSelect: () => setView('board') },
        ]}
      />
    </Stack>
  );
}

const meta: Meta = { title: 'Worked examples/Issue board' };
export default meta;
export const Screen: StoryObj = { render: () => <IssueBoardScreen /> };
