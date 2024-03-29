import { datoRequest } from '@/lib/datocms';
import { NextResponse } from 'next/server';

export interface Error {
  msg: string;
  status: number;
}

export async function POST(request: Request) {
  const { id } = await request.json();
  const query = `query work {
    workinfo(filter: {param: {eq:"${id}"}}) {
      title
      year
      instrument
      duration
      dedication
      commision
      premiere
      programnote
      media
      spotify
      excerpt {
        title
        url
      }
      babelscore
      tags {
        tagtitle
      }
      id
      param
    }
  }`;
  const errorMsg: Error = {
    msg: 'No data to be found',
    status: 404,
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
