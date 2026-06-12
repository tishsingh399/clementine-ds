import { notifications, type NotificationData } from '@mantine/notifications';

export type ToastOptions = Omit<NotificationData, 'message'> & {
  message: React.ReactNode;
};

/**
 * Clementine Toast — transient, non-blocking status messages.
 * The outlet (`<Notifications />`) is mounted once inside ClementineDSProvider;
 * fire toasts from anywhere with these helpers. Spec: specs/toast/index.md
 *
 * Toast vs Alert: Alert persists inline in the layout; Toast appears over it
 * and dismisses itself. Pair destructive flows with `toast.undo(...)` instead
 * of a ConfirmDialog when the action is reversible.
 */
export const toast = {
  show: (opts: ToastOptions) => notifications.show(opts),
  success: (message: React.ReactNode, opts: Partial<ToastOptions> = {}) =>
    notifications.show({ message, color: 'green', ...opts }),
  error: (message: React.ReactNode, opts: Partial<ToastOptions> = {}) =>
    notifications.show({ message, color: 'red', autoClose: 8000, ...opts }),
  warning: (message: React.ReactNode, opts: Partial<ToastOptions> = {}) =>
    notifications.show({ message, color: 'orange', ...opts }),
  info: (message: React.ReactNode, opts: Partial<ToastOptions> = {}) =>
    notifications.show({ message, color: 'blue', ...opts }),
  /** Undo pattern: long-lived toast carrying the undo affordance in `message`. */
  undo: (message: React.ReactNode, opts: Partial<ToastOptions> = {}) =>
    notifications.show({ message, autoClose: 10000, withCloseButton: true, ...opts }),
  hide: (id: string) => notifications.hide(id),
  clean: () => notifications.clean(),
};
