import React, { Suspense } from 'react';
import { notFound } from 'next/navigation';

import Concert from './Concert';
import { ConcertsInterface } from '@/types/concerts';
import { datoRequest } from '@/lib/datocms';

export const metadata = {
  title: 'Concerts | HENRIK DENERIN – composer',
};

const query = `query Concerts {
  allConcerts(orderBy: date_DESC, first: 100) {
    date
    place
    piece
    performer
    additionalInfo
    firstPerformance
    time
    link
    linkTitle
  }
  _allConcertsMeta {
    count
  }
}`;

const secondQuery = `query Concerts {
  allConcerts(orderBy: date_DESC, first:100, skip: 100) {
    date
    place
    piece
    performer
    additionalInfo
    firstPerformance
    time
    link
    linkTitle
  }
}`;

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getConcerts() {
  let response: any = [];
  const res: any = await datoRequest({
    query: query,
  });
  response.push({ allConcerts: res.allConcerts });
  if (res._allConcertsMeta.count >= 100) {
    const secondRes: any = await datoRequest({
      query: secondQuery,
    });
    return response[0].allConcerts.concat(secondRes.allConcerts);
  }

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
    <main className="">
      <Suspense fallback={<div></div>}>
        {years?.map((year, id) => (
          <>
            <h2 className="py-7 first:pt-0" key={id}>
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
      </Suspense>
    </main>
  );
};

export default ConcertsPage;
