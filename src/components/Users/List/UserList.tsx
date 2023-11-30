'use client';

import * as React from 'react';

// import { useEffect, useRef, useState } from 'react';
import { GetUsersResponsePayload } from '@/models/interfaces';

import styles from './UserList.module.css';

const getDateTime = (): string => new Date()
  .toLocaleTimeString('en-US', {
    localeMatcher: 'best fit',
    hour: 'numeric',
    minute: 'numeric',
    second: undefined,
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });

export default function UserList({
  resolvedData,
}: {
  resolvedData: GetUsersResponsePayload[];
}) {
  return (
    <ul
      className={styles.log}
      data-custom-scrollbar
    >
      <span className={styles.datetime}>{getDateTime()}</span>
      {/* {!resolvedScroll && (<CustomSkeleton className={styles.usersSkel} />)} */}
      {resolvedData?.map((user) => (
        <li
          key={user.id}
          className={styles['log-item']}
        >
          <span className={styles['log-item--id']}>{user.id}</span>
          <span className={styles['log-item--content']}>{user?.content}</span>
          <span className={styles['log-item--done']}>{user?.done}</span>
        </li>
      ))}
    </ul>
  );
}
