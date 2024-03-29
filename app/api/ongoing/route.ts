import { datoRequest } from '../../../lib/datocms';
import { NextResponse } from 'next/server';

export interface Error {
  msg: string;
  status: boolean;
}

const query = `query Ongoings {
    allOngoings {
      id
      title
      content(markdown: false)
    }
  }`;

export async function GET() {
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
