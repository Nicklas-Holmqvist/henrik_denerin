'use client';

import { ConcertsInterface } from '@/types/concerts';
import React, { useEffect, useState } from 'react';
import Concert from './Concert';

interface ConcertProps {}

const AllConcerts: React.FC<ConcertProps> = ({}) => {
  const [concerts, setConcerts] = useState<ConcertsInterface[] | undefined>(
    undefined
  );
  const [years, setYears] = useState<number[] | undefined>(undefined);

  function sortYear(data: any) {
    let years = [];
    for (let year of data) {
      const getYear = new Date(year.date).getFullYear();
      years.push(getYear);
    }
    let uniqueYear = [...new Set(years)];
    return uniqueYear;
  }

  function findYear(data: any, year: number) {
    return data.includes(year);
  }

  useEffect(() => {
    const fetchConcerts = async () => {
      const res = await fetch(`/api/concerts`, { next: { revalidate: 60 } });
      const response = await res.json();
      setConcerts(response);
      setYears(sortYear(response));
    };
    fetchConcerts();
  }, []);

  return (
    <>
      {concerts === undefined ? undefined : (
        <article className="max-w-2xl m-auto pt-16 px-5 lg:max-2xl:px-0">
          {years?.map((year, id) => (
            <>
              <h2 className="py-7" key={id}>
                {year}
              </h2>
              {concerts.map((concert, id: number) => (
                <>
                  {findYear(concert.date, year) ? (
                    <div key={id} className="py-2.5">
                      <Concert concert={concert} />
                    </div>
                  ) : undefined}
                </>
              ))}
            </>
          ))}
        </article>
      )}
    </>
  );
};

export default AllConcerts;
