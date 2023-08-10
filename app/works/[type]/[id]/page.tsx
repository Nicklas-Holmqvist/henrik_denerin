import React, { Suspense } from 'react';

import WorkInfo from '@/app/components/WorkInfo';

export const metadata = {
  title: 'Work | Composer Henrik Denerin portfolio',
};

interface WorkInfoProps {
  params: { id: string };
}

const WorkInfoPage: React.FC<WorkInfoProps> = ({ params: { id } }) => {
  return (
    <div>
      <Suspense fallback={<div></div>}>
        <WorkInfo id={id} />
      </Suspense>
    </div>
  );
};

export default WorkInfoPage;
