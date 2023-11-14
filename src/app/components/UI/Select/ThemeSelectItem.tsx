import * as React from 'react';

export default function ThemeSelectItem({
  children,
  value,
  active,
  activeItem,
  index,
  onClick,
}: {
  children: (React.ReactNode);
  value: string;
  active: boolean;
  activeItem: boolean;
  index: number;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
}) {
  return (
    <li
      aria-selected={active}
      data-theme-value={value}
      data-theme-active={active}
      data-active-tab={activeItem}
      id={`theme-select-item-${index}`}
      onClick={onClick}
      tabIndex={-1}
      title={value}
      role='option'
    >
      {children}
    </li>
  );
}
