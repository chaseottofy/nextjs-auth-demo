import * as React from 'react';

import Icons from '@/components/Icons/Icons';

import styles from './PasswordButton.module.css';

function PasswordButton({
  revealPass,
  setRevealPass,
}: {
  revealPass: boolean;
  setRevealPass: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { EyeIcon, EyeIconOff } = Icons;

  return (
    <button
      className={`${styles['pass-reveal']} btn-icon1`}
      type='button'
      onClick={() => setRevealPass((prev) => !prev)}
    >
      {revealPass ? <EyeIconOff /> : <EyeIcon />}
    </button>
  );
}

export default PasswordButton;
