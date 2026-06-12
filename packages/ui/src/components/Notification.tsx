import { Notification as MantineNotification } from '@mantine/core';

export type { NotificationProps } from '@mantine/core';

/** Clementine Notification — A self-contained status card for transient feedback — the visual a toast system renders. Distinct from Alert (inline, persistent). Spec: specs/notification/index.md */
export const Notification: typeof MantineNotification = MantineNotification;
