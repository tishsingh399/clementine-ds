import { Popover, Button, TextInput, UnstyledButton, Group, Stack, Text } from '@mantine/core';
import { useState } from 'react';

export interface TimeRange {
  /** Relative ("now-6h") or absolute ("2026-10-17 09:00") — the picker passes strings through; the app parses them. */
  from: string;
  to: string;
}

export interface QuickRange extends TimeRange {
  label: string;
}

export interface TimeRangePickerProps {
  value: TimeRange;
  onChange: (range: TimeRange) => void;
  quickRanges?: QuickRange[];
  /** Return an error message to block Apply, or null. Runs after the required-field check; shown under To. */
  validate?: (range: TimeRange) => string | null;
}

export const DEFAULT_QUICK_RANGES: QuickRange[] = [
  { label: 'Last 5 minutes', from: 'now-5m', to: 'now' },
  { label: 'Last 15 minutes', from: 'now-15m', to: 'now' },
  { label: 'Last 1 hour', from: 'now-1h', to: 'now' },
  { label: 'Last 6 hours', from: 'now-6h', to: 'now' },
  { label: 'Last 24 hours', from: 'now-24h', to: 'now' },
  { label: 'Last 7 days', from: 'now-7d', to: 'now' },
];

const same = (a: TimeRange, b: TimeRange) => a.from === b.from && a.to === b.to;

/**
 * Clementine TimeRangePicker — the "Last 6 hours ▾" control on dashboards, log and
 * trace explorers. A trigger opens quick ranges plus an absolute From/To form.
 * Tokens: time-range-picker.* . Spec: specs/time-range-picker/index.md
 */
export function TimeRangePicker({ value, onChange, quickRanges = DEFAULT_QUICK_RANGES, validate }: TimeRangePickerProps) {
  const [opened, setOpened] = useState(false);
  const [draft, setDraft] = useState<TimeRange>(value);
  const [errors, setErrors] = useState<{ from?: string; to?: string }>({});
  const match = quickRanges.find((r) => same(r, value));
  const triggerLabel = match?.label ?? `${value.from} → ${value.to}`;

  const commit = (range: TimeRange) => {
    onChange(range);
    setOpened(false);
  };
  const apply = () => {
    const range = { from: draft.from.trim(), to: draft.to.trim() };
    const next = {
      from: range.from ? undefined : 'Required',
      to: range.to ? (range.from ? validate?.(range) ?? undefined : undefined) : 'Required',
    };
    setErrors(next);
    if (!next.from && !next.to) commit(range);
  };

  return (
    <Popover
      opened={opened}
      onChange={setOpened}
      position="bottom-end"
      shadow="md"
      onOpen={() => {
        setDraft(value);
        setErrors({});
      }}
    >
      <Popover.Target>
        <Button
          variant="default"
          size="xs"
          onClick={() => setOpened((o) => !o)}
          aria-label={`Time range: ${triggerLabel}`}
          rightSection={<span aria-hidden>▾</span>}
          style={{ color: 'var(--cds-time-range-picker-trigger-fg)' }}
        >
          {triggerLabel}
        </Button>
      </Popover.Target>
      <Popover.Dropdown p={0}>
        <Group align="stretch" gap={0} wrap="nowrap">
          <Stack
            component="form"
            gap="xs"
            p="sm"
            w={220}
            onSubmit={(e: React.FormEvent) => {
              e.preventDefault();
              apply();
            }}
            style={{ borderRight: '1px solid var(--cds-time-range-picker-divider)' }}
          >
            <Text size="xs" fw={600} style={{ color: 'var(--cds-time-range-picker-label)' }}>
              Absolute range
            </Text>
            <TextInput
              size="xs"
              label="From"
              value={draft.from}
              onChange={(e) => setDraft({ ...draft, from: e.currentTarget.value })}
              error={errors.from}
            />
            <TextInput
              size="xs"
              label="To"
              value={draft.to}
              onChange={(e) => setDraft({ ...draft, to: e.currentTarget.value })}
              error={errors.to}
            />
            <Button type="submit" size="xs">
              Apply range
            </Button>
          </Stack>
          <Stack gap={0} p={4} w={180} role="group" aria-label="Quick ranges">
            {quickRanges.map((r) => {
              const selected = same(r, value);
              return (
                <UnstyledButton
                  key={r.label}
                  aria-pressed={selected}
                  onClick={() => commit({ from: r.from, to: r.to })}
                  px="sm"
                  py={6}
                  style={{
                    fontSize: 'var(--mantine-font-size-sm)',
                    borderRadius: 'var(--mantine-radius-sm)',
                    color: 'var(--cds-time-range-picker-option-fg)',
                    background: selected ? 'var(--cds-time-range-picker-option-bg-active)' : undefined,
                  }}
                >
                  {r.label}
                </UnstyledButton>
              );
            })}
          </Stack>
        </Group>
      </Popover.Dropdown>
    </Popover>
  );
}

TimeRangePicker.displayName = 'TimeRangePicker';
