// 'use client';

import * as React from 'react';

import type { Metadata } from 'next';
import * as metaShared from './MetaResolve';

import Main from '@/components/Main/Main';
import UserList from '@/components/UserList';

export const metadata: Metadata = {
  title: 'next app',
  ...metaShared,
};

export default function Home() {
  return (
    <Main>
      <h1>
        JUST TESTING ROUTER, LOGIN NOT IMPLEMENTED YET
      </h1>
      <UserList />
    </Main>
  );
}
