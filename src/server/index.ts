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

const appRouter = router({
  getUsers: publicProcedure
    .query(() => {
      const res = db.select().from(users).all();
      return res || [];
    }),
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
      const { done, id } = opts.input;
      await db
        .update(users)
        .set({ done })
        .where(eq(users.id, id));
      return true;
    }),
  clearDb: publicProcedure
    .mutation(async () => {
      await db.delete(users);
    }),
  clearSome: publicProcedure
    .input(z.number())
    .mutation(async (opts) => {
      const id = opts.input;
      await db.delete(users).where(eq(users.id, id));
      return id;
    }),
});

export type AppRouter = typeof appRouter;

export { appRouter };
