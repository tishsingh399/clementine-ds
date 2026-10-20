import type { Meta, StoryObj } from '@storybook/react';
import { JsonViewer } from '@clementine-ds/ui';

const payload = {
  tool: 'search_docs',
  args: { query: 'rotate api key', top_k: 5, filters: { space: 'eng', archived: false } },
  result: { hits: [{ id: 'doc-12', score: 0.82 }, { id: 'doc-40', score: 0.77 }], cursor: null },
};

const meta: Meta<typeof JsonViewer> = { title: 'Components/JsonViewer', component: JsonViewer, args: { data: payload } };
export default meta;
type Story = StoryObj<typeof JsonViewer>;

/** default + expanded: two levels open. */
export const Default: Story = {};
/** collapsed: only the root summary. */
export const Collapsed: Story = { args: { defaultExpandDepth: 0 } };
