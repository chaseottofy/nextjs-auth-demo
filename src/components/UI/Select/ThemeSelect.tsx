import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';

import Icons from '@/components/Icons/Icons';
import { MOBILE_BREAKPOINT, THEMES } from '@/data/constants';

import { useClickOutside } from '@/hooks/index';
import { mod } from '@/utils/index';
import ListItem from '../List/ListItem';

import styles from './ThemeSelect.module.css';

export default function ThemeSelect({
  theme,
  setTheme,
  onClick,
}: {
  theme?: string;
  setTheme?: (theme: string) => void;
  onClick: (e?: React.MouseEvent<HTMLElement>) => void;
}) {
  const { Check } = Icons;
  const [activeItem, setActiveItem] = useState(theme ? THEMES.indexOf(theme) : 2);
  const modalRef = useClickOutside(onClick) as React.MutableRefObject<HTMLUListElement>;

  const handleResize = useCallback(() => {
    if (window.innerWidth < MOBILE_BREAKPOINT) {
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
      aria-label='Theme Select'
      aria-labelledby='theme-select-button'
      className={styles.container}
      id='theme-select-listbox'
      ref={modalRef}
      role='listbox'
      tabIndex={0}
      onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
        const { key } = e;
        e.preventDefault();
        setActiveItem((prev) => (key === 'ArrowDown'
          ? mod(prev + 1, 3)
          : (key === 'ArrowUp' ? mod(prev - 1, 3) : prev)));

        if (key === 'Enter' && setTheme) {
          setTheme(THEMES[activeItem]);
          onClick();
        }
      }}
    >
      {
        THEMES.map((item, index) => (
          <ListItem
            active={activeItem === index}
            checkmark={item === theme}
            id={`theme-select-item-${index}`}
            key={item}
            onClick={(e: React.MouseEvent<HTMLElement>) => {
              onClick(e);
              setActiveItem(index);
            }}
            value={item}
          >
            {item}
            {item === theme && <Check className='svg-6' />}
          </ListItem>
        ))
      }
    </ul>
  );
}
