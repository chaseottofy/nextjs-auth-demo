'use client';

import * as React from 'react';

import { NAV } from '@/data/constants';

import NavLink from './HeaderNavLink';
import MenuButton from '../UI/Button/MenuButton';
import Icons from '../Icons/Icons';
import { ThemeButton } from '../UI';

import styles from './Header.module.css';

/** static icons */
const { Logo, GithubIcon } = Icons;
/** static NAVRoutes */
const {
  accountRoute,
  dashboardRoute,
  githubRoute,
  homeRoute,
} = NAV;

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <div className={styles.col1}>
          <NavLink props={homeRoute} className={styles.logo}>
            <Logo className={`${styles['logo-svg']} svg-1`} />
          </NavLink>
        </div>

        <div className={styles.col2}>
          <nav className={styles.nav}>
            <ul className={styles['nav-list']}>
              <li className={styles['nav-item']}>
                <NavLink props={dashboardRoute} className={`${styles['nav-link']} link-1`} />
              </li>
              <li className={`${styles['nav-item']}`}>
                <NavLink props={accountRoute} className={`${styles['nav-link']} link-1`} />
              </li>
            </ul>
          </nav>
        </div>

        <div className={styles.col3}>
          <button
            className={`${styles['log-in--btn']} btn-primary2`}
            type='button'
          >
            Log in
          </button>

          <NavLink props={githubRoute} className={`${styles['github-btn--header']} btn-icon1`}>
            <GithubIcon className='svg-4' />
          </NavLink>

          <ThemeButton className={`${styles['theme-btn--header']}`} svgClassName='svg-5' />
          <MenuButton className={`${styles['menu-btn--header']} btn-icon1`} />
        </div>
      </div>
    </header>
  );
}
