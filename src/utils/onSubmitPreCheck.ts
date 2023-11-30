import { User } from '@/lib/schema';

/**
 * @description attempts to submit form with existing email are stored in state.
 * This checks if the email exists in that state, and prevents another request.
 *
 */
// const onSubmitPreCheck = async (
//   data: User,
//   e: FormEvent<HTMLFormElement>,
//   userAlreadyExists: string[],
//   setEmailWarning: (value: { active: boolean; message: string; }) => void,
// // ): Promise<boolean> => {
// ): boolean => {
//   e.preventDefault();
//   if (userAlreadyExists.length > 0 && userAlreadyExists.includes(data.email)) {
//     setEmailWarning({ active: true, message: 'email already exists' });
//     return false; // Indicate that we should not proceed with the submission
//   }
//   return true; // Indicate that it's okay to proceed with the submission
// };

const onSubmitPreCheck = async (
  data: User,
  userAlreadyExists: string[],
  setEmailWarning: (value: { active: boolean; message: string; }) => void,
): Promise<boolean> => {
  // eslint-disable-next-line no-promise-executor-return
  await new Promise((resolve) => setTimeout(resolve, 2_000));
  // const timeout = new Promise((resolve) => setTimeout(resolve, 2_000));
  if (userAlreadyExists.length > 0 && userAlreadyExists.includes(data.email)) {
    setEmailWarning({ active: true, message: 'email already exists' });
    return false; // Indicate that we should not proceed with the submission
  }
  return true; // Indicate that it's okay to proceed with the submission
};

export default onSubmitPreCheck;
