import * as React from 'react';
import { useState } from 'react';
// import { useEffect, useState } from 'react';

import useModal from '@/hooks/useModal';
import MobileMenu from '../Menu/MobileMenu';
import Icons from '../../Icons/Icons';

const { Close, Menu } = Icons;

export default function MenuButton({ className }: {
  className: string;
}) {
  const { showModal } = useModal();
  const [hasModal, setHasModal] = useState(false);

  const handleClick = () => {
    setHasModal(true);

    showModal((onClose) => (
      <MobileMenu
        onClick={(e?: React.MouseEvent<HTMLElement>) => {
          onClose();
          setHasModal(false);
          if (!e) return; // handled by @hooks/useClickOutside
          console.log('show mobile menu');
        }}
      />
    ));
  };

  return (
    <button
      aria-expanded={hasModal}
      aria-haspopup='true'
      aria-controls='mobile-menu'
      className={className}
      disabled={hasModal}
      title='open menu'
      type='button'
      onClick={handleClick}
    >
      {hasModal
        ? (<Close className='svg-2' />)
        : (<Menu className='svg-2' />)}
    </button>
  );
}
