import * as React from 'react';

import { UserInputProps } from '@/models/interfaces';

export default function UserInput({
  type,
  required,
  id,
  disabled,
  ...rest
}: UserInputProps) {
  return (
    <input
      id={id}
      type={type}
      {...{ required, disabled }}
      {...rest}
    />
  );
}

UserInput.displayName = 'UserInput';
