import React, { Suspense } from 'react';
import AllConcerts from '../components/AllConcerts';

interface ConcertsProps {}

export const metadata = {
  title: 'Concerts | Composer Henrik Denerin portfolio',
};

const ConcertsPage: React.FC<ConcertsProps> = () => {
  return (
    <Suspense fallback={<div></div>}>
      <AllConcerts />;
    </Suspense>
  );
};

export default ConcertsPage;
