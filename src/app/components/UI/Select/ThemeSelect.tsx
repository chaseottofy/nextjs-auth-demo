import { useEffect, useState } from 'react';
import * as React from 'react';

import Icons from '@/components/Icons';
import { THEME_VALUES, THEMES } from '@/data/constants';
import { useClickOutside } from '@/hooks/index';

import ThemeSelectItem from './ThemeSelectItem';

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
  const [activeItem, setActiveItem] = useState(theme === 'light' ? 0 : 1);
  const modalRef = useClickOutside(onClick) as React.MutableRefObject<HTMLUListElement>;

  useEffect(() => {
    modalRef.current?.focus();
  }, [modalRef]);

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
        setActiveItem((prev) => {
          if (key === 'ArrowDown') {
            return prev === THEMES.length - 1 ? 0 : prev + 1;
          }
          if (key === 'ArrowUp') {
            return prev === 0 ? THEMES.length - 1 : prev - 1;
          }
          return prev;
        });

        if (key === 'Enter' && setTheme) {
          setTheme(Object.keys(THEME_VALUES)[activeItem]);
          onClick();
        }
      }}
    >
      {
        THEMES.map((item, index) => (
          <ThemeSelectItem
            key={item}
            value={THEME_VALUES[item]}
            activeItem={activeItem === index}
            active={item === theme || (item === 'system' && theme === 'dark')}
            index={index}
            onClick={(e: React.MouseEvent<HTMLElement>) => {
              onClick(e);
              setActiveItem(index);
            }}
          >
            {item}
            {theme === item && <Check className='svg-6' />}
          </ThemeSelectItem>
        ))
      }
    </ul>
  );
}
