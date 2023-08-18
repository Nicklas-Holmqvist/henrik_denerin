import React, { Suspense } from 'react';

import WorkInfo from '@/app/works/[type]/[id]/WorkInfo';
import { Metadata } from 'next/types';
import { WorkInterface } from '@/types/work';
import { notFound } from 'next/navigation';

interface WorkInfoProps {
  params: { id: string };
}

export async function generateMetadata({
  params: { id },
}: WorkInfoProps): Promise<Metadata> {
  const work: WorkInterface = await getWork(id);

  if (work.workinfo !== null) {
    return {
      title: `${work.workinfo.title} | HENRIK DENERIN – composer`,
      description: `${
        work.workinfo.programnote !== ''
          ? work.workinfo.programnote.slice(0, 50)
          : ''
      }`,
    };
  }
  return {
    title: 'No work to be find! | HENRIK DENERIN – composer',
  };
}

async function getWork(id: string) {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
    next: { revalidate: 60 },
  };
  const res = await fetch(`${process.env.API}/work/song?id=${id}`, options);
  const work = await res.json();

  if (work.workinfo === null) return notFound();
  return work;
}

const Work = async ({ params: { id } }: WorkInfoProps) => {
  const work: WorkInterface = await getWork(id);

  return (
    <main className="">
      <Suspense fallback={<div></div>}>
        <WorkInfo data={work} />
      </Suspense>
    </main>
  );
};

export default Work;
