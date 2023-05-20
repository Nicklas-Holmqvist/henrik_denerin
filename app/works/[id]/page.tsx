import React from 'react';

interface WorkCategoryProps {
  params: { id: string };
}

const WorkCategoryPage: React.FC<WorkCategoryProps> = ({ params: { id } }) => {
  return (
    <div>
      <h2>{id}</h2>
    </div>
  );
};

export default WorkCategoryPage;
