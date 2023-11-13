import type {
  HTMLAttributes,
  JSX,
} from 'react';

// import type { KeyboardEvent } from 'react';

export type Inputs = {
  email: string;
  password: string;
  remember: boolean;
};

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

export type FormElementNames = 'email' | 'password' | 'remember';

export type ModalContent = (onClose: () => void) => React.ReactNode;

export interface ModalProps {
  isOpen: boolean;
  content: ModalContent;
  onClose: () => void;
}

export interface ModalContextProps {
  hideModal: () => void;
  showModal: (content: ModalContent) => void;
  updateModal: (content: ModalContent) => void;
}

export interface ModalProviderProps {
  children: React.ReactNode;
}

export interface FormProps {
  onClose: () => void;
}

export type IconProps = HTMLAttributes<SVGElement>;

export interface IconsInterface {
  [key: string]: (props?: IconProps) => JSX.Element;
}

export type TimeoutId = ReturnType<typeof setTimeout>;
