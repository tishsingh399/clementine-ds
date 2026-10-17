import type { Meta, StoryObj } from '@storybook/react';
import { KanbanBoard, KanbanColumn, Card, Text, Badge, Group } from '@clementine-ds/ui';

const Item = ({ id, title, label }: { id: string; title: string; label?: string }) => (
  <Card padding="sm">
    <Text size="xs" c="dimmed">{id}</Text>
    <Text size="sm" fw={500}>{title}</Text>
    {label && <Group mt={6}><Badge size="xs" variant="light">{label}</Badge></Group>}
  </Card>
);

const meta: Meta<typeof KanbanBoard> = { title: 'Components/KanbanBoard', component: KanbanBoard };
export default meta;
type Story = StoryObj<typeof KanbanBoard>;

/** default, empty column and over-limit column in one board. */
export const Default: Story = {
  render: () => (
    <KanbanBoard aria-label="Sprint board">
      <KanbanColumn title="Todo">
        <Item id="WRK-101" title="Remove UI inconsistencies" label="Design" />
        <Item id="WRK-102" title="Upgrade build toolchain" label="Infra" />
      </KanbanColumn>
      <KanbanColumn title="In progress" limit={2}>
        <Item id="WRK-097" title="Launch page assets" />
        <Item id="WRK-098" title="Prevent duplicate requests" label="Bug" />
        <Item id="WRK-099" title="Fix timezone in exports" label="Bug" />
      </KanbanColumn>
      <KanbanColumn title="Done" />
    </KanbanBoard>
  ),
};
/** empty: a column with no cards. */
export const Empty: Story = {
  render: () => (
    <KanbanBoard aria-label="Empty board">
      <KanbanColumn title="Backlog" emptyLabel="Nothing in the backlog" />
    </KanbanBoard>
  ),
};
/** over-limit: more cards than the WIP limit. */
export const OverLimit: Story = {
  render: () => (
    <KanbanBoard aria-label="Board over limit">
      <KanbanColumn title="Review" limit={1}>
        <Item id="WRK-120" title="Audit permissions copy" />
        <Item id="WRK-121" title="Session timeout dialog" />
      </KanbanColumn>
    </KanbanBoard>
  ),
};
