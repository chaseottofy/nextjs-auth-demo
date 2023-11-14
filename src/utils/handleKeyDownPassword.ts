import type {
  Dispatch,
  KeyboardEvent,
  SetStateAction,
} from 'react';

import { INVALID_CHARS, MAX_PASSWORD_LENGTH } from '../data/constants';

const handleKeyDownPassword = (
  e: KeyboardEvent<HTMLInputElement>,
  getValues: (field: string) => string,
  setRevealPassword: Dispatch<SetStateAction<boolean>>,
  setPassWarning: Dispatch<SetStateAction<{ active: boolean; message: string; }>>,
) => {
  const { key } = e;
  if (key === 'Backspace') return;

  if (getValues('password').length >= MAX_PASSWORD_LENGTH) {
    setPassWarning({
      active: true,
      message: `Max password length is ${MAX_PASSWORD_LENGTH}`,
    });

    if (key === 'Backspace') {
      setRevealPassword(false);
      setPassWarning({ active: false, message: '' });
    } else {
      e.preventDefault();
    }

    setTimeout(() => {
      setPassWarning({ active: false, message: '' });
    }, 2_000);
  }

  if (INVALID_CHARS[key]) {
    e.preventDefault();
    setPassWarning({
      active: true,
      message: `Invalid character: ${INVALID_CHARS[key]}`,
    });
    setTimeout(() => {
      setPassWarning({ active: false, message: '' });
    }, 2_000);
  }
};

export default handleKeyDownPassword;
