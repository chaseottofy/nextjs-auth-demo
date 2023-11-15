export const BASE_URL = 'http://localhost:4001/users/';

export const ERROR_MESSAGES: { [key: number]: string; } = {
  404: 'Not Found',
  500: 'Internal Server Error',
};

export const FORM_KEYS: string[] = ['email', 'password', 'remember'];

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

export const MAX_INPUT_LENGTHS: { [key: string]: number; } = {
  email: 65,
  password: 20,
};

export const MAX_PASSWORD_LENGTH: number = MAX_INPUT_LENGTHS.password;

export const MAX_TIMEOUT = 3_000;

export const NAV: {
  [key: string]: { name: string; href: string; target: string; };
} = {
  accountRoute: { name: 'Account', href: '/', target: '_self' },
  dashboardRoute: { name: 'Dashboard', href: '/', target: '_self' },
  githubRoute: { name: 'GitHub', href: 'https://github.com/chaseottofy', target: '_blank' },
  homeRoute: { name: 'Home', href: '/', target: '_self' },
};

export const VALID_HREFS: Set<string> = new Set(Object.values(NAV).map((nav) => nav.href));

export const PASSWORD_REGEX: RegExp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[\d!#$%&()*@^])(?!.*[\s/\\])(?!.*["'])(?!.*').{6,20}$/;

export const THEMES = ['light', 'dark', 'system'];
