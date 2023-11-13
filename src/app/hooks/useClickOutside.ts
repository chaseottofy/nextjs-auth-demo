import React, { useEffect, useRef } from 'react';

interface CallbackType {
  (e?: React.MouseEvent<HTMLElement>): void;
}

const useClickOutside = <T extends HTMLElement>(callback:CallbackType): React.RefObject<T> => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClick = ({ target }: Event): void => {
      if (ref.current?.dataset?.isSubmitting === 'true') return;
      if (target && ref.current && !ref.current.contains(target as Node)) {
        callback();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (ref.current?.dataset?.isSubmitting === 'true') return;
      if (event.key === 'Escape') {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClick);
    window.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      window.removeEventListener('keydown', handleEscape);
    };
  }, [callback]);

  return ref;
};

export default useClickOutside;
