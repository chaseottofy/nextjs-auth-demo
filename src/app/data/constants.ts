export const MAX_TIMEOUT = 3_000;

export const FORM_KEYS: string[] = ['email', 'password', 'remember'];

export const FORM_LENGTH: number = FORM_KEYS.length;

// export const BASE_URL = 'https://reqres.in/api';
export const BASE_URL = 'http://localhost:4001/users/';

export const ERROR_MESSAGES: { [key: number]: string; } = {
  404: 'Not Found',
  500: 'Internal Server Error',
};

export const PASSWORD_REGEX: RegExp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[\d!#$%&()*@^])(?!.*[\s/\\])(?!.*["'])(?!.*').{6,20}$/;

export const MAX_INPUT_LENGTHS: { [key: string]: number; } = {
  email: 65,
  password: 20,
};
export const MAX_PASSWORD_LENGTH: number = MAX_INPUT_LENGTHS.password;

export const PASSWORD_EDGE_CASES: string[] = [
  'aabb2ffadf3$F\b',
];

export const INVALID_CHARS: { [key: string]: string; } = {
  ' ': 'space',
  '\'': 'single quote',
  '"': 'double quote',
  '\\': 'backslash',
  '/': 'forward slash',
  '\0': 'null',
  '\b': 'backspace',
  '\t': 'tab',
  '\n': 'newline',
  '\r': 'carriage return',
  '\f': 'form feed',
};
