import { useEffect, useState } from 'react';
import * as React from 'react';

import Icons from '@/components/Icons/Icons';
import { THEMES } from '@/data/constants';
import { useClickOutside } from '@/hooks/index';
import { mod } from '@/utils/index';

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
  const [activeItem, setActiveItem] = useState(theme ? THEMES.indexOf(theme) : 2);
  const modalRef = useClickOutside(onClick) as React.MutableRefObject<HTMLUListElement>;

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
        setActiveItem((prev) => {
          return key === 'ArrowDown'
            ? mod(prev + 1, 3)
            : (key === 'ArrowUp' ? mod(prev - 1, 3) : prev);
        });

        if (key === 'Enter' && setTheme) {
          setTheme(THEMES[activeItem]);
          onClick();
        }
      }}
    >
      {
        THEMES.map((item, index) => (
          <ThemeSelectItem
            active={item === theme}
            activeItem={activeItem === index}
            index={index}
            key={item}
            onClick={(e: React.MouseEvent<HTMLElement>) => {
              onClick(e);
              setActiveItem(index);
            }}
            value={item}
          >
            {item}
            {item === theme && <Check className='svg-6' />}
          </ThemeSelectItem>
        ))
      }
    </ul>
  );
}
