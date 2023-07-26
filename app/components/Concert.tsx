'use client';

import React from 'react';
import { getMonth } from '@/utils/getMonthName';
import { ConcertInterface } from '@/types/concerts';

interface ConcertProps {
  concert: ConcertInterface;
}

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
      {concert.link !== null ? <p>{concert.link}</p> : undefined}
    </>
  );
};

export default Concert;