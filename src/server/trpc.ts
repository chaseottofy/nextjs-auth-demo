import { initTRPC } from '@trpc/server';

const t = initTRPC.create();

const {
  router,
  procedure: publicProcedure,
} = t;

export {
  publicProcedure,
  router,
};
