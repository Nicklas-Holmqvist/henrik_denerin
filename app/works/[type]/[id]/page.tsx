import WorkInfo from '@/app/components/WorkInfo';
import React, { Suspense } from 'react';

interface WorkInfoProps {
  params: { id: number };
}

const WorkInfoPage: React.FC<WorkInfoProps> = ({ params: { id } }) => {
  return (
    <div>
      <h2>{id}</h2>
      <Suspense fallback={<div>Laddar...</div>}>
        <WorkInfo id={id} />
      </Suspense>
    </div>
  );
};

export default WorkInfoPage;
