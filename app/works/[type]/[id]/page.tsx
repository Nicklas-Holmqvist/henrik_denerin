import React, { Suspense } from 'react';
import { Metadata } from 'next/types';

import { WorkInterface } from '@/types/work';
import { datoRequest } from '@/lib/datocms';
import { notFound } from 'next/navigation';
import WorkInfo from '@/app/works/[type]/[id]/WorkInfo';

interface WorkInfoProps {
  params: { id: string };
}

export const revalidate = 0;

export async function generateMetadata({
  params: { id },
}: WorkInfoProps): Promise<Metadata> {
  const response: WorkInterface = await getWork(id);

  if (response.workinfo !== null) {
    return {
      title: `${response.workinfo.title} | HENRIK DENERIN – composer`,
      description: `${
        response.workinfo.programnote !== ''
          ? response.workinfo.programnote.slice(0, 50)
          : ''
      }`,
    };
  }
  return {
    title: 'No work to be find! | HENRIK DENERIN – composer',
  };
}

async function getWork(id: string) {
  const query = `query work {
    workinfo(filter: {param: {eq:"${id}"}}) {
      title
      year
      instrument
      duration
      dedication
      commision
      premiere
      programnote
      media
      spotify
      excerpt {
        title
        url
      }
      babelscore
      tags {
        tagtitle
      }
      id
      param
    }
  }`;

  const response: any = datoRequest({
    query: query,
  });

  if (response.workinfo === null) return notFound();
  return response;
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
