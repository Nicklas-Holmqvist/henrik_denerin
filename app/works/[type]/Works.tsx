'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import Solos from './Solos';
import { Tag } from '../../../types/tags';
import { WorksInterface } from '../../../types/works';

interface WorksProps {
  type: string;
}
export interface SoloTags {
  allSoloTags: SoloTag[];
}

export interface SoloTag {
  soloTagTitle: string;
  id: number;
}

const Works: React.FC<WorksProps> = ({ type }) => {
  const [data, setData] = useState<WorksInterface | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [soloTags, setSoloTags] = useState<SoloTags | undefined>(undefined);

  useEffect(() => {
    const fetchWorks = async (tagID: Tag[]) => {
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tagID }),
        next: { revalidate: 3600 },
      };
      const res = await fetch(`/api/works/category?type=${type}`, options);
      const response = await res.json();
      setData(response);
      setLoading(false);
    };
    const fetchTags = async () => {
      const res = await fetch(`/api/tags`, { next: { revalidate: 3600 } });
      const response = await res.json();

      const tagID: Tag[] = response.allTags.filter(
        (tag: Tag) => tag.tagtitle === type
      );
      fetchWorks(tagID);
    };

    if (type === 'solos') {
      const fetchSoloTags = async () => {
        const res = await fetch(`/api/solotags`, {
          next: { revalidate: 3600 },
        });
        const response = await res.json();
        setSoloTags(response);
      };
      fetchSoloTags();
    }

    fetchTags();
  }, [type]);

  return (
    <article className="max-w-2xl m-auto px-5 lg:max-2xl:px-0">
      {loading && data === undefined ? null : (
        <>
          {type === 'all' ? (
            <h1 className="pb-6 underline-offset-4 underline pb-1">
              {type} works [chronological]
            </h1>
          ) : type !== 'solos' ? (
            <h1 className="pb-6 underline-offset-4 underline pb-1">{type}</h1>
          ) : undefined}
          {type === 'solos' ? (
            <Solos data={data!.allWorkinfos} type={type} soloTags={soloTags!} />
          ) : (
            <>
              {data!.allWorkinfos.map((work) => (
                <>
                  <Link key={work.id} href={`/works/${type}/${work.param}`}>
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
        </>
      )}
    </article>
  );
};

export default Works;
