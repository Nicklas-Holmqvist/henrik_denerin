import { request } from '@/lib/datocms';
import Link from 'next/link';
import React from 'react';

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

async function fetchTags() {
  const query = `query Tags {
        allTags {
          id
          tagtitle
        }
      }`;
  const response = await request({
    query: query,
  });
  if (response !== null) return response;
  else return null;
}

async function fetchWorks(tags: TagsInterface, type: string) {
  const category = tags.allTags.filter((tag) => tag.tagtitle === type);

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

  const response = await request({
    query: query,
  });
  if (!response) {
    throw new Error('Failed to fetch data');
  }
  return response;
}

interface WorksProps {
  type: string;
}

const Works: React.FC<WorksProps> = async ({ type }) => {
  const tags: TagsInterface = await fetchTags();
  const works: WorksInterface = await fetchWorks(tags, type);

  return (
    <article>
      {works.allWorkinfos.map((work) => (
        <>
          <Link href={`/works/${type}/${work.id}`}>
            <h3 key={work.id} className="text-center py-1">
              {work.title} [{work.year}]
              <span className="font-normal"> &mdash; {work.instrument}</span>
            </h3>
          </Link>
        </>
      ))}
    </article>
  );
};

export default Works;
