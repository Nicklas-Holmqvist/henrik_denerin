import Link from 'next/link';
import React from 'react';

import { SoloTags } from './Works';
import { Works } from '../../types/works';

interface SolosProps {
  data: {
    id: number;
    param: string;
    year: string;
    title: string;
    instrument: string;
  }[];
  type: string;
  soloTags: SoloTags;
}

const Solos: React.FC<SolosProps> = ({ data, type, soloTags }) => {
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
            className="pb-7 underline-offset-4 underline pt-8"
            key={instrument}>
            {instrument}
          </h2>
          {data.map((work: Works) => (
            <>
              {work.soloTag!.soloTagTitle === instrument ? (
                <Link key={work.id} href={`/works/${type}/${work.param}`}>
                  <h3 className="py-2.5">
                    {work.title} [{work.year}]{' '}
                    <span className="font-normal">
                      {' '}
                      &mdash; {work.instrument}
                    </span>
                  </h3>
                </Link>
              ) : null}
            </>
          ))}
        </div>
      ))}
    </>
  );
};

export default Solos;
