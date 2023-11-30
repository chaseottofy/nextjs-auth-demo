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
  const isActive = active ? 'true' : 'false';
  const isChecked = checkmark ? 'true' : 'false';

  return (
    <li
      aria-selected={isActive}
      data-active-tab={isActive}
      data-checkmark={isChecked}
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
