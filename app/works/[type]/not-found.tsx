import Link from 'next/link';
import React from 'react';

export default function NotFound() {
  return (
    <main className="text-center pt-24">
      <h2 className="text-3xl pb-4">No works to find!</h2>
      <p>We could not find the page you were looking for</p>
      <p>
        Go back to the{' '}
        <Link className="underline" href="/">
          start
        </Link>{' '}
      </p>
    </main>
  );
}
