const customError = (message: string): Error => {
  const error = new Error(message);
  error.name = 'HttpError';
  return error;
};

export default customError;
