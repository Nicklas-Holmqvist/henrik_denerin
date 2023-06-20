import Link from 'next/link';
import React from 'react';

interface SolosProps {
  data: {
    id: number;
    year: string;
    title: string;
    instrument: string;
  }[];
  type: string;
}

const Solos: React.FC<SolosProps> = ({ data, type }) => {
  function sortIntruments() {
    let instrumentList = [];
    for (let work of data) {
      instrumentList.push(work.instrument);
    }
    let uniqueInstruments = [...new Set(instrumentList)];
    return uniqueInstruments;
  }
  const instruments = sortIntruments();
  return (
    <>
      {instruments.map((instrument) => (
        <div key={instrument} className="pb-3">
          <h3 className="underline-offset-8 underline pb-1" key={instrument}>
            {instrument}
          </h3>
          {data.map((work) => (
            <>
              {work.instrument === instrument ? (
                <Link key={work.id} href={`/works/${type}/${work.id}`}>
                  <h3 className="py-1">
                    {work.title} [{work.year}]
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
