'use client';

import * as React from 'react';
import { ThemeProvider } from 'next-themes';

function NextThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      themes={['dark', 'light']}
      storageKey='ot-theme'
      disableTransitionOnChange={true}
      enableColorScheme={true}
      enableSystem={true}
      defaultTheme='dark'
    >
      {children}
    </ThemeProvider>
  );
}

export default NextThemeProvider;
