import * as React from 'react';
import { useEffect, useState } from 'react';

export default function DateTimeDisplay({
  className = '',
}: {
  className?: string;
}) {
  const [dateTime, setDateTime] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const newDateTime = new Date().toLocaleTimeString('en-US', {
        localeMatcher: 'best fit',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        weekday: 'short',
        day: 'numeric',
        month: 'short',
      });
      setDateTime(newDateTime);
    };

    // Update the date/time immediately and every second
    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1_000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <span
      className={className || ''}
    >
      {dateTime}
    </span>
  );
}
