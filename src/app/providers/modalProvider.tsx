'use client';

import React, {
  createContext,
  useContext,
  useState,
} from 'react';

import {
  ModalContextProps,
  ModalProps,
  ModalContent,
  ModalProviderProps,
} from '@/models/interfaces';

import Modal from '@/components/UI/Modal/Modal';

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

// }: React.PropsWithChildren<{}>) => {
export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [modalProps, setModalProps] = useState<ModalProps | null>(null);

  const showModal = (content: ModalContent) => {
    setModalProps({ isOpen: true, content, onClose: hideModal });
  };

  const updateModal = (content: ModalContent) => {
    if (modalProps) {
      setModalProps({ ...modalProps, content });
    }
  };

  const hideModal = () => {
    setModalProps(null);
  };

  return (
    <ModalContext.Provider value={{ showModal, updateModal, hideModal }}>
      {children}
      {modalProps && <Modal {...modalProps} />}
    </ModalContext.Provider>
  );
};
