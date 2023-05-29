import Link from 'next/link';
import React from 'react';

interface WorkCategoryProps {
  params: { type: string };
}

const WorkCategoryPage: React.FC<WorkCategoryProps> = ({
  params: { type },
}) => {
  return (
    <div>
      <h2>{type}</h2>
      <Link href={`/works/${type}/158625138`}>Gå till stycke</Link>
    </div>
  );
};

export default WorkCategoryPage;
