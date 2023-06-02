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

async function fetchTags(): Promise<TagsInterface> {
  const errorResponse = {
    allTags: [
      {
        id: 156210071,
        tagtitle: 'all',
      },
    ],
  };
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
    return errorResponse;
  }
  return response as TagsInterface;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  const tags: TagsInterface = await fetchTags();

  const errorResponse: TagsInterface = {
    allTags: [
      {
        id: 156210071,
        tagtitle: 'all',
      },
    ],
  };

  const category: {
    id: number;
    tagtitle: string;
  }[] = tags.allTags.filter((tag) => tag.tagtitle === type);
  console.log(category);

  const errorMsg: Error = {
    msg: 'No data to be found',
    status: false,
  };

  try {
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
    const response = await datoRequest({
      query: query,
    });
    return NextResponse.json(response);
  } catch (error) {
    const query = `query Works {
      allWorkinfos(filter: {tags: {allIn: ${errorResponse.allTags[0].id}}}) {
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
