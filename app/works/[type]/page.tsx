import React, { Suspense } from 'react';

import Works from '@/app/components/Works';

interface WorkCategoryProps {
  params: { type: string };
}

const WorkCategoryPage: React.FC<WorkCategoryProps> = ({
  params: { type },
}) => {
  const formatString = type.replace('%20', ' ');
  return (
    <section>
      <Suspense fallback={<div></div>}>
        <Works type={formatString} />
      </Suspense>
    </section>
  );
};

export default WorkCategoryPage;
