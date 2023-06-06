import { datoRequest } from '@/lib/datocms';
import { NextResponse } from 'next/server';

export interface Error {
  msg: string;
  status: boolean;
}

export interface WorksInterface {
  allWorkinfos: Works[];
}

export interface Works {
  title: string;
  year: string;
  instrument: string;
  id: number;
  tags: {
    tagtitle: string;
  };
}

export interface TagsInterface {
  allTags: Tag[];
}

interface Tag {
  id: number;
  tagtitle: string;
}

export async function GET(request: Request) {
  const errorTagID: number = 156210071;
  const { searchParams } = new URL(request.url);

  //Get url param
  const type = searchParams.get('type');

  const tagQuery = `query Tags {
    allTags {
      id
      tagtitle
    }
  }`;

  let tagResponse: TagsInterface | undefined = (await datoRequest({
    query: tagQuery,
  })) as TagsInterface;

  const tagID: Tag[] = tagResponse.allTags.filter(
    (tag) => tag.tagtitle === type
  );

  console.log(tagID);

  try {
    const query = `query Works {
          allWorkinfos(filter: {tags: {allIn: ${tagID[0].id}}}) {
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
    console.log(response);
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
