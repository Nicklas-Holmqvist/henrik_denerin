import { datoRequest } from '../../../lib/datocms';
import { NextResponse } from 'next/server';

export interface Error {
  msg: string;
  status: boolean;
}

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

export async function GET() {
  const errorMsg: Error = {
    msg: 'No data to be found',
    status: false,
  };
  let response: any = [];
  try {
    const res: any = await datoRequest({
      query: query,
    });
    response.push({ allConcerts: res.allConcerts });
    if (res._allConcertsMeta.count >= 100) {
      const secondRes: any = await datoRequest({
        query: secondQuery,
      });
      return NextResponse.json(
        (response = response[0].allConcerts.concat(secondRes.allConcerts))
      );
    }
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ errorMsg });
  }
}
