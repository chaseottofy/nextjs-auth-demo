export const generatePasswords = (length: number = 15): string => {
  // Define character sets
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const digits = '0123456789';
  const specialCharacters = "!@#$%^&*()-_=+[]{}|;:,.<>?~`";

  const password: string[] = [
    lowercase[Math.floor(Math.random() * lowercase.length)],
    uppercase[Math.floor(Math.random() * uppercase.length)],
    digits[Math.floor(Math.random() * digits.length)],
    specialCharacters[Math.floor(Math.random() * specialCharacters.length)]
  ];

  const remainingLength = length - password.length;
  const allCharacters = lowercase + uppercase + digits + specialCharacters;

  // Add random characters from all characters until we reach the desired length
  for (let i = 0; i < remainingLength; i++) {
    password.push(allCharacters[Math.floor(Math.random() * allCharacters.length)]);
  }

  // Shuffle the array to ensure a random order of characters
  for (let i = password.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [password[i], password[j]] = [password[j], password[i]];
  }

  return password.join('');
};
