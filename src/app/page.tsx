// 'use client';

import * as React from 'react';
import type { Metadata } from 'next';

import Main from '@/components/Main/Main';
import UserList from '@/components/Users/UserList';

import * as shared from './meta';

export const metadata: Metadata = {
  title: 'next app',
  ...shared,
};

export default function Home() {
  return (
    <Main>
      <UserList />
    </Main>
  );
}
