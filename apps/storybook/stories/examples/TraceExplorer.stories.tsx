import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  Flex, Box, Group, Stack, Title, Text, SearchField, FacetedFilter, TimeRangePicker, Table, TableThead,
  TableTbody, TableTr, TableTh, TableTd, Badge, Card, TraceTree, JsonViewer, CostMeter, Tabs, TabsList,
  TabsTab, TabsPanel, Divider, formatDuration, type TraceSpan, type TimeRange,
} from '@clementine-ds/ui';

// Worked example — docs/worked-examples/trace-explorer.md (pattern: LLM tracing tools)
const trace: TraceSpan[] = [
  {
    id: 'run', name: 'answer_question', type: 'agent', start: 0, duration: 4120,
    children: [
      { id: 'plan', name: 'plan', type: 'llm', start: 20, duration: 910 },
      {
        id: 'search', name: 'search_docs', type: 'tool', start: 950, duration: 1300,
        children: [
          { id: 'embed', name: 'embed_query', type: 'llm', start: 960, duration: 180 },
          { id: 'vec', name: 'vector_search', type: 'retrieval', start: 1150, duration: 1080, status: 'error' },
        ],
      },
      { id: 'write', name: 'compose_answer', type: 'llm', start: 2280, duration: 1820 },
    ],
  },
];
const io: Record<string, { input: unknown; output: unknown; tokens?: string; cost?: string }> = {
  run: { input: { question: 'How do I rotate an API key?' }, output: { answer: 'Open Settings → Keys…', sources: 2 }, tokens: '3,412', cost: '$0.021' },
  plan: { input: { messages: 2 }, output: { steps: ['search_docs', 'compose_answer'] }, tokens: '640', cost: '$0.004' },
  search: { input: { query: 'rotate api key', top_k: 5 }, output: { hits: 2 } },
  embed: { input: { text: 'rotate api key' }, output: { dims: 1536 }, tokens: '6', cost: '$0.000' },
  vec: { input: { index: 'docs', top_k: 5 }, output: { error: 'timeout after 1000ms', retried: true } },
  write: { input: { context_docs: 2 }, output: { answer: 'Open Settings → Keys…' }, tokens: '2,766', cost: '$0.017' },
};
const find = (spans: TraceSpan[], id: string): TraceSpan | undefined =>
  spans.reduce<TraceSpan | undefined>((hit, s) => hit ?? (s.id === id ? s : find(s.children ?? [], id)), undefined);

function TraceExplorerScreen() {
  const [range, setRange] = useState<TimeRange>({ from: 'now-24h', to: 'now' });
  const [types, setTypes] = useState<string[]>(['agent']);
  const [selected, setSelected] = useState('run');
  const span = find(trace, selected)!;
  const d = io[selected];
  return (
    <Stack gap="md" p="md">
      <Group justify="space-between">
        <Title order={2}>Traces</Title>
        <TimeRangePicker value={range} onChange={setRange} />
      </Group>
      <SearchField placeholder="Filter traces, e.g. level:error latency:>2s" aria-label="Filter traces" />
      <Flex gap="md" align="flex-start">
        <FacetedFilter
          groups={[
            { label: 'Type', options: [{ value: 'agent', label: 'Agent', count: 418 }, { value: 'llm', label: 'LLM', count: 1203 }] },
            { label: 'Level', options: [{ value: 'error', label: 'Error', count: 12 }, { value: 'default', label: 'Default', count: 1609 }] },
          ]}
          selected={types}
          onChange={(v, on) => setTypes((t) => (on ? [...t, v] : t.filter((x) => x !== v)))}
        />
        <Stack gap="md" style={{ flex: 1, minWidth: 0 }}>
          <Table highlightOnHover>
            <TableThead><TableTr><TableTh>Started</TableTh><TableTh>Name</TableTh><TableTh>Latency</TableTh><TableTh>Status</TableTh></TableTr></TableThead>
            <TableTbody>
              <TableTr><TableTd>14:57:16</TableTd><TableTd>answer_question</TableTd><TableTd>4.12s</TableTd><TableTd><Badge size="xs" color="red" variant="light">1 error</Badge></TableTd></TableTr>
              <TableTr><TableTd>14:56:38</TableTd><TableTd>answer_question</TableTd><TableTd>2.31s</TableTd><TableTd><Badge size="xs" color="green" variant="light">ok</Badge></TableTd></TableTr>
            </TableTbody>
          </Table>
          <Card padding="md">
            <Flex gap="md" align="flex-start" wrap="wrap">
              <Box style={{ flex: '1 1 420px', minWidth: 0 }}>
                <Text size="sm" fw={600} mb="xs">answer_question · 14:57:16</Text>
                <TraceTree spans={trace} selectedId={selected} onSelect={(s) => setSelected(s.id)} aria-label="Spans in trace" />
              </Box>
              <Divider orientation="vertical" />
              <Stack gap="sm" style={{ flex: '1 1 320px', minWidth: 0 }}>
                <Group gap="xs">
                  <Text fw={600}>{span.name}</Text>
                  {span.type && <Badge size="xs" variant="light">{span.type}</Badge>}
                </Group>
                <CostMeter latency={formatDuration(span.duration)} tokens={d.tokens} cost={d.cost} />
                <Tabs defaultValue="io">
                  <TabsList><TabsTab value="io">Input / output</TabsTab><TabsTab value="meta">Metadata</TabsTab></TabsList>
                  <TabsPanel value="io" pt="sm">
                    <Stack gap="sm">
                      <Text size="xs" fw={700} c="dimmed">INPUT</Text>
                      <JsonViewer data={d.input} aria-label="Span input" />
                      <Text size="xs" fw={700} c="dimmed">OUTPUT</Text>
                      <JsonViewer data={d.output} aria-label="Span output" />
                    </Stack>
                  </TabsPanel>
                  <TabsPanel value="meta" pt="sm">
                    <JsonViewer data={{ id: span.id, start_ms: span.start, status: span.status ?? 'ok' }} aria-label="Span metadata" />
                  </TabsPanel>
                </Tabs>
              </Stack>
            </Flex>
          </Card>
        </Stack>
      </Flex>
    </Stack>
  );
}

const meta: Meta = { title: 'Worked examples/Trace explorer' };
export default meta;
export const Screen: StoryObj = { render: () => <TraceExplorerScreen /> };
