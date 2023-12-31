const validateAddUser = (value: string): (boolean | string) => {
  const trimmedValue = value.trim();
  return trimmedValue.length > 0 && trimmedValue.length < 80 ? trimmedValue : false;
};

export default validateAddUser;
