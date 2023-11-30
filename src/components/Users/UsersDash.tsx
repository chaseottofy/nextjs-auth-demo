'use client';

import { SqliteError } from 'better-sqlite3';

import { trpc } from '@/app/_trpc/client';
import { serverClient } from '@/app/_trpc/serverClient';
import { GetUsersResponsePayload } from '@/models/interfaces';

import UserForm from './Form/UserForm';
import UserList from './List/UserList';

import styles from './UsersDash.module.css';

export default function UsersDash({
  initialData,
}: {
  initialData: Awaited<ReturnType<(typeof serverClient)['getUsers']>>;
}) {
  const getUsers = trpc.getUsers.useQuery(undefined, {
    initialData,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const addUser = trpc.addUser.useMutation({
    onSettled: () => {
      getUsers.refetch()
        .then((res) => {
          console.log(res, 'res');
        })
        .catch((error: SqliteError) => {
          console.error(error, 'catch error');
        });
    },
  });

  return (
    <section className={styles.dash}>
      <UserList resolvedData={getUsers.data as GetUsersResponsePayload[]} />
      <UserForm addUser={addUser} />
    </section>
  );
}
