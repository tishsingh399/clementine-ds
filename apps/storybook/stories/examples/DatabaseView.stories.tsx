import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  Stack, Group, Title, Text, Button, SegmentedControl, SearchField, Table, TableThead, TableTbody, TableTr,
  TableTh, TableTd, Badge, Avatar, Checkbox, KanbanBoard, KanbanColumn, Card, Drawer, DescriptionList, Select,
} from '@clementine-ds/ui';

// Worked example — docs/worked-examples/database-view.md (pattern: docs + database workspaces)
interface Row { id: string; title: string; status: string; owner: string; tags: string[]; shipped: boolean }
const rows: Row[] = [
  { id: '1', title: 'Command palette', status: 'Shipped', owner: 'AL', tags: ['UI'], shipped: true },
  { id: '2', title: 'Trace tree', status: 'In review', owner: 'MK', tags: ['AI', 'UI'], shipped: false },
  { id: '3', title: 'Time range picker', status: 'Building', owner: 'JR', tags: ['UI'], shipped: false },
];
const STATUS = ['Building', 'In review', 'Shipped'];

function DatabaseViewScreen() {
  const [view, setView] = useState('table');
  const [open, setOpen] = useState<Row | null>(null);
  return (
    <Stack gap="md" p="md">
      <Group justify="space-between">
        <Title order={2}>Roadmap</Title>
        <Button size="xs">New</Button>
      </Group>
      <Group justify="space-between">
        <SegmentedControl size="xs" value={view} onChange={setView} data={[{ label: 'Table', value: 'table' }, { label: 'Board', value: 'board' }]} />
        <SearchField placeholder="Search roadmap" aria-label="Search roadmap" w={240} />
      </Group>
      {view === 'table' ? (
        <Table highlightOnHover>
          <TableThead><TableTr><TableTh>Name</TableTh><TableTh>Status</TableTh><TableTh>Owner</TableTh><TableTh>Tags</TableTh><TableTh>Shipped</TableTh></TableTr></TableThead>
          <TableTbody>
            {rows.map((r) => (
              <TableTr key={r.id}>
                <TableTd><Button variant="subtle" size="compact-sm" onClick={() => setOpen(r)}>{r.title}</Button></TableTd>
                <TableTd><Badge size="sm" variant="light">{r.status}</Badge></TableTd>
                <TableTd><Avatar size={22} radius="xl">{r.owner}</Avatar></TableTd>
                <TableTd><Group gap={4}>{r.tags.map((t) => <Badge key={t} size="xs" variant="outline">{t}</Badge>)}</Group></TableTd>
                <TableTd><Checkbox aria-label={`${r.title} shipped`} checked={r.shipped} readOnly /></TableTd>
              </TableTr>
            ))}
          </TableTbody>
        </Table>
      ) : (
        <KanbanBoard aria-label="Roadmap by status">
          {STATUS.map((s) => (
            <KanbanColumn key={s} title={s}>
              {rows.filter((r) => r.status === s).map((r) => (
                <Card key={r.id} padding="sm"><Text size="sm" fw={500}>{r.title}</Text></Card>
              ))}
            </KanbanColumn>
          ))}
        </KanbanBoard>
      )}
      <Text size="xs" c="dimmed">{rows.length} items</Text>
      {/* Opening a row = a Drawer with the page's properties, not a new route. */}
      <Drawer opened={!!open} onClose={() => setOpen(null)} position="right" title={open?.title}>
        {open && (
          <DescriptionList
            items={[
              { term: 'Status', detail: <Select variant="unstyled" size="sm" aria-label="Status" data={STATUS} defaultValue={open.status} /> },
              { term: 'Owner', detail: <Avatar size={22} radius="xl">{open.owner}</Avatar> },
              { term: 'Tags', detail: <Group gap={4}>{open.tags.map((t) => <Badge key={t} size="xs" variant="outline">{t}</Badge>)}</Group> },
            ]}
          />
        )}
      </Drawer>
    </Stack>
  );
}

const meta: Meta = { title: 'Worked examples/Database view' };
export default meta;
export const Screen: StoryObj = { render: () => <DatabaseViewScreen /> };
