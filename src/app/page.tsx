import Link from 'next/link';

export default function Home() {
  return (
    <div className="container" style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Welcome to CRUD App</h1>
      <p style={{ margin: '20px 0' }}>A simple app built with NestJS & NextJS</p>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <Link href="/login">
          <button className="btn-primary">Login</button>
        </Link>
        <Link href="/register">
          <button className="btn-secondary">Register</button>
        </Link>
      </div>
    </div>
  );
}