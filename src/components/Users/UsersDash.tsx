'use client';

import { useState } from 'react';
import { SqliteError } from 'better-sqlite3';

import { trpc } from '@/app/_trpc/client';
import { serverClient } from '@/app/_trpc/serverClient';
import useModal from '@/hooks/useModal';
import { GetUsersResponsePayload } from '@/models/interfaces';

import UserForm from './Form/UserForm';
import UserList from './List/UserList';
import Toast from '../UI/Toast/Toast';

import styles from './UsersDash.module.css';

export default function UsersDash({
  initialData,
}: {
  initialData: Awaited<ReturnType<(typeof serverClient)['getUsers']>>;
}) {
  const { showModal, hideModal } = useModal();
  const [hasModal, setHasModal] = useState(false);

  const getToast = (message: string) => {
    if (hasModal) {
      hideModal();
      setHasModal(false);
      return;
    }

    setHasModal(true);

    showModal((onClose) => (
      <Toast
        title={message}
        onClick={() => {
          onClose();
          setHasModal(false);
        }}
      />
    ), true);
  };

  const getUsers = trpc.getUsers.useQuery(undefined, {
    initialData,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const setDone = trpc.setDone.useMutation({
    onSettled: () => {
      getUsers.refetch()
        .then((res) => {
          getToast(res.status);
        })
        .catch((error: SqliteError) => {
          if (hasModal) {
            hideModal();
            setHasModal(false);
          }
          getToast(error.name);
        });
    },
  });

  const addUser = trpc.addUser.useMutation({
    onSettled: () => {
      getUsers.refetch()
        .then((res) => {
          getToast(res.status);
        })
        .catch((error: SqliteError) => {
          if (hasModal) {
            hideModal();
            setHasModal(false);
          }
          getToast(error.name);
        });
    },
  });

  const clearSome = trpc.clearSome.useMutation({
    onSettled: () => {
      getUsers.refetch()
        .then((res) => {
          getToast(res.status);
        })
        .catch((error: SqliteError) => {
          if (hasModal) {
            hideModal();
            setHasModal(false);
          }
          getToast(error.name);
        });
    },
  });

  return (
    <section className={styles.dash}>
      <UserList
        resolvedData={getUsers.data as GetUsersResponsePayload[]}
        setDone={setDone}
        clearSome={clearSome}
      />
      <UserForm
        addUser={addUser}
      />
    </section>
  );
}
