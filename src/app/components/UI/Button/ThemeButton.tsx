import * as React from 'react';
import { useState } from 'react';
import { useTheme as useNextTheme } from 'next-themes';

import Icons from '@/components/Icons';
import useModal from '@/hooks/useModal';
import ThemeSelect from '../Select/ThemeSelect';

export default function ThemeButton({
  className = 'btn-3',
}: {
  className?: string;
}) {
  const { theme, setTheme } = useNextTheme();
  const { Sun, Moon } = Icons;
  const { showModal } = useModal();
  const [hasModal, setHasModal] = useState(false);

  const handleClick = () => {
    setHasModal(true);

    showModal((onClose) => (
      <ThemeSelect
        onClick={(e?: React.MouseEvent<HTMLElement>) => {
          if (!e) {
            onClose();
            setHasModal(false);
            return;
          }
          const currentTarget = e?.currentTarget as HTMLButtonElement;
          const themeValue = currentTarget.dataset.themeValue as string;
          setTheme(themeValue);
          onClose();
          setHasModal(false);
        }}
        theme={theme}
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
      {
        theme === 'light'
          ? <Sun className='svg-5' />
          : <Moon className='svg-5' />
      }
    </button>
  );
}
