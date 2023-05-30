'use client';

import { HeaderInterface } from '@/types/header';
import { useEffect, useState } from 'react';

import Logo from './Logo';
import NavigationItem from './NavigationItem';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const [data, setData] = useState<HeaderInterface | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await fetch('/api/header');
      const response = await res.json();
      setData(response);
      setLoading(false);
    };
    fetchCourses();
  }, []);

  return (
    <>
      {loading ? null : (
        <nav className="flex flex-row justify-between max-w-6xl m-auto py-4">
          <Logo src={data!.logo.image.url} alt={data!.logo.image.alt} />
          <NavigationItem menuItems={data!.allNavigations} />
        </nav>
      )}
    </>
  );
};

export default Header;
