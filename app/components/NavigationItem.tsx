'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { MenuItem } from '@/types/menuItems';
import { motionNavLink } from './Navigation';

interface navigationItemProps {
  dropdown: string;
  setDropdown: (name: string) => void;
  menuItems: MenuItem;
}

const NavigationItem: React.FC<navigationItemProps> = ({
  dropdown,
  setDropdown,
  menuItems,
}) => {
  const pathname = usePathname();
  const includesPathname = pathname.includes(menuItems.text);
  const activeDropdown = dropdown === menuItems.text;

  const subRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(event: any) {
      if (subRef.current && !subRef.current.contains(event.target)) {
        setDropdown('');
      }
    }
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [setDropdown, subRef]);

  return (
    <AnimatePresence>
      <div ref={subRef}>
        {menuItems.text !== 'works' ? (
          <Link
            className={
              includesPathname
                ? ' font-medium text-lg pb-0.5 border-bottom navlink-bg'
                : 'font-medium text-lg pb-0.5 navlink-bg'
            }
            href={menuItems.path}>
            {menuItems.text}
          </Link>
        ) : (
          <div
            onClick={() => setDropdown(menuItems.text)}
            onMouseEnter={() => setDropdown(menuItems.text)}
            onMouseLeave={() => setDropdown('')}>
            <p
              className={
                includesPathname
                  ? 'font-medium text-lg border-bottom navlink-bg'
                  : 'pointer-cursor font-medium text-lg navlink-bg'
              }>
              {menuItems.text}
            </p>
            {activeDropdown ? (
              <ul className="flex-row absolute w-44 pt-2 dropdown -left-[0.5px]">
                {menuItems.categories.length !== 0
                  ? menuItems.categories.map((category, index) => (
                      <motion.li
                        key={index}
                        className="pl-[9.5px]"
                        custom={index}
                        variants={motionNavLink}
                        initial="hidden"
                        animate="visible"
                        exit="exit">
                        <Link
                          href={`/works/${category.tagtitle}`}
                          onClick={() => setDropdown('')}>
                          {category.tagtitle === 'all' ? (
                            <li className="mt-1">
                              <div className="border-t border-b py-1 border-darkblue">
                                {category.tagtitle} works [chronological]
                              </div>
                            </li>
                          ) : (
                            <li>{category.tagtitle}</li>
                          )}
                        </Link>
                      </motion.li>
                    ))
                  : null}
              </ul>
            ) : null}
          </div>
        )}
      </div>
    </AnimatePresence>
  );
};

export default NavigationItem;
