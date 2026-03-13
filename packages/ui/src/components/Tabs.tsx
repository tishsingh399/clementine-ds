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

export const Tabs = MantineTabs;
export const TabsList = MantineTabs.List;
export const TabsTab = MantineTabs.Tab;
export const TabsPanel = MantineTabs.Panel;
