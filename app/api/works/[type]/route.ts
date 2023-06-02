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
  allTags: Tag[];
}

interface Tag {
  id: number;
  tagtitle: string;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  const tagQuery = `query Tags {
    allTags {
      id
      tagtitle
    }
  }`;

  const tagResponse: TagsInterface | undefined = (await datoRequest({
    query: tagQuery,
  })) as TagsInterface;

  const errorTag: TagsInterface = {
    allTags: [
      {
        id: 156210071,
        tagtitle: 'all',
      },
    ],
  };

  const category: Tag[] = tagResponse.allTags.filter(
    (tag) => tag.tagtitle === type
  );

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
      allWorkinfos(filter: {tags: {allIn: ${errorTag.allTags[0].id}}}) {
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
