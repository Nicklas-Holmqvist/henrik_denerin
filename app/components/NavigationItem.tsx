'use client';

import Link from 'next/link';
import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';

import { MenuItem } from '@/types/menuItems';

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
    <div ref={subRef}>
      {menuItems.text !== 'works' ? (
        <Link
          // onMouseEnter={() => {
          //   setDropdown(menuItems.text);
          // }}
          className={
            includesPathname
              ? 'border-bottom font-medium text-lg pb-0.5'
              : 'border-hover font-medium text-lg pb-0.5'
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
                ? 'border-bottom font-medium text-lg'
                : 'pointer-cursor font-medium border-hover text-lg'
            }>
            {menuItems.text}
          </p>
          {activeDropdown ? (
            <ul className="flex-row absolute w-44 pt-2">
              {menuItems.categories.length !== 0
                ? menuItems.categories.map((category, index) => (
                    <li key={index} className="font-medium">
                      {category.tagtitle === 'all' ? (
                        <div className="border-t border-b mt-1 pb-1 border-darkblue">
                          <Link
                            href={`/works/${category.tagtitle}`}
                            onClick={() => setDropdown('')}>
                            {category.tagtitle} works [chronological]
                          </Link>
                        </div>
                      ) : (
                        <Link
                          href={`/works/${category.tagtitle}`}
                          onClick={() => setDropdown('')}>
                          {category.tagtitle}
                        </Link>
                      )}
                    </li>
                  ))
                : null}
            </ul>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default NavigationItem;
