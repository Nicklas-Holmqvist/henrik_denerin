import { datoRequest } from '@/lib/datocms';
import { NextResponse } from 'next/server';

export interface Error {
  msg: string;
  status: boolean;
}

export interface WorksInterface {
  allWorkinfos: {
    title: string;
    year: string;
    instrument: string;
    id: number;
    tags: {
      tagtitle: string;
    }[];
  }[];
}

export interface TagsInterface {
  allTags: {
    id: number;
    tagtitle: string;
  }[];
}

async function fetchTags(): Promise<TagsInterface | null> {
  const query = `query Tags {
        allTags {
          id
          tagtitle
        }
      }`;
  const response = await datoRequest({
    query: query,
  });
  if (!response) {
    throw new Error('Failed to fetch data');
  }
  return response as TagsInterface;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  const tags: TagsInterface | null = await fetchTags();

  const category = tags!.allTags.filter((tag) => tag.tagtitle === type);

  const query = `query Works {
        allWorkinfos(filter: {tags: {allIn: ${category[0].id}}}) {
          title
          year
          instrument
          id
          tags {
            tagtitle
          }
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
