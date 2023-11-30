import { User } from '@/lib/schema';
import { SetStateType } from '@/models/interfaces';

// import handleApi from '@/lib/fakeApi';
// import { UserInterface } from '@/models/interfaces';
import fakeTimeout from './fakeTimeout';

const onSubmitPostCheck = async (
  data: User,
  setEmailWarning: (value: { active: boolean; message: string; }) => void,
  setUserAlreadyExists: SetStateType<string[]>,
  isValid: boolean,
  isSubmitting: boolean,
) => {
  try {
    await fakeTimeout(1_000); // simulate api call;
    // const db = (await handleApi.get()) as UserInterface[] | [];
    // const db = (await handleApi.get()) as UserInterface[];
    // const userExists = db.some((user) => user.email.toLowerCase() === data.email.toLowerCase());
    const userExists = false; // temp

    if (userExists) {
      setEmailWarning({ active: true, message: 'email already exists' });
      setUserAlreadyExists((prev) => [...prev, data.email]);
      throw new Error('User already exists');
    }

    if (isValid && !isSubmitting) {
      // handleApi.post(data as UserInterface);
      // post
      console.warn('Posted', data);
      console.warn('Form submitted successfully');
      return true;
    }
    console.warn('Form is invalid');
  } catch (error) {
    console.error('An error occurred:', error);
    return false;
  }

  return false;
};

export default onSubmitPostCheck;
