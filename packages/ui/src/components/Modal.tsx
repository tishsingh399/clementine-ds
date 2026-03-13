import { Modal as MantineModal, type ModalProps as MantineModalProps } from '@mantine/core';

export interface ModalProps extends MantineModalProps {}

export function Modal(props: ModalProps) {
  return <MantineModal {...props} />;
}

Modal.displayName = 'Modal';
