// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/http-errors/index.d.ts

// https://www.npmjs.com/package/json-server
/**
 * @fileoverview fakeApi
 * 1. npm run api (starts json-server)
 * 2. npm run dev (starts react app)
 *
 * run in different terminals
 */
import { BASE_URL, ERROR_MESSAGES } from '@/data/constants';
import { UserInterface } from '@/models/interfaces';

export interface Response {
  ok: boolean;
  status: number;
  statusText: string;
  url: string;
  json(): Promise<UserInterface[]> | Promise<[]>;
}

export interface HandleApiInterface {
  get(): Promise<UserInterface[]> | Promise<[]>;
  put(user: UserInterface): Promise<UserInterface[]> | Promise<[]>;
  post?(user: UserInterface): void;
}

const checkStatus = (response: Response): Promise<Response> => {
  if (response.ok) {
    return Promise.resolve(response);
  }

  const httpErrorInfo: { status: number, statusText: string, url: string; } = {
    status: response.status,
    statusText: response.statusText,
    url: response.url,
  };

  console.warn(`log server http error: ${JSON.stringify(httpErrorInfo)}`);
  const statusMessage: string | undefined = ERROR_MESSAGES[httpErrorInfo?.status];

  try {
    throw new Error(statusMessage || httpErrorInfo.statusText);
  } catch (error) {
    console.error(error);
  }

  return Promise.reject(new Error(statusMessage || httpErrorInfo.statusText));
};

const handleApi: HandleApiInterface = {
  async get() {
    // async get(page: number = 1, limit: number = 10) {
    try {
      // const response = await fetch(`${BASE_URL}?_page=${page}&_limit=${limit}`);
      const response = await fetch(`${BASE_URL}`);
      const response1 = await checkStatus(response);
      const data = await (response1 ? response1.json() : []);
      if (!data) {
        throw new Error('No data found');
      }
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  },

  async put(user: UserInterface) {
    try {
      const response = await fetch(`${BASE_URL}${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      const response1 = await checkStatus(response);
      const data = await (response1 ? response1.json() : []);
      if (!data) {
        throw new Error('No data found');
      }
      console.warn(data);
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  },

  // async post(user: UserInterface) {
  //   try {
  //     const response = await fetch(`${BASE_URL}`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(user),
  //     });
  //     const responseMessage = await checkStatus(response);
  //     return responseMessage;
  //   } catch (error) {
  //     console.warn(`log client error: ${error}`);
  //     return [];
  //   } finally {
  //     console.warn(`log client finally: ${JSON.stringify(user)}`);
  //   }
  // },
};

export default handleApi;
