import { Badge, Group, Text, UnstyledButton } from '@mantine/core';
import { useMemo, useRef, useState } from 'react';

export interface TraceSpan {
  id: string;
  name: string;
  /** Span kind shown as a badge, e.g. "agent", "llm", "tool", "retrieval". */
  type?: string;
  /** Start offset from the trace start, in ms. */
  start: number;
  /** Duration in ms. */
  duration: number;
  status?: 'ok' | 'error';
  children?: TraceSpan[];
}

export interface TraceTreeProps {
  spans: TraceSpan[];
  selectedId?: string;
  onSelect?: (span: TraceSpan) => void;
  'aria-label'?: string;
}

interface Row {
  span: TraceSpan;
  level: number;
  parentId?: string;
}

/** Rows a reader can see: a collapsed span hides its subtree. */
export function visibleSpanRows(spans: TraceSpan[], collapsed: Set<string>, level = 1, parentId?: string): Row[] {
  return spans.flatMap((span) => [
    { span, level, parentId },
    ...(span.children?.length && !collapsed.has(span.id) ? visibleSpanRows(span.children, collapsed, level + 1, span.id) : []),
  ]);
}

const traceEnd = (spans: TraceSpan[]): number =>
  Math.max(0, ...spans.map((s) => Math.max(s.start + s.duration, traceEnd(s.children ?? []))));

export const formatDuration = (ms: number) => (ms >= 1000 ? `${(ms / 1000).toFixed(2)}s` : `${Math.round(ms)}ms`);

/**
 * Clementine TraceTree — nested spans of one trace or agent run, each with a
 * waterfall bar on a shared time axis. A WAI-ARIA tree: arrows move, Left/Right
 * collapse/expand, Enter selects. Errors show in text, not only in bar colour.
 * Tokens: trace-tree.* . Spec: specs/trace-tree/index.md
 */
export function TraceTree({ spans, selectedId, onSelect, 'aria-label': label = 'Trace' }: TraceTreeProps) {
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());
  const rows = useMemo(() => visibleSpanRows(spans, collapsed), [spans, collapsed]);
  const total = useMemo(() => traceEnd(spans) || 1, [spans]);
  const [focusId, setFocusId] = useState<string | undefined>(selectedId);
  const refs = useRef(new Map<string, HTMLElement>());
  const tabStop = rows.some((r) => r.span.id === focusId) ? focusId : rows[0]?.span.id;

  const focus = (id?: string) => {
    if (!id) return;
    setFocusId(id);
    refs.current.get(id)?.focus();
  };
  const toggle = (id: string, open?: boolean) =>
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (open ?? next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const { span, parentId } = rows[i];
    const hasKids = !!span.children?.length;
    const isOpen = hasKids && !collapsed.has(span.id);
    const keys: Record<string, () => void> = {
      ArrowDown: () => focus(rows[i + 1]?.span.id),
      ArrowUp: () => focus(rows[i - 1]?.span.id),
      Home: () => focus(rows[0]?.span.id),
      End: () => focus(rows[rows.length - 1]?.span.id),
      ArrowRight: () => (hasKids && !isOpen ? toggle(span.id, true) : isOpen && focus(rows[i + 1]?.span.id)),
      ArrowLeft: () => (isOpen ? toggle(span.id, false) : focus(parentId)),
      Enter: () => onSelect?.(span),
      ' ': () => onSelect?.(span),
    };
    if (keys[e.key]) {
      e.preventDefault();
      keys[e.key]();
    }
  };

  return (
    <div role="tree" aria-label={label} style={{ color: 'var(--cds-trace-tree-fg)' }}>
      {rows.map(({ span, level }, i) => {
        const hasKids = !!span.children?.length;
        const selected = span.id === selectedId;
        const error = span.status === 'error';
        return (
          <div
            key={span.id}
            ref={(el) => {
              if (el) refs.current.set(span.id, el);
              else refs.current.delete(span.id);
            }}
            role="treeitem"
            aria-level={level}
            aria-expanded={hasKids ? !collapsed.has(span.id) : undefined}
            aria-selected={selected}
            tabIndex={span.id === tabStop ? 0 : -1}
            onKeyDown={(e) => onKeyDown(e, i)}
            onFocus={() => setFocusId(span.id)}
            onClick={() => onSelect?.(span)}
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1fr) 160px',
              alignItems: 'center',
              gap: 'var(--mantine-spacing-sm)',
              padding: 'calc(var(--mantine-spacing-xs) / 2) var(--mantine-spacing-xs)',
              cursor: 'pointer',
              borderRadius: 'var(--mantine-radius-sm)',
              background: selected ? 'var(--cds-trace-tree-row-bg-selected)' : undefined,
            }}
          >
            <Group gap={6} wrap="nowrap" style={{ minWidth: 0, paddingLeft: (level - 1) * 16 }}>
              {hasKids ? (
                <UnstyledButton
                  tabIndex={-1}
                  aria-hidden
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    toggle(span.id);
                  }}
                  style={{ width: 14, fontSize: 'var(--mantine-font-size-xs)', color: 'var(--cds-trace-tree-duration)' }}
                >
                  {collapsed.has(span.id) ? '▸' : '▾'}
                </UnstyledButton>
              ) : (
                <span style={{ width: 14, borderLeft: '1px solid var(--cds-trace-tree-guide)', alignSelf: 'stretch' }} />
              )}
              {span.type && (
                <Badge size="xs" variant="light" radius="sm">
                  {span.type}
                </Badge>
              )}
              <Text size="sm" truncate>
                {span.name}
              </Text>
              {error && (
                // Word in body colour: feedback.error text fails AA on the selected row; the bar carries the red.
                <Text size="xs" fw={700} style={{ color: 'var(--cds-trace-tree-fg)' }}>
                  ⚠ error
                </Text>
              )}
              <Text size="xs" ml="auto" style={{ color: 'var(--cds-trace-tree-duration)', whiteSpace: 'nowrap' }}>
                {formatDuration(span.duration)}
              </Text>
            </Group>
            <div aria-hidden style={{ position: 'relative', height: 8, background: 'var(--cds-trace-tree-track)', borderRadius: 'var(--mantine-radius-sm)' }}>
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: `${(span.start / total) * 100}%`,
                  width: `max(2px, ${(span.duration / total) * 100}%)`,
                  borderRadius: 'var(--mantine-radius-sm)',
                  background: error ? 'var(--cds-trace-tree-bar-error)' : 'var(--cds-trace-tree-bar)',
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

TraceTree.displayName = 'TraceTree';
