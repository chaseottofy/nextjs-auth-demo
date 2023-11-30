const getDateTime = (): string => new Date()
  .toLocaleTimeString('en-US', {
    localeMatcher: 'best fit',
    hour: 'numeric',
    minute: 'numeric',
    second: undefined,
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });

export default getDateTime;
