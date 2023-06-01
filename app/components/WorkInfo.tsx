'use client';

import Link from 'next/link';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import React, { useEffect, useState } from 'react';

import MediaPlayer from './MediaPlayer';
import { WorkInterface } from '@/types/work';

interface WorkInfoProps {
  id: number;
}

const WorkInfo: React.FC<WorkInfoProps> = ({ id }: WorkInfoProps) => {
  const [data, setData] = useState<WorkInterface | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchWork = async () => {
      const res = await fetch(`/api/work/song?id=${id}`);
      const response = await res.json();
      setData(response);
      setLoading(false);
    };
    fetchWork();
  }, [id]);

  return (
    <section>
      {loading ? null : (
        <>
          <h1 key={data!.workinfo.id} className="text-center">
            {data!.workinfo.title} [{data!.workinfo.year}]
          </h1>
          <h3 className="text-center pb-3 pt-2">
            for {data!.workinfo.instrument}
          </h3>
          <p className="text-center py-1">
            <span className="font-bold">duration:</span>{' '}
            {data!.workinfo.duration}
          </p>
          {data!.workinfo.dedication ? (
            <p className="text-center py-1">
              <span className="font-bold">written for:</span>{' '}
              {data!.workinfo.dedication}
            </p>
          ) : null}
          {data!.workinfo.premiere ? (
            <p className="text-center py-1">
              <span className="font-bold">first performance:</span>{' '}
              {data!.workinfo.premiere}
            </p>
          ) : null}
          <p className="text-center font-bold py-1">
            score published by{' '}
            <Link
              className="underline"
              href={`${data!.workinfo.babelscore}`}
              rel="noopener noreferrer"
              target="_blank">
              Babelscore
            </Link>
          </p>
          {data!.workinfo.media ? (
            <MediaPlayer url={data!.workinfo.media} />
          ) : null}
          {data!.workinfo.programnote ? (
            <ReactMarkdown className="max-w-4xl m-auto py-4">
              {data!.workinfo.programnote}
            </ReactMarkdown>
          ) : null}
        </>
      )}
    </section>
  );
};

export default WorkInfo;
