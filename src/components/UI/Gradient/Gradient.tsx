import * as React from 'react';

import styles from './Gradient.module.css';

export default function Gradient() {
  return (
    <div className={styles.wrappeer}>
      <svg className={styles.svg}
      >
        <filter id='grainy' x='0' y='0' width='100%' height='100%'>
          <feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' seed='5' stitchTiles='stitch' result='noise' />
        </filter>
      </svg>
      <div className={styles.underlay} />
      <div className={styles['overlay-two']} />
      <div className={styles['header-underlay']} />
    </div>
  );
}
