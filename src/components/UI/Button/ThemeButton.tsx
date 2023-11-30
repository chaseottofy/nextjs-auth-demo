import * as React from 'react';
import { useEffect, useState } from 'react';
import { useTheme as useNextTheme } from 'next-themes';

import Icons from '@/components/Icons/Icons';
import useModal from '@/hooks/useModal';

import ThemeSelect from '../Select/ThemeSelect';
import CustomSkeleton from '../Skeletons/CustomSkeleton';

export default function ThemeButton({
  className = 'btn-3',
  svgClassName = 'svg-4',
  isMobile = false,
}: {
  className: string;
  svgClassName: string;
  isMobile?: boolean;
}) {
  const { theme, setTheme } = useNextTheme();
  const { Sun, Moon } = Icons;
  const { showModal } = useModal();
  const [mounted, setMounted] = useState(false);
  const [hasModal, setHasModal] = useState(false);

  const handleClick = () => {
    setHasModal(true);

    showModal((onClose) => (
      <ThemeSelect
        theme={theme}
        setTheme={setTheme}
        onClick={(e?: React.MouseEvent<HTMLElement>) => {
          onClose();
          setHasModal(false);
          if (!e) return; // handled by @hooks/useClickOutside
          setTheme(e?.currentTarget.dataset.themeValue as 'light' | 'dark' | 'system');
        }}
      />
    ));
  };

  const handleMobileClick = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => setMounted(true), []);

  return (
    <button
      aria-haspopup='listbox'
      aria-expanded={hasModal}
      aria-controls='theme-select-listbox'
      className={`${className} btn-icon1`}
      onClick={isMobile ? handleMobileClick : handleClick}
      title='change theme'
      id='theme-select-button'
      type='button'
      disabled={hasModal}
    >
      {mounted
        ? (theme === 'light'
          ? (<Sun className={svgClassName} />)
          : (<Moon className={svgClassName} />))
        : (<CustomSkeleton className={svgClassName} />)}
    </button>
  );
}
