import { Stack, Text, Checkbox, Group } from '@mantine/core';
import { forwardRef } from 'react';

export interface FacetOption {
  value: string;
  label: string;
  count?: number;
}
export interface FacetGroup {
  label: string;
  options: FacetOption[];
}
export interface FacetedFilterProps {
  groups: FacetGroup[];
  selected?: string[];
  onChange?: (value: string, checked: boolean) => void;
}

/**
 * Enterprise · FacetedFilter — grouped, checkable facets (with counts) for narrowing a
 * result set. Tokens: faceted-filter.* . Spec: specs/faceted-filter/index.md
 */
export const FacetedFilter = forwardRef<HTMLDivElement, FacetedFilterProps>(({ groups, selected = [], onChange }, ref) => (
  <Stack ref={ref} gap="lg" style={{ width: 220 }}>
    {groups.map((g) => (
      <Stack key={g.label} gap={6}>
        <Text size="xs" fw={700} style={{ textTransform: 'uppercase', color: 'var(--cds-text-tertiary)' }}>{g.label}</Text>
        {g.options.map((o) => (
          <Group key={o.value} justify="space-between" wrap="nowrap">
            <Checkbox
              size="sm"
              label={o.label}
              checked={selected.includes(o.value)}
              onChange={(e) => onChange?.(o.value, e.currentTarget.checked)}
            />
            {o.count != null && <Text size="xs" c="dimmed">{o.count}</Text>}
          </Group>
        ))}
      </Stack>
    ))}
  </Stack>
));

FacetedFilter.displayName = 'FacetedFilter';
