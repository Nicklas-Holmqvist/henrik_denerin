import React, { Suspense } from 'react';

import Works from '@/app/works/[type]/Works';

export const metadata = {
  title: 'Works | Composer Henrik Denerin portfolio',
};

interface WorkCategoryProps {
  params: { type: string };
}

const WorkCategoryPage: React.FC<WorkCategoryProps> = ({
  params: { type },
}) => {
  const formatString = type.replace(/%20/g, ' ').replace(/%3E/g, '<');
  return (
    <section>
      <Suspense fallback={<div></div>}>
        <Works type={formatString} />
      </Suspense>
    </section>
  );
};

export default WorkCategoryPage;
