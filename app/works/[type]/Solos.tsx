import Link from 'next/link';
import React from 'react';
import { notFound } from 'next/navigation';

import { SoloTags, Work } from '@/types/works';
import { datoRequest } from '@/lib/datocms';

export const revalidate = 0;

interface SolosProps {
  workList: {
    id: number;
    param: string;
    year: string;
    title: string;
    instrument: string;
  }[];
  type: string;
}

async function getSoloTags() {
  const query = `query SoloTags {
    allSoloTags(orderBy:sort_ASC) {
      soloTagTitle
      id
    }
    }`;
  const response = await datoRequest({
    query: query,
  });

  if (!response) return notFound();

  return response;
}

export default async function Solos({
  workList,
  type,
}: SolosProps): Promise<React.JSX.Element> {
  const soloTags: any = await getSoloTags();

  function sortIntruments() {
    let instrumentList = [];
    for (let work of soloTags.allSoloTags) {
      instrumentList.push(work.soloTagTitle);
    }
    let uniqueInstruments = [...new Set(instrumentList)];
    return uniqueInstruments;
  }
  const instruments = sortIntruments();

  return (
    <>
      {instruments.map((instrument) => (
        <div key={instrument} className="pb-3">
          <h2
            className="pb-7 underline-offset-4 underline pt-8 first:pt-0"
            key={instrument}>
            {instrument}
          </h2>
          {workList.map((work: Work) => (
            <>
              {work.soloTag!.soloTagTitle === instrument ? (
                <div key={work.id} className="py-2.5">
                  <Link
                    href={`/works/${type}/${work.param}`}
                    className="py-2.5">
                    <h3 className="inline hover:bg-blue hover:text-white duration-75">
                      {work.title} [{work.year}]{' '}
                      <span className="font-normal">
                        {' '}
                        &mdash; {work.instrument}
                      </span>
                    </h3>
                  </Link>
                </div>
              ) : null}
            </>
          ))}
        </div>
      ))}
    </>
  );
}
