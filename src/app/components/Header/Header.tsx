'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTheme as useNextTheme } from 'next-themes';

import Form from '@/components/Form/Form';
import ButtonSkeleton from '@/components/UI/Skeletons/ButtonSkeleton';
import useModal from '@/hooks/useModal';
import Icons from '../Icons';
import { ThemeButton } from '../UI';

import styles from './Header.module.css';

export default function Header() {
  const { Moon, Logo } = Icons;
  const { theme, setTheme } = useNextTheme();
  const [mounted, setMounted] = useState(false);
  const { showModal } = useModal();
  const [show, setShow] = useState(false);

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
            <Logo className='svg-1' />
          </Link>
        </div>

        <div className={styles.col2}>
          <nav className={styles.nav}>
            <ul className={styles['nav-list']}>
              <li className={styles['nav-item']}>
                <Link
                  className={`${styles['nav-link']} link-1`}
                  href='dashbaord'
                  data-link-disabled
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
          {mounted
            ? (
              <ThemeButton
                className='btn-icon1'
                onClick={() => {
                  setTheme(theme === 'dark' ? 'light' : 'dark');
                }}
              >
                <Moon className='svg-5' />
              </ThemeButton>
            )
            : <ButtonSkeleton className={styles['theme-button--filler']} />}
        </div>
      </div>
    </header>
  );
}
