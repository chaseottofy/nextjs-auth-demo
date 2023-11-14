import type { FormEvent } from 'react';

import { User } from '@/lib/schema';

/**
 * @description attempts to submit form with existing email are stored in state.
 * This checks if the email exists in that state, and prevents another request.
 *
 */
const onSubmitPreCheck = (
  data: User,
  e: FormEvent<HTMLFormElement>,
  userAlreadyExists: string[],
  setEmailWarning: (value: { active: boolean; message: string; }) => void,
): boolean => {
  e.preventDefault();
  if (userAlreadyExists.length > 0 && userAlreadyExists.includes(data.email)) {
    setEmailWarning({ active: true, message: 'email already exists' });
    return false; // Indicate that we should not proceed with the submission
  }
  return true; // Indicate that it's okay to proceed with the submission
};

export default onSubmitPreCheck;
