import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabsList, TabsTab, TabsPanel } from '@clementine-ds/ui';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline', 'pills'],
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
  args: {
    defaultValue: 'overview',
    variant: 'default',
    orientation: 'horizontal',
  },
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTab value="overview">Overview</TabsTab>
        <TabsTab value="sessions">Sessions</TabsTab>
        <TabsTab value="audit">Audit Log</TabsTab>
      </TabsList>
      <TabsPanel value="overview" pt="md">Overview content</TabsPanel>
      <TabsPanel value="sessions" pt="md">Sessions content</TabsPanel>
      <TabsPanel value="audit" pt="md">Audit log content</TabsPanel>
    </Tabs>
  ),
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  // Tabs that fit get no scroll controls and no reserved space (spec §2).
  play: async ({ canvasElement }) => {
    check(!canvasElement.querySelector('.cds-tabs-scroll'), 'a list that fits shows no chevrons');
  },
};

export const Outline: Story = {
  args: { variant: 'outline' },
};

export const Pills: Story = {
  args: { variant: 'pills' },
};

export const Vertical: Story = {
  args: { orientation: 'vertical' },
};

export const WithDisabledTab: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTab value="overview">Overview</TabsTab>
        <TabsTab value="sessions">Sessions</TabsTab>
        <TabsTab value="audit" disabled>Audit Log</TabsTab>
      </TabsList>
      <TabsPanel value="overview" pt="md">Overview content</TabsPanel>
      <TabsPanel value="sessions" pt="md">Sessions content</TabsPanel>
      <TabsPanel value="audit" pt="md">Audit log content</TabsPanel>
    </Tabs>
  ),
};

// ── Overflow (specs/tabs/index.md §2) ──────────────────────────────────

function check(ok: unknown, message: string): asserts ok {
  if (!ok) throw new Error(`Tabs overflow: ${message}`);
}

async function until(test: () => boolean, message: string, ms = 2000) {
  const end = Date.now() + ms;
  while (!test()) {
    if (Date.now() > end) throw new Error(`Tabs overflow: timed out waiting until ${message}`);
    await new Promise((r) => setTimeout(r, 50));
  }
}

const inView = (tab: Element, scroller: Element) => {
  const t = tab.getBoundingClientRect();
  const s = scroller.getBoundingClientRect();
  return t.left >= s.left - 1 && t.right <= s.right + 1;
};

const manyTabs = [
  'Overview', 'Tasks', 'Activity', 'Settings', 'Members', 'Billing',
  'Integrations and webhooks for external services', 'Audit log', 'Sessions',
  'API keys', 'Notifications', 'Danger zone',
];
const slug = (label: string) => label.toLowerCase().replace(/[^a-z]+/g, '-');

export const Overflow: Story = {
  args: { defaultValue: slug('Danger zone') },
  render: (args) => (
    <div style={{ width: 360, maxWidth: '100%' }}>
      <Tabs {...args}>
        <TabsList>
          {manyTabs.map((label) => (
            <TabsTab key={label} value={slug(label)} disabled={label === 'Billing'}>
              {label}
            </TabsTab>
          ))}
        </TabsList>
        {manyTabs.map((label) => (
          <TabsPanel key={label} value={slug(label)} pt="md">
            {label} content
          </TabsPanel>
        ))}
      </Tabs>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const scroller = canvasElement.querySelector<HTMLElement>('.cds-tabs-scroller');
    const tabs = [...canvasElement.querySelectorAll<HTMLElement>('[role="tab"]')];
    check(scroller && tabs.length === manyTabs.length, 'renders the list inside the scroller');

    const tops = new Set(tabs.map((t) => t.offsetTop));
    check(tops.size === 1, `all tabs stay on one row (found ${tops.size} rows)`);

    const selected = tabs.find((t) => t.getAttribute('aria-selected') === 'true');
    check(selected?.textContent === 'Danger zone', 'the last tab starts selected');
    await until(() => inView(selected, scroller), 'the selected tab is scrolled into view');

    const start = canvasElement.querySelector<HTMLElement>('.cds-tabs-scroll[data-side="start"]');
    const end = canvasElement.querySelector<HTMLElement>('.cds-tabs-scroll[data-side="end"]');
    check(start && end, 'both chevron slots render while overflowing');
    for (const chevron of [start, end]) {
      check(chevron.getAttribute('aria-hidden') === 'true', 'chevrons are hidden from assistive tech');
      check(chevron.tabIndex === -1, 'chevrons are not in the tab order');
    }
    await until(() => getComputedStyle(start).visibility === 'visible', 'the start chevron shows (tabs hidden on the left)');
    await until(() => getComputedStyle(end).visibility === 'hidden', 'the end chevron hides (nothing hidden on the right)');

    const before = scroller.scrollLeft;
    start.click();
    await until(() => scroller.scrollLeft < before - 50, 'the start chevron scrolls the list back');
    check(document.activeElement !== start, 'clicking a chevron does not move focus to it');

    // Keyboard: ArrowRight from the last tab wraps to the first, which must scroll into view.
    scroller.scrollLeft = scroller.scrollWidth;
    selected.focus();
    selected.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    await until(() => tabs[0].getAttribute('aria-selected') === 'true', 'ArrowRight wraps to the first tab');
    await until(() => inView(tabs[0], scroller), 'the newly selected first tab scrolls into view');
  },
};
