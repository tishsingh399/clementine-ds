import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { CommandPalette, Button, Text, type CommandItem } from '@clementine-ds/ui';

const items: CommandItem[] = [
  { id: 'new', label: 'Create work item', group: 'Actions', shortcut: 'C', onSelect: () => {} },
  { id: 'assign', label: 'Assign to me', group: 'Actions', shortcut: 'I', onSelect: () => {} },
  { id: 'status', label: 'Change status…', group: 'Actions', shortcut: 'S', keywords: ['state', 'move'], onSelect: () => {} },
  { id: 'inbox', label: 'Go to inbox', group: 'Navigation', shortcut: 'G I', onSelect: () => {} },
  { id: 'board', label: 'Go to board', group: 'Navigation', shortcut: 'G B', onSelect: () => {} },
  { id: 'theme', label: 'Switch theme', group: 'Settings', keywords: ['dark', 'light'], onSelect: () => {} },
];

function Demo({ initiallyOpen = true, list = items }: { initiallyOpen?: boolean; list?: CommandItem[] }) {
  const [opened, setOpened] = useState(initiallyOpen);
  const [last, setLast] = useState('');
  return (
    <>
      <Button onClick={() => setOpened(true)}>Open palette (⌘K)</Button>
      {last && <Text size="sm" mt="sm">Ran: {last}</Text>}
      <CommandPalette
        opened={opened}
        onClose={() => setOpened(false)}
        items={list.map((i) => ({ ...i, onSelect: () => setLast(i.label) }))}
      />
    </>
  );
}

const meta: Meta<typeof CommandPalette> = { title: 'Components/CommandPalette', component: CommandPalette };
export default meta;
type Story = StoryObj<typeof CommandPalette>;

/** default + open: palette open, first result highlighted. */
export const Default: Story = { render: () => <Demo /> };
/** closed: only the trigger. */
export const Closed: Story = { render: () => <Demo initiallyOpen={false} /> };
/** empty: no command matches the query. */
export const Empty: Story = { render: () => <Demo list={[]} /> };
/** open + active-item: arrows move the highlighted option (aria-activedescendant); the first match starts active. */
export const ActiveItem: Story = { render: () => <Demo list={items.filter((i) => i.group === 'Navigation')} /> };
