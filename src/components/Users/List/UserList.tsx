'use client';

import * as React from 'react';
import { useState } from 'react';
// import { useEffect, useState } from 'react';
// import CustomSkeleton from '@/components/UI/Skeletons/CustomSkeleton';
import { SqliteError } from 'better-sqlite3';

import { GetUsersResponsePayload } from '@/models/interfaces';

import DateLabel from '../../UI/Label/DateLabel';

import styles from './UserList.module.css';

export default function UserList({
  resolvedData,
  setDone,
  clearSome,
}: {
  resolvedData: GetUsersResponsePayload[];
  setDone: { mutateAsync: ({ id, done }: { id: number; done: number; }) => Promise<unknown>; };
  clearSome: { mutateAsync: (id: number) => Promise<unknown>; };
}) {
  const dataLength = resolvedData?.length || 0;
  const [resolvedSetDone, setResolvedSetDone] = useState(true);
  const [resolvedClearSome, setResolvedClearSome] = useState(true);
  // const [resolvedScroll, setResolvedScroll] = useState(true);

  const handleSetDone = async (id: number, done: number) => {
    setResolvedSetDone(false);
    Promise.resolve(await setDone.mutateAsync({ id, done }))
      .then((res) => {
        console.log(res, 'inner res');
      })
      .catch((error: SqliteError) => {
        console.error(error, 'catch error');
      })
      .finally(() => {
        setResolvedSetDone(true);
      });
  };

  const handleClearSome = async (id: number) => {
    setResolvedClearSome(false);
    Promise.resolve(await clearSome.mutateAsync(id))
      .then((res) => {
        console.log(res, 'inner res');
      })
      .catch((error: SqliteError) => {
        console.error(error, 'catch error');
      })
      .finally(() => {
        setResolvedClearSome(true);
      });
  };

  return (
    <ul
      className={styles.log}
      data-custom-scrollbar
    // data-is-loading={resolvedScroll ? 'false' : 'true'}
    >
      <DateLabel className={styles.datetime} />
      {/* {!resolvedScroll && (<CustomSkeleton className={styles.usersSkel} />)} */}

      {resolvedData?.map((user, index) => {
        const { id, content, done } = user;
        return (
          <li
            key={id}
            className={styles['log-item']}
            data-most-recent={index === dataLength - 1}
            data-is-done={done ? 'true' : 'false'}
          >
            <button
              className={styles['log-item--id']}
              onClick={() => (resolvedClearSome ? handleClearSome(+id) : null)}
              type='button'
            >
              {index + 1}
            </button>
            <span className={styles['log-item--content']}>{content}</span>
            <button
              className={styles['log-item--done']}
              type='button'
              onClick={() => (resolvedSetDone ? handleSetDone(id, done ? 0 : 1) : null)}
            >
              {done}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
// set a fake timer to simulate server response
// useEffect(() => {
//   setTimeout(() => {
//     setResolvedScroll(true);
//   }, 10_000);
// }, []);
