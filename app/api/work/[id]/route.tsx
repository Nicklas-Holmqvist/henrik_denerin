import { datoRequest } from '@/lib/datocms';
import { NextResponse } from 'next/server';

export interface Error {
  msg: string;
  status: boolean;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  const query = `query work {
    workinfo(filter:{id: {eq:${id}}}) {
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
