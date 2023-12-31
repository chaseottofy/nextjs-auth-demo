'use client';

import React from 'react';

import type { ModalProps } from '@/models/interfaces';

import styles from './Modal.module.css';

export default function Modal({
  isOpen,
  content,
  onClose,
  isUnset = false,
}: ModalProps) {
  if (!isOpen) return null;
  return (
    <div
      className={styles.modal}
      data-modal-unset={isUnset}
    >
      {content(onClose)}
    </div>
  );
}
