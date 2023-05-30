import Link from 'next/link';
import React from 'react';

interface WorksProps {}

const WorksPage: React.FC<WorksProps> = () => {
  return (
    <div>
      <Link href={'/works/simon'}>Länk</Link>
    </div>
  );
};

export default WorksPage;
