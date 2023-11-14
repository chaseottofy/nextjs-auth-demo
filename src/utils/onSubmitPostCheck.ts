import React from 'react';

import handleApi from '@/lib/fakeApi';
import { User } from '@/lib/schema';
import { UserInterface } from '@/models/interfaces';

import fakeTimeout from './fakeTimeout';

const onSubmitPostCheck = async (
  data: User,
  setEmailWarning: (value: { active: boolean; message: string; }) => void,
  setUserAlreadyExists: React.Dispatch<React.SetStateAction<string[]>>,
  isValid: boolean,
  isSubmitting: boolean,
  reset: () => void,
) => {
  try {
    await fakeTimeout(1_000); // simulate api call;
    const db = (await handleApi.get()) as UserInterface[] | [];
    const userExists = db.some((user) => user.email.toLowerCase() === data.email.toLowerCase());

    if (userExists) {
      setEmailWarning({ active: true, message: 'email already exists' });
      setUserAlreadyExists((prev) => [...prev, data.email]);
      console.warn('User already exists');
      return;
    }

    if (isValid && !isSubmitting) {
      handleApi.post(data as UserInterface);
      console.warn('Form submitted successfully');
      reset();
      return;
    }
    console.warn('Form is invalid');
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

export default onSubmitPostCheck;
