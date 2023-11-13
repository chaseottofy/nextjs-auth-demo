'use client';

import * as React from 'react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTheme as useNextTheme } from 'next-themes';

import Icons from '../Icons';
import { ThemeButton } from '../UI';

import styles from './Header.module.css';

import { useModal } from '@/providers/modalProvider';

import Form from '@/components/Form/Form';

const Header: React.FC = () => {
  const { Moon, Logo } = Icons;
  const { theme, setTheme } = useNextTheme();
  const [mounted, setMounted] = useState(false);
  const { showModal } = useModal();
  const [show, setShow] = useState(false);

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
                  data-link-disabled={true}
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
            onClick={() => {
              setShow((prev) => !prev);
              showModal((onClose) => (
                <Form onClose={() => {
                  setShow(false);
                  onClose();
                }} />
              ));
            }}
          >
            Log in
          </button>
          {
            !mounted
              ? <button className={styles['theme-button--filler']} />
              : (
                <ThemeButton
                  className='btn-icon1'
                  onClick={() => {
                    setTheme(theme === 'dark' ? 'light' : 'dark');
                  }}
                >
                  <Moon className='svg-5' />
                </ThemeButton>
              )
          }
        </div>
      </div>
    </header>
  );
};

export default Header;
