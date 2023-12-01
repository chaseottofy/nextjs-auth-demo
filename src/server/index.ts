import SqliteDB, { SqliteError } from 'better-sqlite3';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { z } from 'zod';

import { users } from '@/db/schema';

import { publicProcedure, router } from './trpc';

const sqlite = new SqliteDB('sqlite.db');
const db = drizzle(sqlite);

migrate(db, { migrationsFolder: 'drizzle' });

// interface User {
//   id: number;
//   content: string;
//   done: number;
// }

// type AddUserInput = string;

// interface SetDoneInput {
//   id: number;
//   done: number;
// }

// type ClearSomeInput = number;

// export interface AppRouterInterface {
//   // getUsers: () => BuildProcedure<'query', any, User[]>;
//   // getUsers: () => Promise<User[]> | User[];
//   // getUsers: () => Promise<User[]>;
//   getUsers: () => User[];
//   addUser: (input: string) => Promise<boolean>;
//   setDone: (input: {
//     id: number;
//     done: number;
//   }) => Promise<boolean>;
//   clearSome: (input: number) => Promise<number>;
// }

const appRouter = router({
  // getUsers: () => publicProcedure
  //   .query(() => {
  //     const res = db.select().from(users).all();
  //     return res || [];
  //   }),
  getUsers: publicProcedure
    .query(() => {
      const res = db.select().from(users).all();
      return res || [];
      // if (res) {
      //   return res;
      // }
      // return [{
      //   id: 0,
      //   content: 'default',
      //   done: 0,
      // }];
      // return res || [
      //   {
      //     id: 0,
      //     content: 'default',
      //     done: 0,
      //   },
      // ] as User[];
    }),
  addUser: publicProcedure
    .input(z.string())
    .mutation(async (opts) => {
      if (opts.input === 'error') {
        throw new SqliteError('error', 'error');
      }
      await db.insert(users).values({ content: opts.input, done: 0 });
      return true;
    }),
  setDone: publicProcedure
    .input(
      z.object({
        id: z.number(),
        done: z.number(),
      }),
    )
    .mutation(async (opts) => {
      const { done, id } = opts.input;
      await db
        .update(users)
        .set({ done })
        .where(eq(users.id, id));
      return true;
    }),
  clearSome: publicProcedure
    .input(z.number())
    .mutation(async (opts) => {
      const id = opts.input;
      await db
        .delete(users)
        .where(eq(users.id, id));
      return id;
    }),
});

export { appRouter };

export type AppRouter = typeof appRouter;
