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
      await db
        .update(users)
        .set({ done: opts.input.done })
        .where(eq(users.id, opts.input.id));
      // .run();
      return true;
    }),
  clearDb: publicProcedure.mutation(async () => {
    await db.delete(users);
    // await db.deleteFrom(users).run();
    // console.log('cleared');
    // console.log(db.select().from(users).all());
    // return true;
  }),

});

export type AppRouter = typeof appRouter;

export { appRouter };
