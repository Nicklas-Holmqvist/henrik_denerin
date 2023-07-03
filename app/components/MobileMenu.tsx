import React from 'react';
import Link from 'next/link';

import HamburgerButton from './HamburgerButton';

interface MobileMenuProps {
  drawer: boolean;
  setDrawer: () => void;
  menuItems: {
    text: string;
    path: string;
    categories: {
      tagtitle: string;
    }[];
  }[];
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  menuItems,
  drawer,
  setDrawer,
}) => {
  return (
    <>
      <HamburgerButton active={drawer} onClick={setDrawer} />
      {drawer ? (
        <aside className="fixed top-0 left-0 right-0 bottom-0 flex flex-col justify-center bg-white z-10">
          <ul className="flex flex-col justify-center items-center h-64">
            {menuItems.map((menuItem) => (
              <>
                {menuItem.text === 'works' ? (
                  <>
                    <li className="my-2 text-2xl">{menuItem.text}</li>
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
                  <li className="my-2 text-2xl">
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
            ))}
          </ul>
        </aside>
      ) : null}
    </>
  );
};

export default MobileMenu;
