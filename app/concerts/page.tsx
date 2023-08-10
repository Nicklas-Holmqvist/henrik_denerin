import React, { Suspense } from 'react';
import { notFound } from 'next/navigation';

import Concert from './Concert';
import { ConcertsInterface } from '@/types/concerts';

export const metadata = {
  title: 'Concerts | Composer Henrik Denerin portfolio',
};

async function getConcerts() {
  const res = await fetch(`${process.env.API}/concerts`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) return notFound();

  return res.json();
}

const ConcertsPage = async () => {
  const concerts: ConcertsInterface[] = await getConcerts();

  const years = sortYear(concerts);

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

  return (
    <Suspense fallback={<div></div>}>
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
    </Suspense>
  );
};

export default ConcertsPage;
