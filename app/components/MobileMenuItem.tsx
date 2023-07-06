import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';

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
          <ul className="text-center pb-2">
            {menuItem.categories.length !== 0
              ? menuItem.categories.map((category, index) => (
                  <motion.li
                    key={index}
                    variants={motionNavLink}
                    custom={index}>
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
                  </motion.li>
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

const motionNavLink = {
  hidden: { opacity: 0, x: 30 },
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: index * 0.2,
      duration: 0.3,
    },
  }),
};
