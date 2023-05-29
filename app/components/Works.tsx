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
  const works = await response;
  if (works !== null) return works;
  else return null;
}

async function fetchWorks(tags: TagsInterface, type: string) {
  const cleanType = type.replace('%20', ' ');
  const category = tags.allTags.filter((tag) => tag.tagtitle === cleanType);

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
  const works = await response;
  if (works !== null) return works;
  else return null;
}

interface WorksProps {
  type: string;
}

const Works: React.FC<WorksProps> = async ({ type }) => {
  const tags: TagsInterface = await fetchTags();
  const works: WorksInterface = await fetchWorks(tags, type);

  return (
    <div>
      {works.allWorkinfos.map((work) => (
        <>
          <Link href={`/works/${type}/${work.id}`}>
            <h2 key={work.id}>
              {work.title}
              <span>
                {work.year} - {work.instrument}
              </span>
            </h2>
          </Link>
        </>
      ))}
    </div>
  );
};

export default Works;
