'use client';

import * as React from 'react';
import { useState } from 'react';
import { SqliteError } from 'better-sqlite3';

import { trpc } from '@/app/_trpc/client';
import CustomSkeleton from '../UI/Skeletons/CustomSkeleton';

import styles from './UserList.module.css';

export default function UserList() {
  // fix timeout
  const getUsers = trpc.getUsers.useQuery();
  const resolvedData = getUsers.data;
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
  const [content, setContent]: [string, React.Dispatch<React.SetStateAction<string>>] = useState('');

  return (
    <div className={styles.container}>
      <ul
        className={styles.log}
        data-custom-scrollbar={true}
      >
        {
          resolvedData ? resolvedData.map((user) => {
            return (
              <li
                key={user.id}
                className={styles['log-item']}
              >
                <span
                  className={styles['log-item--id']}
                >
                  {user.id}
                  {user.id <= 9 ? '\u00A0' : ''}
                  {' > '}
                </span>
                <span
                  className={styles['log-item--content']}
                >
                  {user.content}
                </span>
              </li>
            );
          }) : (
            <CustomSkeleton
              height={360}
              className={styles.usersSkel}
            />
          )
        }
      </ul>

      <div
        style={{
          display: 'flex',
          maxWidth: '95%',
          padding: '1rem 3rem 1rem 0',
          margin: '1rem auto',
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}
      >
        <label htmlFor='content'>testing api... not complete</label>
        <br />
        <input
          type='text'
          id='content'
          onChange={(e) => setContent(e.target.value)}
          value={content}
          className='input-1'
        />
        <button
          className='btn-4'
          style={{ marginTop: '1rem' }}
          onClick={() => {
            const curr: string = content.trim();
            if (curr.length > 0) {
              const result = addUser.mutateAsync(curr);
              Promise.resolve(result)
                .then((res) => {
                  console.log(res, 'res');
                })
                .catch((error: SqliteError) => {
                  console.error(error, 'catch error');
                })
                .finally(() => {
                  setContent('');
                });
            }
          }}
          type='button'
        >
          add todo
        </button>
      </div>
    </div>
  );
}
