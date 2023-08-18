import React from 'react';
import Link from 'next/link';

import { getMonth } from '@/utils/getMonthName';
import { ConcertsInterface } from '@/types/concerts';

interface ConcertProps {
  concert: ConcertsInterface;
}

export const metadata = {
  title: 'Concerts | HENRIK DENERIN – composer',
};

const Concert: React.FC<ConcertProps> = ({ concert }) => {
  const day = new Date(concert.date).getDate();
  const month = new Date(concert.date).getMonth();

  return (
    <>
      <h3 className="font-normal background-text">
        {day} {getMonth(month)}
        {concert.time !== '' ? <span>, {concert.time}</span> : undefined}
      </h3>
      <h4>{concert.place}</h4>
      <p className="font-bold">
        {concert.piece}
        {concert.firstPerformance ? (
          <span className="italic font-normal"> (first performance)</span>
        ) : undefined}
      </p>
      <p className="italic">{concert.performer}</p>
      {concert.additionalInfo !== null ? (
        <p>{concert.additionalInfo}</p>
      ) : undefined}
      {concert.link !== '' ? (
        <Link
          href={`${concert.link}`}
          target="_blank"
          className="border-bottom pb-0.5">
          {concert.linkTitle !== '' ? concert.linkTitle : 'Link'}
        </Link>
      ) : undefined}
    </>
  );
};

export default Concert;
