'use client';

import * as React from 'react';
import { useState } from 'react';
import { SqliteError } from 'better-sqlite3';
import { trpc } from '@/app/_trpc/client';
import CustomSkeleton from './UI/Skeletons/CustomSkeleton';
// import styles from './TodoList.module.css';

export default function UserList() {
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
    <div>
      <div style={{
        minHeight: '240px',
        maxHeight: '240px',
        height: '100%',
        margin: '1rem auto',
        overflowY: 'auto',
      }}>
        {
          resolvedData ? resolvedData.map((user) => {
            return (
              <div key={user.id}>
                <div>
                  <span>
                    {user.id}
                    {' > '}
                  </span>
                  <span>{user.content}</span>
                </div>
              </div>
            );
          }) : <CustomSkeleton height={240} />
        }
      </div>
      <div>
        <label htmlFor='content'>content</label>
        <input
          type='text'
          id='content'
          onChange={(e) => setContent(e.target.value)}
          value={content}
          className='input-1'
        />
        <button
          className='btn-4'
          onClick={() => {
            const curr: string = content.trim();
            if (curr.length > 0) {
              const result = addUser.mutateAsync(curr);

              Promise.resolve(result)
                .then((res) => {
                  // returns what is returnd in addUser
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
