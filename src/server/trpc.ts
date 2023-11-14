import { initTRPC } from '@trpc/server';

const t = initTRPC.create();

const {
  router: router,
  procedure: publicProcedure,
} = t;

export {
  router,
  publicProcedure,
};
