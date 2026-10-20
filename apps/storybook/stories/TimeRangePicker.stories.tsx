import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { TimeRangePicker, Text, type TimeRange } from '@clementine-ds/ui';

function Demo({ initial = { from: 'now-6h', to: 'now' } }: { initial?: TimeRange }) {
  const [range, setRange] = useState<TimeRange>(initial);
  return (
    <>
      <TimeRangePicker value={range} onChange={setRange} />
      <Text size="sm" mt="sm">from={range.from} to={range.to}</Text>
    </>
  );
}

const meta: Meta<typeof TimeRangePicker> = { title: 'Components/TimeRangePicker', component: TimeRangePicker };
export default meta;
type Story = StoryObj<typeof TimeRangePicker>;

/** default + selected-range: a quick range is active. Click to open. */
export const Default: Story = { render: () => <Demo /> };
/** absolute: a custom range shows "from → to" on the trigger. */
export const Absolute: Story = { render: () => <Demo initial={{ from: '2026-10-17 09:00', to: '2026-10-17 12:00' }} /> };
/** invalid: clear From and press Apply to see the required-field error. */
export const Invalid: Story = { render: () => <Demo initial={{ from: '', to: 'now' }} /> };
