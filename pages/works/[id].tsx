import { useRouter } from 'next/router';
import React from 'react';

interface WorkCategoryProps {}

const WorkCategory: React.FC<WorkCategoryProps> = () => {
  const router = useRouter();
  return <div>{router.query.id}</div>;
};

export default WorkCategory;
