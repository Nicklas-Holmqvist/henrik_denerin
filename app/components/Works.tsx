'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export interface WorksInterface {
  allWorkinfos: {
    title: string;
    year: string;
    instrument: string;
    id: number;
    tags: {
      tagtitle: string;
    }[];
  }[];
}

interface WorksProps {
  type: string;
}

const Works: React.FC<WorksProps> = ({ type }) => {
  const [data, setData] = useState<WorksInterface | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchWorks = async () => {
      const res = await fetch(`/api/works/category?type=${type}`);
      const response = await res.json();
      setData(response);
      setLoading(false);
    };
    fetchWorks();
  }, [type]);

  return (
    <article>
      {loading ? (
        true
      ) : (
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
