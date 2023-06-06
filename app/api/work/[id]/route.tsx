import { datoRequest } from '@/lib/datocms';
import { NextResponse } from 'next/server';

export interface Error {
  msg: string;
  status: boolean;
}

export async function POST(request: Request) {
  const { workID } = await request.json();

  const query = `query work {
    workinfo(filter:{id: {eq:${workID}}}) {
      title
      year
      instrument
      duration
      dedication
      commision
      premiere
      programnote
      media
      excerpt {
        title
        url
      }
      babelscore
      tags {
        tagtitle
      }
      id
    }
  }`;
  const errorMsg: Error = {
    msg: 'No data to be found',
    status: false,
  };

  try {
    const response = await datoRequest({
      query: query,
    });
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ errorMsg });
  }
}
