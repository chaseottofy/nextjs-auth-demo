// eslint-disable-next-line no-promise-executor-return
const fakeTimeout = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default fakeTimeout;
