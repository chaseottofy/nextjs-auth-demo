'use client';

import * as React from 'react';
import { useState } from 'react';
import Link from 'next/link';

import Form from '@/components/Form/Form';
import { NAV } from '@/data/constants';
import useModal from '@/hooks/useModal';
import Icons from '../Icons/Icons';
import { ThemeButton } from '../UI';

import styles from './Header.module.css';

/** static icons */
const { Logo, GithubIcon, Menu } = Icons;
/** static NAVRoutes */
const { accountRoute, dashboardRoute, githubRoute, homeRoute } = NAV;

export default function Header() {
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

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <div className={styles.col1}>
          <Link
            className={styles.logo}
            href={homeRoute.href}
            title={homeRoute.name}
            target={homeRoute.target}
          >
            <Logo
              className={`${styles['logo-svg']} svg-1`}
            />
          </Link>
        </div>

        <div className={styles.col2}>
          <nav className={styles.nav}>
            <ul className={styles['nav-list']}>
              <li className={styles['nav-item']}>
                <Link
                  className={`${styles['nav-link']} link-1`}
                  href={dashboardRoute.href}
                  title={dashboardRoute.name}
                  target={dashboardRoute.target}
                >
                  {dashboardRoute.name}
                </Link>
              </li>
              <li className={`${styles['nav-item']}`}>
                <Link
                  className={`${styles['nav-link']} link-1`}
                  href={accountRoute.href}
                  title={accountRoute.name}
                  target={accountRoute.target}
                >
                  {accountRoute.name}
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

          <Link
            className={`${styles['github-btn--header']} btn-icon1`}
            href={githubRoute.href}
            title={githubRoute.name}
            target={githubRoute.target}
          >
            <GithubIcon className={'svg-3'} />
          </Link>

          <ThemeButton className={`${styles['theme-btn--header']}`} svgClassName={'svg-4'} />

          <button
            className={`${styles['menu-btn--header']} btn-icon1`}
            type='button'
            onClick={() => {
              console.log('menu');
            }}
          >
            <Menu className={'svg-2'} />
          </button>
        </div>
      </div>
    </header>
  );
}