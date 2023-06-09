import { datoRequest } from '@/lib/datocms';
import { NextResponse } from 'next/server';

export interface Error {
  msg: string;
  status: boolean;
}

export async function POST(request: Request) {
  const errorTagID: number = 156210071;
  const { tagID } = await request.json();

  try {
    const query = `query Works {
          allWorkinfos(filter: {tags: {allIn: ${tagID[0].id}}}, orderBy: year_ASC, first: 100) {
            title
            year
            instrument
            id
            tags {
              tagtitle
            }
          }
        }`;
    const response = await datoRequest({
      query: query,
    });
    return NextResponse.json(response);
  } catch (error) {
    const query = `query Works {
      allWorkinfos(filter: {tags: {allIn: ${errorTagID}}}) {
        title
        year
        instrument
        id
        tags {
          tagtitle
        }
      }
    }`;
    const response = await datoRequest({
      query: query,
    });
    return NextResponse.json(response);
  }
}
