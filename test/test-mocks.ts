export const FIREFOX_AUTOFILL: string[] = [
  'e#Jym3}XBwN!yiw',    // valid
  'h5{Z2E2q3XG3t6f',    // valid
  'y-87-aB&^>tPrBt',    // valid
  'jd9s.FF]wgK,&mv',    // valid
];

// Simple valid passwords
export const VALID_PASSWORDS_SIMPLE: string[] = [
  'Pass123',
  '1Abcdef',
  'a1B2c3D4',
  'A2d3E4f5',
  'Zz1Zz1',
  'M1xEdChArs',
  'Pa!@#$',
];

export const INVALID_PASSWORDS: string[] = [
  'alllower123', // No uppercase letter
  'ALLUPPER123', // No lowercase letter
  'NoNumbers',   // No numbers
  'Lowerupper',  // Only letters
  'Pass 123',    // Space in middle
  'abc ABC$',    // Space in middle
  '1234567',     // No letters : all numbers
  '$$$$$$$',     // No letters : all special characters
  '1$2$3$5$',    // No letters : all numbers and special characters
  'abcdefg',     // No uppercase letters or numbers
  'ABCDEFG',     // No lowercase letters or numbers
  '123456',      // No letters
  '       ',     // Only spaces (invalid characters)
  'Pass word1',  // Contains a space
  'pass!@#$',    // Missing uppercase letter
  'PASS!@#$',    // Missing lowercase letter
  '123456789abcdefghABCDE', // Too long
];
