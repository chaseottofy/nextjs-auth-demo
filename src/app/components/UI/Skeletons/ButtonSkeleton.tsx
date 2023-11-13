import * as React from 'react';

export default function ButtonSkeleton({ className }: { className: string }) {
  return (
    <button
      type='button'
      className={className}
      data-skeleton
    >
      <span className='skeleton' />
    </button>
  );
}
