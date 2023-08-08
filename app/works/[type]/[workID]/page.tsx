import React, { Suspense } from 'react';

import WorkInfo from '@/app/components/WorkInfo';

export const metadata = {
  title: 'Work | Composer Henrik Denerin portfolio',
};

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
