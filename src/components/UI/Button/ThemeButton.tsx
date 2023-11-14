import * as React from 'react';
import { useState } from 'react';

import { useTheme as useNextTheme } from 'next-themes';

import Icons from '@/components/Icons';
import useModal from '@/hooks/useModal';

import ThemeSelect from '../Select/ThemeSelect';

export default function ThemeButton({ className = 'btn-3' }: { className?: string; }) {
  const { theme, setTheme } = useNextTheme();
  const { Sun, Moon } = Icons;
  const { showModal } = useModal();
  const [hasModal, setHasModal] = useState(false);

  const handleClick = () => {
    setHasModal(true);

    showModal((onClose) => (
      <ThemeSelect
        theme={theme}
        setTheme={setTheme}
        onClick={(e?: React.MouseEvent<HTMLElement>) => {
          // event was triggered by outside click or escape key, no ref
          if (!e) {
            onClose();
            setHasModal(false);
            return;
          }

          const currentTarget = e?.currentTarget as HTMLLIElement;
          setTheme(currentTarget.dataset.themeValue as 'light' | 'dark' | 'system');
          onClose();
          setHasModal(false);
        }}
      />
    ));
  };

  return (
    <button
      aria-haspopup='listbox'
      aria-expanded={hasModal}
      aria-controls='theme-select-listbox'
      className={className}
      onClick={handleClick}
      title='change theme'
      id='theme-select-button'
      type='button'
      disabled={hasModal}
    >
      {theme === 'light' ? <Sun className='svg-5' /> : <Moon className='svg-5' />}
    </button>
  );
}
