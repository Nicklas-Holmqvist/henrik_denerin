import { datoRequest } from '@/lib/datocms';
import { NextResponse } from 'next/server';

export interface Error {
  msg: string;
  status: boolean;
}

export async function POST(request: Request) {
  const { tagId } = await request.json();

  try {
    const query = `query Works {
          allWorkinfos(filter: {tags: {allIn: ${tagId[0].id}}}, orderBy: year_DESC, first: 100) {
            title
            year
            instrument
            id
            param
            tags {
              tagtitle
            }
            soloTag {
              soloTagTitle
            }
          }
        }`;
    const response = await datoRequest({
      query: query,
    });
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(error);
  }
}
