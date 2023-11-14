import type {
  ClipboardEvent,
  Dispatch,
  SetStateAction,
} from 'react';

import { MAX_INPUT_LENGTHS } from '@/data/constants';
import { FormElementNames } from '@/models/interfaces';

import sanitizeUserPaste from './sanitizeUserPaste';

const isClipboardAPIAvailable = () => 'clipboard' in navigator;

const handlePaste = (
  e: ClipboardEvent<HTMLInputElement>,
  getValues: (element: string) => string,
  setValue: (element: FormElementNames, value: string) => void,
  setRevealPass?: Dispatch<SetStateAction<boolean>>,
) => {
  if (!isClipboardAPIAvailable()) {
    console.warn('Clipboard API not available');
    return;
  }

  const { currentTarget, clipboardData } = e;
  const { name } = currentTarget;
  const { email: maxEmail, password: maxPassword } = MAX_INPUT_LENGTHS;
  const currentVal = getValues(name);
  const currentLength = currentVal.length;
  const isPassword = name === 'password';

  const maxLength = isPassword ? maxPassword : maxEmail;
  const lengthRemaining = maxLength - currentLength;

  if (lengthRemaining === 0) return;

  const currentData = clipboardData.getData('text/plain');
  const updatedValue = sanitizeUserPaste(currentData, currentVal, lengthRemaining);
  e.preventDefault();
  if (isPassword && setRevealPass) { setRevealPass(true); }
  setValue(name as FormElementNames, updatedValue);
};

export default handlePaste;
