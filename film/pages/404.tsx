import React from 'react';
import Link from 'next/link';

export default function Custom404() {
  return (
    <div style={{ padding: '100px 0', textAlign: 'center', fontSize: '24px' }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <p>
        Go back to the{' '}
        <Link href="/">
          <button>Home Page</button>
        </Link>
        .
      </p>
    </div>
  );
}