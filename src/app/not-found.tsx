import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '5rem',
        fontWeight: 'bold',
      }}
    >
      <h2>404</h2>
      <Link href='/'>Return Home</Link>
    </div>
  );
}
