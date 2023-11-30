import * as React from 'react';
import type { Metadata } from 'next';

import Main from '@/components/Main/Main';
import UserDash from '@/components/Users/UsersDash';

import { serverClient } from './_trpc/serverClient';
import * as shared from './meta';

export const metadata: Metadata = {
  title: 'next app',
  ...shared,
};

export default async function Home() {
  const users = await serverClient.getUsers();

  return (
    <Main>
      <UserDash initialData={users} />
    </Main>
  );
}
