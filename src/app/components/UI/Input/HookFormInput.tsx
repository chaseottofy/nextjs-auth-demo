import React from 'react';
import {
  UseFormRegisterReturn,
} from 'react-hook-form';

import { FormElementNames } from '@/models/interfaces';

/**
 * @fileoverview Custom Input Component tightly coupled with react-hook-form.
 *
 * This structure avoids havin
 * g to forward refs, avoids unkown/any types,
 * and only uses the base useForm react-hook-form hook to mount.
 *
 * RestProps:
 * Props that are not universal across all input types using this component are put
 * in the RestProps interface. If you need to add specific props, add them there.
 *
 * Non-universal props passed to the component are represented by the ...rest spread
 * and the RestProps interface respectively. If you need to add specific props, add them
 * there and define them as optional.
 *
 * HookFormInputProps:
 * All other props are defined in the HookFormInputProps interface. RegisterType is the
 * main mounting mechanism of react-hook-form. It receives the name of the input, first
 * defined within '@lib/schema', and whether the input is required or disabled. Under the
 * hood, it registers a ref to the input, as well as onBlur, and onChange.
 *
 * React-hook-form has some other examples to accomplish registration within functional
 * components.
 * @https://github.com/react-hook-form/react-hook-form/tree/master/examples/V7/typescript
 */

export interface RestProps {
  autoComplete?: string;
  'aria-labelledby'?: string;
  autoFocus?: boolean;
  className?: string;
  checked?: boolean;
  'data-has-error'?: boolean;
  'data-has-warning'?: boolean;
  'data-reveal'?: boolean;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onInput?: (e: React.FormEvent<HTMLInputElement>) => void;
  onPaste?: (e: React.ClipboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export interface RegisterType {
  (id: FormElementNames, options?: {
    required?: boolean;
    disabled?: boolean;
  }): UseFormRegisterReturn;
}

export interface HookFormInputProps extends RestProps {
  disabled?: boolean;
  required?: boolean;
  id: string;
  type: string;
  register: RegisterType;
}

export default function HookFormInput({
  type,
  required,
  id,
  disabled,
  register,
  ...rest
}: HookFormInputProps) {
  return (
    <input
      {...rest}
      id={id}
      type={type}
      {...register(id as FormElementNames, { required, disabled })}
    />
  );
}
