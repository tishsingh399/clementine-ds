import { forwardRef, useCallback, useLayoutEffect, useRef, useState } from 'react';
import { useMergedRef } from '@mantine/hooks';
import {
  Tabs as MantineTabs,
  type TabsProps as MantineTabsProps,
  type TabsListProps as MantineTabsListProps,
  type TabsTabProps as MantineTabsTabProps,
  type TabsPanelProps as MantineTabsPanelProps,
} from '@mantine/core';

export interface TabsProps extends MantineTabsProps {}
export interface TabsListProps extends MantineTabsListProps {}
export interface TabsTabProps extends MantineTabsTabProps {}
export interface TabsPanelProps extends MantineTabsPanelProps {}

export const TabsTab = MantineTabs.Tab;
export const TabsPanel = MantineTabs.Panel;

type Side = 'start' | 'end';
const EDGE = 1; // px of sub-pixel slack before a side counts as hidden

const scrollBehavior = (): ScrollBehavior =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';

function Chevron({ side, hidden, onScroll }: { side: Side; hidden: boolean; onScroll: (side: Side) => void }) {
  return (
    <button
      type="button"
      className="cds-tabs-scroll"
      data-side={side}
      data-hidden={hidden || undefined}
      // Pointer-only: arrow keys already reach every tab (spec §2).
      tabIndex={-1}
      aria-hidden="true"
      onMouseDown={(e) => e.preventDefault()}
      onClick={() => onScroll(side)}
    >
      <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d={side === 'start' ? 'M10 3 5 8l5 5' : 'M6 3l5 5-5 5'} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

/**
 * Horizontal lists keep one row and scroll, with a chevron on each side that
 * has hidden tabs. Vertical lists render as Mantine's (the wrapper is
 * `display: contents`). Behaviour contract: specs/tabs/index.md §2.
 */
export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(function TabsList(props, ref) {
  const listRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const mergedRef = useMergedRef(ref, listRef);
  const [vertical, setVertical] = useState(false);
  const [hidden, setHidden] = useState({ start: false, end: false });

  const measure = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    // shortcut: Math.abs covers RTL's negative scrollLeft, but chevrons keep LTR arrows; revisit if RTL ships
    const left = Math.abs(el.scrollLeft);
    const next = { start: left > EDGE, end: left + el.clientWidth < el.scrollWidth - EDGE };
    setHidden((prev) => (prev.start === next.start && prev.end === next.end ? prev : next));
  }, []);

  const revealSelected = useCallback((behavior: ScrollBehavior) => {
    const el = scrollerRef.current;
    const tab = listRef.current?.querySelector<HTMLElement>('[role="tab"][aria-selected="true"]');
    if (!el || !tab) return;
    const box = el.getBoundingClientRect();
    const t = tab.getBoundingClientRect();
    const pad = parseFloat(getComputedStyle(el).paddingInlineEnd) || 0; // keep the focus-ring room
    if (t.left < box.left + pad) el.scrollBy({ left: t.left - box.left - pad, behavior });
    else if (t.right > box.right - pad) el.scrollBy({ left: t.right - box.right + pad, behavior });
  }, []);

  useLayoutEffect(() => {
    const list = listRef.current;
    const el = scrollerRef.current;
    if (!list || !el) return;
    const isVertical = list.getAttribute('aria-orientation') === 'vertical';
    setVertical(isVertical);
    if (isVertical) return;

    revealSelected('auto');
    measure();
    const resize = new ResizeObserver(measure);
    resize.observe(el);
    resize.observe(list);
    const selection = new MutationObserver(() => revealSelected(scrollBehavior()));
    selection.observe(list, { subtree: true, attributeFilter: ['aria-selected'] });
    el.addEventListener('scroll', measure, { passive: true });
    return () => {
      resize.disconnect();
      selection.disconnect();
      el.removeEventListener('scroll', measure);
    };
  }, [measure, revealSelected]);

  const scroll = (side: Side) => {
    const el = scrollerRef.current;
    if (!el) return;
    const step = el.clientWidth * 0.8;
    el.scrollBy({ left: side === 'start' ? -step : step, behavior: scrollBehavior() });
  };

  const overflowing = !vertical && (hidden.start || hidden.end);

  // The list only becomes scrollable once overflow styles apply, so reveal again then.
  useLayoutEffect(() => {
    if (!overflowing) return;
    revealSelected('auto');
    measure();
  }, [overflowing, revealSelected, measure]);

  return (
    <div
      className="cds-tabs-overflow"
      data-vertical={vertical || undefined}
      data-overflowing={overflowing || undefined}
    >
      {overflowing && <Chevron side="start" hidden={!hidden.start} onScroll={scroll} />}
      <div className="cds-tabs-scroller" ref={scrollerRef}>
        <MantineTabs.List ref={mergedRef} {...props} />
      </div>
      {overflowing && <Chevron side="end" hidden={!hidden.end} onScroll={scroll} />}
    </div>
  );
});

const TabsRoot = forwardRef<HTMLDivElement, TabsProps>(function Tabs(props, ref) {
  return <MantineTabs ref={ref} {...props} />;
});

/** `Tabs.List` is Clementine's overflow-aware list, so Mantine-style `<Tabs.List>` gets it too. */
export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Tab: MantineTabs.Tab,
  Panel: MantineTabs.Panel,
});
