import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  Box, Group, Stack, Title, Text, Select, Button, Card, Stat, AreaChart, InlineMessage,
  Accordion, AccordionItem, AccordionControl, AccordionPanel, TimeRangePicker, Table, TableThead,
  TableTbody, TableTr, TableTh, TableTd, StatusDot, type TimeRange,
} from '@clementine-ds/ui';

// Worked example — docs/worked-examples/metrics-dashboard.md (pattern: observability dashboards)
const cpu = ['09:00', '09:10', '09:20', '09:30', '09:40', '09:50'].map((t, i) => ({ t, 'api-1': 32 + i * 4, 'api-2': 28 + ((i * 7) % 15) }));
const series = [{ name: 'api-1', color: 'blue.6' }, { name: 'api-2', color: 'green.6' }];

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card padding="md" style={{ flex: '1 1 320px', minWidth: 0 }}>
      <Text size="sm" fw={600} mb="sm">{title}</Text>
      {children}
    </Card>
  );
}

function MetricsDashboardScreen() {
  const [range, setRange] = useState<TimeRange>({ from: 'now-1h', to: 'now' });
  const [cluster, setCluster] = useState<string | null>('prod-eu');
  const [refresh, setRefresh] = useState<string | null>('30s');
  return (
    <Stack gap="md" p="md">
      <Group justify="space-between" wrap="wrap">
        <Title order={2}>Service health</Title>
        <Group gap="xs">
          <TimeRangePicker value={range} onChange={setRange} />
          <Select size="xs" w={90} aria-label="Auto-refresh" data={['Off', '10s', '30s', '1m']} value={refresh} onChange={setRefresh} />
          <Button size="xs" variant="default">Share</Button>
        </Group>
      </Group>
      {/* Dashboard variables: labelled Selects in one row, values feed every panel's query. */}
      <Group gap="sm">
        <Select size="xs" w={160} label="Cluster" data={['prod-eu', 'prod-us', 'staging']} value={cluster} onChange={setCluster} />
        <Select size="xs" w={160} label="Service" data={['All', 'api', 'worker']} defaultValue="All" />
      </Group>
      <Accordion multiple defaultValue={['overview', 'compute']} variant="separated">
        <AccordionItem value="overview">
          <AccordionControl>Overview</AccordionControl>
          <AccordionPanel>
            <Group gap={48}>
              <Stat label="Requests / s" value="1,284" delta="+6%" trend="up" />
              <Stat label="Error rate" value="0.42%" delta="+0.1pt" trend="down" />
              <Stat label="p95 latency" value="182 ms" />
            </Group>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="compute">
          <AccordionControl>Compute</AccordionControl>
          <AccordionPanel>
            <Group align="stretch" gap="md">
              <Panel title="CPU usage (%)">
                <AreaChart h={180} data={cpu} dataKey="t" series={series} />
              </Panel>
              <Panel title="Memory quota">
                {/* A panel whose query failed: say so inside the panel, keep the rest of the page working. */}
                <InlineMessage status="error">Query failed: data source timed out after 30s.</InlineMessage>
              </Panel>
              <Box style={{ flex: '1 1 100%' }}>
                <Panel title="Pods">
                  <Table>
                    <TableThead><TableTr><TableTh>Pod</TableTh><TableTh>Status</TableTh><TableTh>CPU</TableTh></TableTr></TableThead>
                    <TableTbody>
                      <TableTr><TableTd>api-1</TableTd><TableTd><StatusDot status="online" label="Running" /></TableTd><TableTd>54%</TableTd></TableTr>
                      <TableTr><TableTd>api-2</TableTd><TableTd><StatusDot status="away" label="Throttled" /></TableTd><TableTd>91%</TableTd></TableTr>
                    </TableTbody>
                  </Table>
                </Panel>
              </Box>
            </Group>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Stack>
  );
}

const meta: Meta = { title: 'Worked examples/Metrics dashboard' };
export default meta;
export const Screen: StoryObj = { render: () => <MetricsDashboardScreen /> };
