import type { HTMLAttributes, JSX } from 'react';

/**
 * @fileoverview Interfaces
 * List:
 * - FormElementNames
 * - FormProps
 * - GetUsersResponsePayload
 * - IconsInterface
 * - IconProps
 * - Inputs
 * - ModalContent
 * - ModalContextProps
 * - ModalProps
 * - ModalProviderProps
 * - NavLinkProps
 * - RestUserProps
 *   - UserInputProps
 * - SetStateType
 * - TimeoutId
 * - UserInterface
 * - Warning
 */

export type FormElementNames = 'email' | 'password' | 'remember';

export interface FormProps {
  onClose: () => void;
}

export interface GetUsersResponsePayload {
  id: number;
  content: string | null;
  done: string | null;
}

export type IconsInterface = Record<string, (props?: IconProps) => JSX.Element>;

export type IconProps = HTMLAttributes<SVGElement>;

export interface Inputs {
  email: string;
  password: string;
  remember: boolean;
}

export type ModalContent = (onClose: () => void) => React.ReactNode;

export interface ModalContextProps {
  hideModal: () => void;
  showModal: (
    content: ModalContent,
    isUnset?: boolean,
  ) => void;
  updateModal: (content: ModalContent) => void;
}

export interface ModalProps {
  isOpen: boolean;
  content: ModalContent;
  onClose: () => void;
  isUnset?: boolean; // use for toast
}

export interface ModalProviderProps {
  children: React.ReactNode;
}

// export interface NavLinkProp = { name: string; href: string; target: string; };
export interface NavLinkProp {
  name: string;
  href: string;
  target: string;
}

export type NavLinkProps = Record<string, NavLinkProp>;

export interface RestUserProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  className?: string;
  minLength?: number;
  maxLength?: number;
  placeholder?: string;
}

export interface UserInputProps extends RestUserProps {
  type: 'text' | 'password' | 'email' | 'tel' | 'search' | 'url';
  required: boolean;
  id: string;
  disabled: boolean;
}

export type SetStateType<T> = React.Dispatch<React.SetStateAction<T>>;

export type TimeoutId = ReturnType<typeof setTimeout>;

export interface UserInterface {
  id: number;
  email: string;
  remember: boolean;
  password: string;
}

export interface Warning {
  active: boolean;
  message: string;
}
