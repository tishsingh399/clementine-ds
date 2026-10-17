import { forwardRef } from 'react';

export interface JsonViewerProps {
  /** Any JSON-like value: parsed tool input, model output, log fields. */
  data: unknown;
  /** Objects and arrays shallower than this start open. Default 2. */
  defaultExpandDepth?: number;
  'aria-label'?: string;
}

const tone = (v: unknown) =>
  typeof v === 'string'
    ? 'var(--cds-json-viewer-string)'
    : typeof v === 'number'
      ? 'var(--cds-json-viewer-number)'
      : 'var(--cds-json-viewer-literal)';

function Value({ value, depth, open, ancestors }: { value: unknown; depth: number; open: number; ancestors: object[] }) {
  if (value === null || typeof value !== 'object') {
    const text = typeof value === 'string' ? JSON.stringify(value) : value === undefined ? 'undefined' : String(value);
    return <span style={{ color: tone(value), wordBreak: 'break-word' }}>{text}</span>;
  }
  // Ancestors, not every object seen: a shared (non-circular) reference still renders.
  if (ancestors.includes(value)) return <span style={{ color: 'var(--cds-json-viewer-literal)' }}>[Circular]</span>;
  const isArray = Array.isArray(value);
  const entries = isArray ? value.map((v, i) => [String(i), v] as const) : Object.entries(value);
  const [o, c] = isArray ? ['[', ']'] : ['{', '}'];
  const punct = { color: 'var(--cds-json-viewer-punctuation)' };
  if (entries.length === 0) return <span style={punct}>{o + c}</span>;
  return (
    <details open={depth < open} style={{ display: 'inline' }}>
      <summary style={{ display: 'inline', cursor: 'pointer', ...punct }}>
        {o} <span>{isArray ? `${entries.length} items` : `${entries.length} keys`}</span>
      </summary>
      <div style={{ paddingLeft: 'var(--mantine-spacing-md)', borderLeft: '1px solid var(--cds-json-viewer-guide)' }}>
        {entries.map(([k, v]) => (
          <div key={k}>
            {!isArray && <span style={{ color: 'var(--cds-json-viewer-key)' }}>{k}</span>}
            {isArray && <span style={punct}>{k}</span>}
            <span style={punct}>: </span>
            <Value value={v} depth={depth + 1} open={open} ancestors={[...ancestors, value]} />
          </div>
        ))}
      </div>
      <span style={punct}>{c}</span>
    </details>
  );
}

/**
 * Clementine JsonViewer — read-only, collapsible JSON for tool inputs/outputs,
 * trace payloads and log fields. Built on native <details>, so every node is a
 * keyboard-operable disclosure with no script. Strings, numbers and literals
 * differ in colour and in syntax (quotes), never colour alone.
 * Tokens: json-viewer.* . Spec: specs/json-viewer/index.md
 */
export const JsonViewer = forwardRef<HTMLDivElement, JsonViewerProps>(
  ({ data, defaultExpandDepth = 2, 'aria-label': label = 'JSON' }, ref) => (
    <div
      ref={ref}
      role="group"
      aria-label={label}
      style={{
        fontFamily: 'var(--mantine-font-family-monospace)',
        fontSize: 'var(--mantine-font-size-xs)',
        lineHeight: 1.6,
        color: 'var(--cds-json-viewer-key)',
      }}
    >
      <Value value={data} depth={0} open={defaultExpandDepth} ancestors={[]} />
    </div>
  ),
);

JsonViewer.displayName = 'JsonViewer';
