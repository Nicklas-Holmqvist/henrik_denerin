import { request } from '@/lib/datocms';
import React from 'react';

export interface WorkInterface {
  workinfo: {
    title: string;
    year: string;
    intrument: string;
    duration: string;
    dedication?: string;
    commision?: string;
    premiere?: string;
    programnote?: string;
    media?: string;
    excerpt?: {
      title: string;
      url: string;
    };
    babelscore?: string;
    tags?: {
      tagTitle: string;
    };
    id: number;
  };
}

async function fetchConcert(id: number) {
  const query = `query Concert {
      workinfo(filter:{id: {eq:${id}}}) {
        title
        year
        instrument
        duration
        dedication
        commision
        premiere
        programnote
        media
        excerpt {
          title
          url
        }
        babelscore
        tags {
          tagtitle
        }
        id
      }
    }`;

  const response = await request({
    query: query,
  });
  const concert = await response;
  if (concert !== null) return concert;
  else return null;
}

interface WorkInfoProps {
  id: number;
}

const WorkInfo: React.FC<WorkInfoProps> = async ({ id }) => {
  const concert: WorkInterface = await fetchConcert(id);
  return (
    <div>
      {concert !== undefined ? <h3>{concert.workinfo.title}</h3> : null}
    </div>
  );
};

export default WorkInfo;
