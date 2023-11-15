import * as React from 'react';

import styles from './Main.module.css';

function Main({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={styles.main}>
      {/* <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: 0,
          width: 0,
          zIndex: -1,
          opacity: 0,
          visibility: 'hidden',
        }}
      >
        <filter id='grainy2' x='0' y='0' width='100%' height='100%'>
          <feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' seed='5' stitchTiles='stitch' result='noise' />
        </filter>
      </svg> */}
      <div className={styles['content-wrapper']}>
        {children}
      </div>
    </main>
  );
}

export default Main;
