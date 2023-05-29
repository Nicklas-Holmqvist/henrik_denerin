import Works from '@/app/components/Works';
import Link from 'next/link';
import React, { Suspense } from 'react';

interface WorkCategoryProps {
  params: { type: string };
}

const WorkCategoryPage: React.FC<WorkCategoryProps> = ({
  params: { type },
}) => {
  return (
    <div>
      <h2>{type}</h2>
      <Suspense fallback={<div>Laddar</div>}>
        <Works type={type} />
      </Suspense>
    </div>
  );
};

export default WorkCategoryPage;
