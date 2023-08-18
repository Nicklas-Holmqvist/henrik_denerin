import Link from 'next/link';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react';

import Solos from './Solos';
import { Tag } from '@/types/tags';
import { WorksInterface } from '@/types/works';
import { Metadata } from 'next/types';

interface WorkCategoryProps {
  params: { type: string };
}

export async function generateMetadata({
  params,
}: WorkCategoryProps): Promise<Metadata> {
  const formatString = params.type.replace(/%20/g, ' ').replace(/%3E/g, '<');

  const tagTitle = await getTags(formatString);

  if (tagTitle.length !== 0) {
    return {
      title: `${
        tagTitle[0].tagtitle === 'all' ? 'all works' : tagTitle[0].tagtitle
      } | HENRIK DENERIN – composer`,
    };
  }
  return {
    title: 'No work to be find! | Composer Henrik Denerin',
  };
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

  const works = await res.json();
  if (works.allWorkinfos === null || tagId.length === 0) return notFound();

  return works;
}

async function getTags(type: string) {
  const res = await fetch(`${process.env.API}/tags`, {
    next: { revalidate: 3600 },
  });

  const tags = await res.json();
  const tagId: Tag[] = tags.allTags.filter((tag: Tag) => tag.tagtitle === type);

  return tagId;
}

const WorkList = async ({ params: { type } }: WorkCategoryProps) => {
  const formatString = type.replace(/%20/g, ' ').replace(/%3E/g, '<');

  const tagId = await getTags(formatString);
  const workList: WorksInterface = await getWorkList(tagId);

  return (
    <main className="">
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
          <div className="flex flex-col">
            {workList.allWorkinfos.map((work) => (
              <div key={work.id} className="py-2.5">
                <Link href={`/works/${formatString}/${work.param}`}>
                  <h3 className="inline hover:bg-blue hover:text-white duration-75">
                    {work.title} [{work.year}]
                    <span className="font-normal">
                      {' '}
                      &mdash; {work.instrument}
                    </span>
                  </h3>
                </Link>
              </div>
            ))}
          </div>
        )}
      </Suspense>
    </main>
  );
};

export default WorkList;
