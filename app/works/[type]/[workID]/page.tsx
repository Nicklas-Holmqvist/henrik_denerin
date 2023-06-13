import React, { Suspense } from 'react';

import WorkInfo from '@/app/components/WorkInfo';

interface WorkInfoProps {
  params: { workID: number };
}

const WorkInfoPage: React.FC<WorkInfoProps> = ({ params: { workID } }) => {
  return (
    <div>
      <Suspense fallback={<div></div>}>
        <WorkInfo workID={workID} />
      </Suspense>
    </div>
  );
};

export default WorkInfoPage;
