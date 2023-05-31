import { request } from '@/lib/datocms';
import Link from 'next/link';
import React from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

export interface WorkInterface {
  workinfo: {
    title: string;
    year: string;
    instrument: string;
    duration: string;
    dedication?: string;
    commision?: string;
    premiere?: string;
    programnote?: any;
    testprogramnote?: {
      value: any;
    };
    media?: string;
    excerpt?: {
      title: string;
      url: string;
    };
    babelscore?: string;
    tags?: {
      tagTitle: string;
    };
    id: number;
  };
}

async function fetchwork(id: number) {
  const query = `query work {
      workinfo(filter:{id: {eq:${id}}}) {
        title
        year
        instrument
        duration
        dedication
        commision
        premiere
        programnote
        testprogramnote {
          value
        }
        media
        excerpt {
          title
          url
        }
        babelscore
        tags {
          tagtitle
        }
        id
      }
    }`;

  const response = await request({
    query: query,
  });
  const work = await response;
  console.log(work);
  if (work !== null) return work;
  else return null;
}

interface WorkInfoProps {
  id: number;
}

const WorkInfo: React.FC<WorkInfoProps> = async ({ id }) => {
  const work: WorkInterface = await fetchwork(id);
  return (
    <section>
      <h1 key={work.workinfo.id} className="text-center">
        {work.workinfo.title} [{work.workinfo.year}]
      </h1>
      <h3 className="text-center pb-3 pt-2">for {work.workinfo.instrument}</h3>
      <p className="text-center py-1">
        <span className="font-bold">duration:</span> {work.workinfo.duration}
      </p>
      {work.workinfo.dedication ? (
        <p className="text-center py-1">
          <span className="font-bold">written for:</span>{' '}
          {work.workinfo.dedication}
        </p>
      ) : null}
      {work.workinfo.premiere ? (
        <p className="text-center py-1">
          <span className="font-bold">first performance:</span>{' '}
          {work.workinfo.premiere}
        </p>
      ) : null}
      <p className="text-center font-bold py-1">
        score published by{' '}
        <Link
          className="underline"
          href={`${work.workinfo.babelscore}`}
          rel="noopener noreferrer"
          target="_blank">
          Babelscore
        </Link>
      </p>
      {work.workinfo.programnote ? (
        <ReactMarkdown className="max-w-4xl m-auto py-4">
          {work.workinfo.programnote}
        </ReactMarkdown>
      ) : null}
    </section>
  );
};

export default WorkInfo;
