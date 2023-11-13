import { NextResponse } from 'next/server';

// import { User } from '@/lib/schema';
import db from './db.json';

// export async function middleware(req, ev) {
// const { email, password } = await req.body.json();
// const user = db.users.find((u) => u.email === email && u.password === password);
// if (user) {
//   return NextResponse.redirect('/dashboard');
// }
// return NextResponse.redirect('/login');
// }

export async function GET() {
  // await new Promise((resolve) => setTimeout(resolve, 1_000));
  return NextResponse.json(db.users);
}
