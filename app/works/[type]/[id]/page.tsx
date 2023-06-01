import React, { Suspense } from 'react';

import WorkInfo from '@/app/components/WorkInfo';

interface WorkInfoProps {
  params: { id: number };
}

const WorkInfoPage: React.FC<WorkInfoProps> = ({ params: { id } }) => {
  return (
    <div>
      <Suspense fallback={<div>Laddar...</div>}>
        <WorkInfo id={id} />
      </Suspense>
    </div>
  );
};

export default WorkInfoPage;
