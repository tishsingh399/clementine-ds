import {
  Modal as MantineModal,
  Group,
  Text,
  type ModalProps as MantineModalProps,
  type GroupProps,
  type TextProps,
} from '@mantine/core';

export interface ModalProps extends MantineModalProps {}

/**
 * Clementine Modal. Mantine owns the focus trap, Esc-to-close, focus return
 * and dialog ARIA; the theme paints it from modal.* tokens. See specs/modal.
 *
 * Compose: `title` for the heading, `ModalDescription` for supporting text,
 * your content, then `ModalFooter` for the decision buttons.
 */
export function Modal(props: ModalProps) {
  return <MantineModal {...props} />;
}

Modal.displayName = 'Modal';

/** Supporting text under the title, in modal.fg.secondary. */
export function ModalDescription({ children, ...props }: TextProps & { children?: React.ReactNode }) {
  return (
    <Text size="sm" c="var(--cds-modal-fg-secondary)" {...props}>
      {children}
    </Text>
  );
}

ModalDescription.displayName = 'ModalDescription';

/**
 * The decision row. Cancel first, then the action that commits, as in the
 * Clementine Figma specimen. Label the action with what it does
 * ("Revoke session"), not "Confirm".
 */
export function ModalFooter({ children, ...props }: GroupProps) {
  return (
    <Group gap="md" mt="lg" {...props}>
      {children}
    </Group>
  );
}

ModalFooter.displayName = 'ModalFooter';
