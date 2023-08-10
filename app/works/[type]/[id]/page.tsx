import React, { Suspense } from 'react';

import WorkInfo from '@/app/works/[type]/[id]/WorkInfo';

export const metadata = {
  title: 'Work | Composer Henrik Denerin portfolio',
};

interface WorkInfoProps {
  params: { id: string };
}

async function getWork(id: string) {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
    next: { revalidate: 60 },
  };
  const res = await fetch(`${process.env.API}/work/song?id=${id}`, options);
  return res.json();
}

const Work = async ({ params: { id } }: WorkInfoProps) => {
  const work = await getWork(id);
  return (
    <main className="px-5 lg:max-2xl:px-0 pt-16">
      <Suspense fallback={<div></div>}>
        <WorkInfo data={work} />
      </Suspense>
    </main>
  );
};

export default Work;
