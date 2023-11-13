'use client';

import * as React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { MAX_TIMEOUT } from '@/data/constants';
import { schema, User } from '@/lib/schema';
import { Warning } from '@/models/interfaces';
import {
  determineInputAlertProps,
  handleKeyDownPassword,
  handlePaste,
  onSubmitPostCheck,
  onSubmitPreCheck,
} from '@/utils/index';
import {
  HookFormInput,
  InputAlert,
  Label,
  LoadingDots,
  PasswordButton,
  Spinner,
  ThirdPartyButtons,
} from '../UI';

import { useClickOutside } from '@/hooks/index';

import styles from './Form.module.css';

interface FormProps {
  onClose: () => void;
}

const Form: React.FC<FormProps> = ({ onClose }) => {
  const [checkState, setCheckState] = useState<boolean>(false);
  const [emailWarning, setEmailWarning] = useState<Warning>({ active: false, message: '' });
  const [userAlreadyExists, setUserAlreadyExists] = useState<string[]>([]);
  const [passWarning, setPassWarning] = useState<Warning>({ active: false, message: '' });
  const [revealPass, setRevealPass] = useState<boolean>(false);
  const modalRef = useClickOutside(onClose) as React.MutableRefObject<HTMLFormElement>;

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm<User>({ resolver: zodResolver(schema), mode: 'all' });

  const onSubmit = async (data: User, e: React.FormEvent<HTMLFormElement>) => {
    const canSubmit = onSubmitPreCheck(data, e, userAlreadyExists, setEmailWarning);
    if (canSubmit) {

      await onSubmitPostCheck(
        data,
        setEmailWarning,
        setUserAlreadyExists,
        isValid,
        isSubmitting,
        reset,
      );
    }

    onClose();
  };

  return (
    <div className={styles.wrapper}>
      {isSubmitting && <Spinner timeoutVal={MAX_TIMEOUT} />}
      <form
        ref={modalRef}
        data-is-submitting={isSubmitting}
        onSubmit={(e) => {
          if (!isValid || isSubmitting) return;
          e.preventDefault();
          handleSubmit((data) => onSubmit(data, e))(e);
        }}
        className={`${styles.form} ${isSubmitting ? styles.disabled : ''}`}
      >
        {/* email */}
        <div className={styles.fieldset}>
          <Label htmlFor='email'>email *</Label>
          <HookFormInput
            autoFocus
            autoComplete='email'
            className='input-1'
            data-has-error={errors?.email !== undefined}
            data-has-warn={emailWarning.active}
            disabled={isSubmitting}
            register={register}
            id='email'
            required
            type='email'
            onFocus={() => setEmailWarning({ active: false, message: '' })}
            onPaste={(e) => handlePaste(e, getValues, setValue)}
          />
          <br />
          <InputAlert
            {...determineInputAlertProps(emailWarning, isSubmitting ? errors?.email : undefined)}
          />
        </div>
        {/* password */}
        <div className={styles.fieldset}>
          <Label htmlFor='password'>password *</Label>
          <span className='relative-wrapper'>
            <HookFormInput
              autoComplete='new-password'
              className='input-1'
              data-has-error={errors?.password !== undefined}
              data-has-warn={passWarning.active}
              data-reveal={revealPass}
              disabled={isSubmitting}
              register={register}
              id='password'
              required
              type={revealPass ? 'text' : 'password'} // is this the best way to do this...?
              onFocus={() => passWarning.active && setPassWarning({ active: false, message: '' })}
              onPaste={(e) => handlePaste(e, getValues, setValue, setRevealPass)}
              onKeyDown={(e) => handleKeyDownPassword(e, getValues, setRevealPass, setPassWarning)}
            />
            <PasswordButton revealPass={revealPass} setRevealPass={setRevealPass} />
          </span>
          <br />
          <InputAlert {...determineInputAlertProps(passWarning, errors?.password)} />
        </div>
        {/* checkbox */}
        <div className={`${styles.fieldset} ${styles['checkbox-wrapper']}`}>
          <div className='checkbox-1'>
            <label htmlFor='remember' data-has-check={checkState}>
              checkbox
              <HookFormInput
                aria-labelledby='remember'
                checked={checkState}
                disabled={isSubmitting}
                register={register}
                id='remember'
                required
                type='checkbox'
                onClick={() => setCheckState((prev) => !prev)}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    setCheckState((prev) => !prev);
                  }
                }}
              />
            </label>
          </div>
          <span className={styles['remember-text']}>Remember me</span>
        </div>
        {/* submit */}
        <div className={styles.fieldset}>
          <button
            className={`${styles.submit} btn-primary1`}
            disabled={isSubmitting || !isValid}
            type='submit'
          >
            {isSubmitting ? <LoadingDots text='Loading' /> : 'Submit'}
          </button>
        </div>

        <span className={styles['statement-text']}>
          <hr />
          or continue with
          <hr />
        </span>
        <ThirdPartyButtons />
      </form>
    </div>
  );
};

export default Form;
