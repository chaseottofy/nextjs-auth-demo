'use client';

import * as React from 'react';

import { ModalProps } from '@/models/interfaces';

import styles from './Modal.module.css';

const Modal: React.FC<ModalProps> = ({
  isOpen,
  content,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      {content(onClose)}
    </div>
  );
};

export default Modal;
