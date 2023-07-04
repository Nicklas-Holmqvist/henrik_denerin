import Link from 'next/link';
import React from 'react';

import { MenuItem } from '@/types/menuItems';

interface MobileMenuItemProps {
  setDrawer: () => void;
  menuItem: MenuItem;
}

const MobileMenuItem: React.FC<MobileMenuItemProps> = ({
  setDrawer,
  menuItem,
}) => {
  return (
    <>
      {menuItem.text === 'works' ? (
        <>
          <li className="my-2 text-center text-2xl">{menuItem.text}</li>
          <ul className="text-center">
            {menuItem.categories.length !== 0
              ? menuItem.categories.map((category, index) => (
                  <li key={index}>
                    {category.tagtitle === 'all' ? (
                      <div className="border-t border-b mt-1 pb-1 border-darkblue">
                        <Link
                          className="text-sm"
                          href={`/works/${category.tagtitle}`}
                          onClick={setDrawer}>
                          {category.tagtitle} works [chronological]
                        </Link>
                      </div>
                    ) : (
                      <Link
                        className="text-sm"
                        href={`/works/${category.tagtitle}`}
                        onClick={setDrawer}>
                        {category.tagtitle}
                      </Link>
                    )}
                  </li>
                ))
              : null}
          </ul>
        </>
      ) : (
        <li>
          {' '}
          <Link
            className="my-2 text-2xl"
            onClick={setDrawer}
            href={menuItem.path}>
            {menuItem.text}
          </Link>
        </li>
      )}
    </>
  );
};

export default MobileMenuItem;
