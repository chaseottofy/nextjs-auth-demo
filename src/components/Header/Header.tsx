'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link';

import Form from '@/components/Form/Form';
import CustomSkeleton from '../UI/Skeletons/CustomSkeleton';
import useModal from '@/hooks/useModal';
import Icons from '../Icons/Icons';
import { ThemeButton } from '../UI';

import styles from './Header.module.css';

export default function Header() {
  const { Logo } = Icons;
  const { showModal } = useModal();
  const [show, setShow] = useState(false);
  const [mounted, setMounted] = useState(false);

  const handleToggleForm = () => {
    setShow((prev) => !prev);
    showModal((onClose) => (
      <Form onClose={() => {
        setShow(false);
        onClose();
      }}
      />
    ));
  };

  useEffect(() => setMounted(true), []);

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <div className={styles.col1}>
          <Link href='/' className={styles.logo}>
            <Logo
              className={'svg-1'}
              style={{ fill: '#09090b' }}
            />
          </Link>
        </div>

        <div className={styles.col2}>
          <nav className={styles.nav}>
            <ul className={styles['nav-list']}>
              <li className={styles['nav-item']}>
                <Link
                  className={`${styles['nav-link']} link-1`}
                  href='/'
                  data-link-disabled
                  tabIndex={-1}
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className={styles.col3}>
          <button
            className={`${styles['log-in--btn']} btn-3`}
            disabled={show}
            type='button'
            onClick={handleToggleForm}
          >
            Log in
          </button>
          {
            mounted
              ? <ThemeButton className={`${styles['theme-btn--header']} btn-icon1`} />
              : <CustomSkeleton height={32} width={32} transparent={true} borderRadius={50} />
          }
        </div>
      </div>
    </header>
  );
}
