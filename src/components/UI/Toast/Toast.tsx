import * as React from 'react';
import { useState } from 'react';

import {
  useClickOutside,
  useTimeout,
} from '@/hooks/index';

import styles from './Toast.module.css';

export default function Toast({
  title,
  onClick,
  timeout = 2_000,
}: {
  title: string;
  onClick: () => void;
  timeout?: number;
}) {
  const [isActive, setIsActive] = useState(true);
  const [fadeout, setFadeout] = useState(false);
  const [fadeoutFinished, setFadeoutFinished] = useState(false);
  const modalRef = useClickOutside(onClick) as React.MutableRefObject<HTMLDivElement>;

  const handleFadeout = () => {
    setFadeout(true);
  };

  const handleDestroy = () => {
    setFadeoutFinished(true);
    setIsActive(false);
    onClick();
  };

  useTimeout(handleFadeout, timeout - 500);
  useTimeout(handleDestroy, timeout - 250);

  if (!isActive) {
    setIsActive(true);
    return null;
  }

  return (
    <div
      className={styles.toast}
      data-fade-out={fadeout}
      data-fade-finished={fadeoutFinished}
      ref={modalRef}
    >
      <button
        type='button'
        className={styles.message}
        onClick={onClick}
      >
        {title}
      </button>
    </div>
  );
}
