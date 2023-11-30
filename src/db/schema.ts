import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  content: text('content'),
  // completionAt: integer('completion_at', { mode: 'timestamp' }),
  done: integer('done'),
});

// export const users = sqliteTable('users', {
//   id: integer('id').primaryKey(),
//   email: text('email'),
//   password: text('password'),
// });

/*
const { email: maxEmail, password: maxPassword } = MAX_INPUT_LENGTHS;
export const schema = z
  .object({
    email: z.string().max(maxEmail).email({
      message: 'Invalid email address',
    }),
    // - min 6 characters
    // - max 20 characters
    // - at least 1 uppercase letter
    // - at least 1 lowercase letter
    // - at least 1 number or special character (e.g. !@#$%^&*()
    // - no spaces
    password: z.string().max(maxPassword).regex(PASSWORD_REGEX, {
      message: 'length: 6 to 20 -- upper + lower case(s)\n1 special char or number.',
    }),
    remember: z.boolean(),
  })
  // handle duplicates
  .transform((data, ctx) => {
    const { email, password } = data;
    if (password.toLowerCase() === email.toLowerCase() && password.length >= 6) {
ctx.addIssue({ code: 'custom', message: 'Password and email must be different', path: ['email'] });
ctx.addIssue({ code: 'custom',
message: 'Password and email must be different', path: ['password'] });
    }
    return data;
  });

export type User = z.infer<typeof schema>;
*/
