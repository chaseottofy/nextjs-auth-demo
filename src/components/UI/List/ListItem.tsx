import * as React from 'react';

export default function ListItem({
  active,
  children,
  id,
  onClick,
  value,
  checkmark = false,
}: {
  active: boolean;
  children: (React.ReactNode);
  id: string;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  value: string;
  checkmark?: boolean;
}) {
  return (
    <li
      aria-selected={active ? 'true' : 'false'}
      data-active-tab={active ? 'true' : 'false'}
      data-checkmark={checkmark ? 'true' : 'false'}
      data-theme-value={value}
      id={id}
      onClick={onClick}
      role='option'
      tabIndex={-1}
      title={value}
    >
      {children}
    </li>
  );
}
