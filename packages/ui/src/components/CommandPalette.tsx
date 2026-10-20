import { TextInput, Group, Text, Kbd } from '@mantine/core';
import { useId, useMemo, useState } from 'react';
import { Modal } from './Modal';

export interface CommandItem {
  id: string;
  label: string;
  /** Group heading. Items keep the order they arrive in; groups appear in order of first item. */
  group?: string;
  /** Extra words that should match the query but aren't shown. */
  keywords?: string[];
  /** Shown as a keyboard hint, e.g. "G I". Display only — the palette does not bind it. */
  shortcut?: string;
  leftSection?: React.ReactNode;
  onSelect: () => void;
}

export interface CommandPaletteProps {
  opened: boolean;
  onClose: () => void;
  items: CommandItem[];
  placeholder?: string;
  /** Accessible name for the dialog. */
  label?: string;
  emptyLabel?: string;
}

/** Case-insensitive match on label and keywords. Exported for the worked examples. */
export function filterCommands(items: CommandItem[], query: string): CommandItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return items;
  return items.filter((i) => [i.label, ...(i.keywords ?? [])].some((s) => s.toLowerCase().includes(q)));
}

/**
 * Clementine CommandPalette — a ⌘K launcher: a search box over a grouped list of
 * actions. Combobox + listbox with aria-activedescendant, so focus stays in the
 * input while arrows move the highlight. Mantine Modal owns the focus trap and Esc.
 * Tokens: command-palette.* . Spec: specs/command-palette/index.md
 */
export function CommandPalette({
  opened,
  onClose,
  items,
  placeholder = 'Type a command or search…',
  label = 'Command palette',
  emptyLabel = 'No matching commands',
}: CommandPaletteProps) {
  const id = useId();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const results = useMemo(() => filterCommands(items, query), [items, query]);
  const groups = useMemo(() => {
    const map = new Map<string, CommandItem[]>();
    for (const item of results) map.set(item.group ?? '', [...(map.get(item.group ?? '') ?? []), item]);
    return [...map];
  }, [results]);
  // Keyboard order follows the grouped render order, not the input order.
  const ordered = groups.flatMap(([, g]) => g);
  const current = Math.min(active, ordered.length - 1);

  const close = () => {
    setQuery('');
    setActive(0);
    onClose();
  };
  const run = (item: CommandItem) => {
    close();
    item.onSelect();
  };
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!ordered.length) return;
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const step = e.key === 'ArrowDown' ? 1 : -1;
      setActive((current + step + ordered.length) % ordered.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      run(ordered[current]);
    }
  };

  const optionId = (item: CommandItem) => `${id}-opt-${item.id}`;

  return (
    <Modal
      opened={opened}
      onClose={close}
      withCloseButton={false}
      padding={0}
      size="lg"
      yOffset="12vh"
      aria-label={label}
      styles={{ content: { background: 'var(--cds-command-palette-bg)' } }}
    >
      <TextInput
        data-autofocus
        variant="unstyled"
        size="md"
        px="md"
        py={6}
        placeholder={placeholder}
        value={query}
        onChange={(e) => {
          setQuery(e.currentTarget.value);
          setActive(0);
        }}
        onKeyDown={onKeyDown}
        role="combobox"
        aria-label={label}
        aria-expanded
        aria-controls={`${id}-list`}
        aria-autocomplete="list"
        aria-activedescendant={ordered[current] ? optionId(ordered[current]) : undefined}
        style={{ borderBottom: '1px solid var(--cds-command-palette-border)' }}
      />
      <div id={`${id}-list`} role="listbox" aria-label={label} style={{ maxHeight: 360, overflowY: 'auto', padding: 'var(--mantine-spacing-xs)' }}>
        {ordered.length === 0 && (
          <Text size="sm" p="md" ta="center" style={{ color: 'var(--cds-command-palette-empty)' }}>
            {emptyLabel}
          </Text>
        )}
        {groups.map(([group, groupItems]) => (
            <div key={group} role="group" aria-labelledby={group ? `${id}-g-${group}` : undefined}>
              {group && (
                <Text
                  id={`${id}-g-${group}`}
                  size="xs"
                  fw={600}
                  px="sm"
                  pt={8}
                  pb={4}
                  style={{ color: 'var(--cds-command-palette-group-label)' }}
                >
                  {group}
                </Text>
              )}
              {groupItems.map((item) => {
                const isActive = item === ordered[current];
                return (
                  <Group
                    key={item.id}
                    id={optionId(item)}
                    role="option"
                    aria-selected={isActive}
                    justify="space-between"
                    wrap="nowrap"
                    gap="sm"
                    px="sm"
                    py={8}
                    onMouseEnter={() => setActive(ordered.indexOf(item))}
                    // mousedown keeps focus in the input
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => run(item)}
                    style={{
                      cursor: 'pointer',
                      borderRadius: 'var(--mantine-radius-sm)',
                      color: 'var(--cds-command-palette-item-fg)',
                      background: isActive ? 'var(--cds-command-palette-item-bg-active)' : undefined,
                    }}
                  >
                    <Group gap="sm" wrap="nowrap">
                      {item.leftSection}
                      <Text size="sm">{item.label}</Text>
                    </Group>
                    {item.shortcut && (
                      <Group gap={4} wrap="nowrap" aria-hidden style={{ color: 'var(--cds-command-palette-shortcut)' }}>
                        {item.shortcut.split(' ').map((k) => (
                          <Kbd key={k} size="xs">{k}</Kbd>
                        ))}
                      </Group>
                    )}
                  </Group>
                );
              })}
            </div>
        ))}
      </div>
    </Modal>
  );
}

CommandPalette.displayName = 'CommandPalette';
