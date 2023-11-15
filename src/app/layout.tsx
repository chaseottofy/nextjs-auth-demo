import * as React from 'react';
import localFont from 'next/font/local';

import Header from '@/components/Header/Header';
import Gradient from '@/components/UI/Gradient/Gradient';
import {
  ModalProvider,
  NextThemeProvider,
  TrpcProvider,
} from '@/providers/index';

import '@/styles/sanitize.css';
import '@/styles/root.css';
import '@/styles/templates.css';

const Inter = localFont({
  src: '../assets/fonts/Inter.woff2',
  variable: '--inter',
  fallback: ['Adjusted Arial Fallback'],
  display: 'block',
  preload: true,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang='en' suppressHydrationWarning>
      <body className={Inter.variable} id='root'>
        <NextThemeProvider>
          <TrpcProvider>
            <ModalProvider>
              <Header />
              <Gradient />
              {children}
            </ModalProvider>
          </TrpcProvider>
        </NextThemeProvider>
      </body>
    </html>
  );
}
