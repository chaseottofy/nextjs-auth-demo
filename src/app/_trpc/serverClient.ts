import { httpBatchLink } from '@trpc/client';

import { appRouter } from '@/server/index';
import { getBaseUrl } from '@/utils/index';

// need to configure

// console.log(process.env.NEXT_PUBLIC_API_URL)`c`

// const baseUrl = getBaseUrl() as string;

export const serverClient = appRouter.createCaller({
  links: [
    httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
    }),
  ],
});

// export const serverClient = appRouter.createCaller({
//   links: [
//     httpBatchLink({
//       url: 'http://localhost:3000/api/trpc',
//     }),
//   ],
// });

/*
export const serverClient = appRouter.createCaller({
  links: [
    httpBatchLink({
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/trpc`,
    }),
  ],
});
*/
