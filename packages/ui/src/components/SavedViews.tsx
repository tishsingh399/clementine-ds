import { Group, Button } from '@mantine/core';
import { forwardRef } from 'react';

export interface SavedView {
  id: string;
  name: string;
}
export interface SavedViewsProps {
  views: SavedView[];
  activeId?: string;
  onSelect?: (id: string) => void;
  onSave?: () => void;
}

/**
 * Enterprise · SavedViews — switch between saved filter/column configurations, and save the
 * current one. Tokens: saved-views.* . Spec: specs/saved-views/index.md
 */
export const SavedViews = forwardRef<HTMLDivElement, SavedViewsProps>(({ views, activeId, onSelect, onSave }, ref) => (
  <Group ref={ref} gap="xs">
    {views.map((v) => (
      <Button
        key={v.id}
        size="xs"
        variant={v.id === activeId ? 'light' : 'subtle'}
        color={v.id === activeId ? 'blue' : 'gray'}
        aria-current={v.id === activeId ? 'true' : undefined}
        onClick={() => onSelect?.(v.id)}
      >
        {v.name}
      </Button>
    ))}
    {onSave && <Button size="xs" variant="default" onClick={onSave}>+ Save view</Button>}
  </Group>
));

SavedViews.displayName = 'SavedViews';
