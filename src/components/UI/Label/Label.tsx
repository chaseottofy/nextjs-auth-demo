import * as React from 'react';

export default function Label({ htmlFor, children }: {
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className='label-1'>{children}</label>
  );
}
