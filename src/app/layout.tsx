import * as React from 'react';
import localFont from 'next/font/local';

import Header from '@/components/Header/Header';

import ModalProvider from '@/providers/modalProvider';
import NextThemeProvider from '@/providers/themeProvider';

import '@/styles/sanitize.css';
import '@/styles/root.css';
import '@/styles/templates.css';

export { default as Metadata } from '@/components/MetaResolve';
// export { default as Viewport } from '@/components/ViewportResolve';

const Inter = localFont({
  src: '../assets/fonts/Inter.woff2',
  variable: '--inter',
  fallback: ['Adjusted Arial Fallback'],
  display: 'block',
});

interface RootLayoutProps {
  children: React.ReactNode;
}

function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={Inter.variable}
        id='root'
      >
        <NextThemeProvider>
          <ModalProvider>
            <Header />
            {children}
          </ModalProvider>
        </NextThemeProvider>
      </body>
    </html>
  );
}

export default RootLayout;
