import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { TraceTree, type TraceSpan } from '@clementine-ds/ui';

const sampleTrace: TraceSpan[] = [
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

function Demo({ initial, spans = sampleTrace }: { initial?: string; spans?: TraceSpan[] }) {
  const [selected, setSelected] = useState(initial);
  return <TraceTree spans={spans} selectedId={selected} onSelect={(s) => setSelected(s.id)} aria-label="Agent run" />;
}

const meta: Meta<typeof TraceTree> = { title: 'Components/TraceTree', component: TraceTree };
export default meta;
type Story = StoryObj<typeof TraceTree>;

/** default + expanded: every span visible, one has an error. */
export const Default: Story = { render: () => <Demo /> };
/** selected: a span is selected (as when its detail is open). */
export const Selected: Story = { render: () => <Demo initial="search" /> };
/** collapsed: a span with no children loaded yet reads as a leaf; press ← on an open span to collapse it. */
export const Collapsed: Story = { render: () => <Demo spans={[{ ...sampleTrace[0], children: sampleTrace[0].children!.slice(0, 1) }]} /> };
