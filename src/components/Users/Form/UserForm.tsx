'use client';

import * as React from 'react';
import { useState } from 'react';
import { SqliteError } from 'better-sqlite3';

import { SetStateType } from '@/models/interfaces';
import { validateAddUser } from '@/utils/index';

import UserInput from './UserInput';

import styles from './UserForm.module.css';

export default function UserForm({
  addUser,
  // clearSome,
}: {
  addUser: { mutateAsync: (inputContent: string) => Promise<unknown>; };
  // clearSome: { mutateAsync: () => Promise<unknown>; };
}) {
  const [inputContent, setInputContent]: [string, SetStateType<string>] = useState('');
  const [isSubmitting, setIsSubmitting]: [boolean, SetStateType<boolean>] = useState(false);

  const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setInputContent(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const verifiedData = validateAddUser(inputContent) as (string | boolean);
    if (!verifiedData) return;

    setIsSubmitting(true);
    Promise.resolve(await addUser.mutateAsync(verifiedData as string))
      .then(() => {
        setInputContent('');
      })
      .catch((error: SqliteError) => {
        console.error(error, 'catch error');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
    >
      <label htmlFor='content' className={styles['label-combo']}>
        <span>
          Not real implementation, just testing
        </span>
        <UserInput
          disabled={isSubmitting}
          type='text'
          id='content'
          required
          value={inputContent}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputOnChange(e)}
          minLength={1}
          maxLength={80}
          className={`${styles['input-user']} input-1`}
        />
      </label>

      <div className={styles['submit-wrapper']}>
        <button
          type='submit'
          disabled={isSubmitting}
          className={`${styles.submit} btn-primary2`}
        >
          submit
        </button>
      </div>
    </form>
  );
}
