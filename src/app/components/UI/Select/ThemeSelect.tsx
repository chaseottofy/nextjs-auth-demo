import { useEffect, useState } from 'react';
import * as React from 'react';

import Icons from '@/components/Icons';
import { THEME_VALUES, THEMES } from '@/data/constants';
import { useClickOutside } from '@/hooks/index';

import ThemeSelectItem from './ThemeSelectItem';

import styles from './ThemeSelect.module.css';

export default function ThemeSelect({
  onClick,
  theme,
}: {
  onClick: (e?: React.MouseEvent<HTMLElement>) => void;
  theme?: string;
}) {
  const { Check } = Icons;
  const [activeItem, setActiveItem] = useState(theme === 'light' ? 0 : 1);
  const modalRef = useClickOutside(onClick) as React.MutableRefObject<HTMLUListElement>;

  useEffect(() => {
    modalRef.current?.focus();
  }, [modalRef]);

  return (
    <ul
      className={styles.container}
      ref={modalRef}
      role='listbox'
      id='theme-select-listbox'
      tabIndex={0}
      aria-orientation='vertical'
      aria-label='Theme Select'
      aria-labelledby='theme-select-button'
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

        if (key === 'Enter') {
          const currentChild = e.currentTarget?.children[activeItem] as HTMLLIElement;
          currentChild.click();
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
            {theme === item && <Check className='svg-5' />}
          </ThemeSelectItem>
        ))
      }
    </ul>
  );
}
