import type { Metadata } from 'next';

type AuthorType = Metadata['authors'];
type CreatorType = Metadata['creator'];
type KeywordsType = Metadata['keywords'];
type DescriptionType = Metadata['description'];
type IconsType = Metadata['icons'];

export const authors: AuthorType = [
  { name: 'chase ottofy', url: 'https://ottofy.dev' },
];
export const creator: CreatorType = 'chase ottofy';
export const description: DescriptionType = 'nextjs w/ api';
export const icons: IconsType = [
  {
    rel: 'icon',
    type: 'image/svg+xml',
    sizes: 'any',
    url: '/favicon.svg',
  },

];
export const keywords: KeywordsType = [
  'ottofy',
  'chaseottofy',
  'react',
  'nextjs',
  'react-hook-form',
  'zod',
  'drizzle',
  'sqlite',
  'nextjs-api',
];
