'use client';

import * as React from 'react';
import { ThemeProvider } from 'next-themes';

function NextThemeProvider({ children }: { children: React.ReactNode; }) {
  return (
    <ThemeProvider
      enableSystem={false}
      disableTransitionOnChange
      defaultTheme='dark'

    >
      {children}
    </ThemeProvider>
  );
}

export default NextThemeProvider;
