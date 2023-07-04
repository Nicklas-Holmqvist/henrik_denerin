'use client';

import { HeaderInterface } from '@/types/header';
import { useEffect, useState } from 'react';

import Logo from './Logo';
import Navigation from './Navigation';
import { useMediaQuery } from 'react-responsive';
import MobileMenu from './MobileMenu';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const [data, setData] = useState<HeaderInterface | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [drawer, setDrawer] = useState<boolean>(false);

  const mobileView = useMediaQuery({
    query: '(max-width: 1024px)',
  });

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await fetch('/api/header');
      const response = await res.json();
      setData(response);
      setLoading(false);
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    mobileView ? setDrawer(false) : null;
  }, [mobileView]);

  return (
    <>
      {loading ? null : (
        <nav className="flex flex-row justify-center max-w-6xl m-auto py-4 2xl:justify-between lg:justify-between">
          <Logo src={data!.logo.image.url} alt={data!.logo.image.alt} />
          {mobileView ? (
            <MobileMenu
              menuItems={data!.allNavigations}
              drawer={drawer}
              setDrawer={() => setDrawer(!drawer)}
            />
          ) : (
            <Navigation menuItems={data!.allNavigations} />
          )}
        </nav>
      )}
    </>
  );
};

export default Header;
