import React, { Suspense } from 'react';

import { OngoingInterface } from '@/types/ongoing';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

export const metadata = {
  title: 'ongoing | HENRIK DENERIN – composer',
  description: 'Here you can read what is happening in my worklife.',
};

async function getOngoing() {
  const res = await fetch(`https://henrik-denerin.vercel.app/api/ongoing`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) return notFound();

  return res.json();
}

const OngoingPage = async () => {
  const data: OngoingInterface = await getOngoing();
  return (
    <main>
      <Suspense fallback={<div></div>}>
        <h1 className="text-center pb-1 underline-offset-4 underline">
          Ongoing
        </h1>
        {data.allOngoings.map((content) => (
          <>
            <h2 key={content.id} className="text-center pb-1">
              {content.title}
            </h2>
            <ReactMarkdown className="max-w-2xl m-auto py-4 pb-16 markdown">
              {content.content}
            </ReactMarkdown>
          </>
        ))}
      </Suspense>
    </main>
  );
};

export default OngoingPage;
