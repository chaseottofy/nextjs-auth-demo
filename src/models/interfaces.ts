import type {
  HTMLAttributes,
  JSX,
} from 'react';

export type FormElementNames = 'email' | 'password' | 'remember';

export interface FormProps {
  onClose: () => void;
}

export interface IconsInterface {
  [key: string]: (props?: IconProps) => JSX.Element;
}
export type IconProps = HTMLAttributes<SVGElement>;

export type Inputs = {
  email: string;
  password: string;
  remember: boolean;
};

export type ModalContent = (onClose: () => void) => React.ReactNode;

export interface ModalContextProps {
  hideModal: () => void;
  showModal: (content: ModalContent) => void;
  updateModal: (content: ModalContent) => void;
}

export interface ModalProps {
  isOpen: boolean;
  content: ModalContent;
  onClose: () => void;
}

export interface ModalProviderProps {
  children: React.ReactNode;
}

export interface NavigationInterface {
  [key: string]: {
    name: string;
    href: string;
    external?: boolean;
  };
}

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
