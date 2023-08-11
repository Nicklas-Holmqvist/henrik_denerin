import Link from 'next/link';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react';

import Solos from './Solos';
import { Tag } from '@/types/tags';
import { WorksInterface } from '@/types/works';
import { Metadata, ResolvingMetadata } from 'next/types';

interface WorkCategoryProps {
  params: { type: string };
}

async function getWorkList(tagId: Tag[]) {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tagId }),
    next: { revalidate: 3600 },
  };
  const res = await fetch(
    `${process.env.API}/works/category?type=${tagId}`,
    options
  );

  if (!res.ok) return notFound();

  return res.json();
}

type MetaProps = {
  params: { type: string };
};

export async function generateMetadata({
  params,
}: MetaProps): Promise<Metadata> {
  const formatString = params.type.replace(/%20/g, ' ').replace(/%3E/g, '<');

  const tagTitle = await getTags(formatString);
  return {
    title: `${
      tagTitle[0].tagtitle === 'all' ? 'all works' : tagTitle[0].tagtitle
    } | Composer Henrik Denerin portfolio`,
  };
}

async function getTags(type: string) {
  const res = await fetch(`${process.env.API}/tags`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) return notFound();

  const response = await res.json();

  const tagId: Tag[] = response.allTags.filter(
    (tag: Tag) => tag.tagtitle === type
  );
  return tagId;
}

const WorkCategoryPage = async ({ params: { type } }: WorkCategoryProps) => {
  const formatString = type.replace(/%20/g, ' ').replace(/%3E/g, '<');

  const tagId = await getTags(formatString);
  const workList: WorksInterface = await getWorkList(tagId);

  return (
    <main className="max-w-2xl m-auto pt-16 px-5 lg:max-2xl:px-0">
      <Suspense fallback={<div></div>}>
        {type === 'all' ? (
          <h1 className="pb-6 underline-offset-4 underline pb-1">
            {type} works [chronological]
          </h1>
        ) : type !== 'solos' ? (
          <h1 className="pb-6 underline-offset-4 underline pb-1">
            {formatString}
          </h1>
        ) : undefined}
        {type === 'solos' ? (
          /* @ts-expect-error Server Component */
          <Solos workList={workList!.allWorkinfos} type={formatString} />
        ) : (
          <>
            {workList.allWorkinfos.map((work) => (
              <>
                <Link
                  key={work.id}
                  href={`/works/${formatString}/${work.param}`}>
                  <h3 className="py-2.5">
                    {work.title} [{work.year}]
                    <span className="font-normal">
                      {' '}
                      &mdash; {work.instrument}
                    </span>
                  </h3>
                </Link>
              </>
            ))}
          </>
        )}
      </Suspense>
    </main>
  );
};

export default WorkCategoryPage;
