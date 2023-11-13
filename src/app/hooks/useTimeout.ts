import { useEffect, useRef } from 'react';

import type { TimeoutId } from '@/models/interfaces';

const useTimeout = (callback: () => void, delay: number): void => {
  const savedCallback = useRef(callback);
  const timeoutId = useRef<TimeoutId>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    timeoutId.current = setTimeout(() => {
      savedCallback.current();
    }, delay);

    return () => {
      clearTimeout(timeoutId.current);
    };
  }, [delay]);
};

export default useTimeout;
