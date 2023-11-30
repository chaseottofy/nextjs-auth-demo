import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';

import { MOBILE_BREAKPOINT, NAV } from '@/data/constants';
import { useClickOutside } from '@/hooks/index';
import { NavLinkProp } from '@/models/interfaces';
import { mod } from '@/utils/index';

import NavLink from '../../Header/HeaderNavLink';
import Icons from '../../Icons/Icons';
import ThemeButton from '../Button/ThemeButton';
import ListItem from '../List/ListItem';

import styles from './MobileMenu.module.css';

const { accountRoute, dashboardRoute, githubRoute } = NAV;
const NAV_ITEMS = [dashboardRoute, accountRoute, githubRoute] as NavLinkProp[];
// const NAV_ITEMS = [dashboardRoute, accountRoute, githubRoute] as NavLinkProps[];
const { ExternalLink } = Icons;

export default function MobileMenu({
  onClick,
}: {
  onClick: (e?: React.MouseEvent<HTMLElement>) => void;
}) {
  const [activeItem, setActiveItem] = useState(0);
  const modalRef = useClickOutside(onClick) as React.MutableRefObject<HTMLUListElement>;

  const handleResize = useCallback(() => {
    if (window.innerWidth >= MOBILE_BREAKPOINT) {
      onClick();
    }
  }, [onClick]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  useEffect(() => modalRef.current?.focus(), [modalRef]);

  return (
    <ul
      aria-orientation='vertical'
      aria-label='Mobile Menu'
      aria-labelledby='mobile-menu-button'
      className={styles.container}
      data-custom-scrollbar='true'
      id='mobile-menu'
      ref={modalRef}
      role='listbox'
      tabIndex={0}
      onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
        const { key } = e;
        e.preventDefault();

        setActiveItem((prev) => (key === 'ArrowDown'
          ? mod(prev + 1, 3)
          : (key === 'ArrowUp' ? mod(prev - 1, 3) : prev)));

        if (key === 'Enter') {
          onClick();
        }
      }}
    >
      <ThemeButton
        className={styles.theme}
        svgClassName='svg-6'
        isMobile
      />
      {
        NAV_ITEMS.map((item, index) => (
          <ListItem
            active={activeItem === index}
            id={`mobile-menu-${item.name}`}
            key={item.name}
            onClick={(e: React.MouseEvent<HTMLElement>) => {
              onClick(e);
              setActiveItem(index);
            }}
            value={item.name}
          >
            {
              item.target === '_blank'
                ? (
                  <NavLink props={item} className='link-1'>
                    <span>{item.name}</span>
                    <ExternalLink className='svg-6' />
                  </NavLink>
                )
                : <NavLink props={item} className='link-1' />
            }
          </ListItem>
        ))
      }
    </ul>
  );
}
