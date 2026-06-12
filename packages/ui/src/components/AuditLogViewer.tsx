import { Table, Text } from '@mantine/core';
import { forwardRef } from 'react';

export interface AuditEntry {
  id: string;
  actor: string;
  action: string;
  target: string;
  when: string;
}
export interface AuditLogViewerProps {
  entries: AuditEntry[];
}

/**
 * Enterprise · AuditLogViewer — a chronological, attributable record of actions (who did
 * what to what, when). Core to attribution & auditability. Tokens: audit-log.* .
 * Spec: specs/audit-log-viewer/index.md
 */
export const AuditLogViewer = forwardRef<HTMLTableElement, AuditLogViewerProps>(({ entries }, ref) => (
  <Table ref={ref} striped withTableBorder>
    <Table.Thead>
      <Table.Tr>
        <Table.Th>When</Table.Th>
        <Table.Th>Actor</Table.Th>
        <Table.Th>Action</Table.Th>
        <Table.Th>Target</Table.Th>
      </Table.Tr>
    </Table.Thead>
    <Table.Tbody>
      {entries.map((e) => (
        <Table.Tr key={e.id}>
          <Table.Td><Text size="xs" c="dimmed" ff="monospace">{e.when}</Text></Table.Td>
          <Table.Td><Text size="sm">{e.actor}</Text></Table.Td>
          <Table.Td><Text size="sm">{e.action}</Text></Table.Td>
          <Table.Td><Text size="sm" ff="monospace">{e.target}</Text></Table.Td>
        </Table.Tr>
      ))}
    </Table.Tbody>
  </Table>
));

AuditLogViewer.displayName = 'AuditLogViewer';
