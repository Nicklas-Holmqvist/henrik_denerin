'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { Tag } from '../../types/tags';
import { WorksInterface } from '../../types/works';

interface WorksProps {
  type: string;
}

const Works: React.FC<WorksProps> = ({ type }) => {
  const [data, setData] = useState<WorksInterface | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchWorks = async (tagID: Tag[]) => {
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tagID }),
      };
      const res = await fetch(`/api/works/category?type=${type}`, options);
      const response = await res.json();
      setData(response);
      setLoading(false);
    };
    const fetchTags = async () => {
      const res = await fetch(`/api/tags`);
      const response = await res.json();

      const tagID: Tag[] = response.allTags.filter(
        (tag: Tag) => tag.tagtitle === type
      );
      fetchWorks(tagID);
    };

    fetchTags();
  }, [type]);

  return (
    <article>
      {loading && data === undefined ? null : (
        <>
          {data!.allWorkinfos.map((work) => (
            <>
              <Link href={`/works/${type}/${work.id}`}>
                <h3 key={work.id} className="text-center py-1">
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
    </article>
  );
};

export default Works;
