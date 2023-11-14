import * as React from 'react';

import Icons from '@/components/Icons/Icons';

import styles from './ThirdPartyButtons.module.css';

function ThirdPartyButtons() {
  const { GoogleIcon, GithubIcon } = Icons;

  return (
    <div className={styles['third-party']}>
      <button className='btn-4' id='google-btn' type='button' disabled>
        <span className={styles['button-icon']}>
          <GoogleIcon className={styles.googleIcon} />
        </span>
        <span className={styles['button-text']}>Google</span>
      </button>
      <button className='btn-4' id='github-btn' type='button' disabled>
        <span className={styles['button-icon']}>
          <GithubIcon className={styles.githubIcon} />
        </span>
        <span className={styles['button-text']}>Github</span>
      </button>
    </div>
  );
}

export default ThirdPartyButtons;
