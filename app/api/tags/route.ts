import { datoRequest } from '../../../lib/datocms';
import { NextResponse } from 'next/server';

export interface Error {
  msg: string;
  status: boolean;
}

const tagQuery = `query Tags {
    allTags {
      id
      tagtitle
    }
  }`;

export async function GET() {
  const errorMsg: Error = {
    msg: 'No data to be found',
    status: false,
  };

  try {
    const response = await datoRequest({
      query: tagQuery,
    });
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ errorMsg });
  }
}
