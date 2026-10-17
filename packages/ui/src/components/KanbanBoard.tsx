import { Group, Stack, Text } from '@mantine/core';
import { Children, forwardRef, useId } from 'react';

export interface KanbanBoardProps {
  /** Accessible name for the board, e.g. "Sprint 14 board". */
  'aria-label': string;
  children: React.ReactNode;
}

export interface KanbanColumnProps {
  title: string;
  /** Status icon or dot shown before the title. */
  icon?: React.ReactNode;
  /** Work-in-progress limit. Over the limit, the count turns warning and says so in text. */
  limit?: number;
  /** Header actions (e.g. an add IconButton). */
  actions?: React.ReactNode;
  emptyLabel?: string;
  children?: React.ReactNode;
}

/**
 * Clementine KanbanBoard — columns of cards for work moving through stages.
 * Compose: KanbanBoard > KanbanColumn > Card. The board scrolls sideways; each
 * column is a labelled list, so a screen reader hears "Todo, list, 4 items".
 * shortcut: no drag-and-drop — move cards with a Menu ("Move to…") on the Card; add DnD once a keyboard-accessible library is chosen.
 * Tokens: kanban-board.* . Spec: specs/kanban-board/index.md
 */
export const KanbanBoard = forwardRef<HTMLDivElement, KanbanBoardProps>(({ children, ...props }, ref) => (
  <div
    ref={ref}
    role="group"
    aria-label={props['aria-label']}
    style={{ display: 'flex', gap: 'var(--mantine-spacing-sm)', alignItems: 'flex-start', overflowX: 'auto', paddingBottom: 'var(--mantine-spacing-xs)' }}
  >
    {children}
  </div>
));
KanbanBoard.displayName = 'KanbanBoard';

export const KanbanColumn = forwardRef<HTMLElement, KanbanColumnProps>(
  ({ title, icon, limit, actions, emptyLabel = 'No items', children }, ref) => {
    const id = useId();
    const cards = Children.toArray(children);
    const over = limit != null && cards.length > limit;
    return (
      <section
        ref={ref}
        aria-labelledby={id}
        style={{
          flex: '0 0 280px',
          background: 'var(--cds-kanban-board-column-bg)',
          border: '1px solid var(--cds-kanban-board-column-border)',
          borderRadius: 'var(--mantine-radius-md)',
          padding: 'var(--mantine-spacing-xs)',
        }}
      >
        <Group justify="space-between" wrap="nowrap" px={4} pb={8}>
          <Group gap={6} wrap="nowrap">
            {icon}
            <Text id={id} size="sm" fw={600} style={{ color: 'var(--cds-kanban-board-header-fg)' }}>
              {title}
            </Text>
            <Text
              size="sm"
              style={{ color: over ? 'var(--cds-kanban-board-over-limit)' : 'var(--cds-kanban-board-count)' }}
            >
              {limit != null ? `${cards.length} / ${limit}` : cards.length}
              {over && <span style={{ fontWeight: 600 }}> · over limit</span>}
            </Text>
          </Group>
          {actions}
        </Group>
        {cards.length === 0 ? (
          <Text size="sm" ta="center" py="lg" style={{ color: 'var(--cds-kanban-board-empty)' }}>
            {emptyLabel}
          </Text>
        ) : (
          <Stack component="ul" gap={8} m={0} p={0} style={{ listStyle: 'none' }} aria-labelledby={id}>
            {cards.map((card, i) => (
              <li key={i}>{card}</li>
            ))}
          </Stack>
        )}
      </section>
    );
  },
);
KanbanColumn.displayName = 'KanbanColumn';
