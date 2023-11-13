import type { ReactNode } from 'react';
import * as React from 'react';

function ThemeButton({
  className = 'btn-3',
  onClick,
  children,
}: {
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  return (
    <button
      className={className}
      onClick={onClick}
      type='button'
    >
      {children}
    </button>
  );
}

export default ThemeButton;
