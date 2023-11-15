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


export const appRouter = router({
  getUsers: publicProcedure
    .query(() => {
      // await db.select().from(users).all();
      const res = db.select().from(users).all();
      return res || [];
    }),

  // e.g. addUser.mutate('hello')
  addUser: publicProcedure
    .input(z.string()).mutation(async (opts) => {
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
      await db
        .update(users)
        .set({ done: opts.input.done })
        .where(eq(users.id, opts.input.id));
      return true;
    }),
});

export type AppRouter = typeof appRouter;
// getUser: publicProcedure.query(async (id: number) => {
//   return await db.select().from(users).where(eq(users.id, id)).first();
// }),
