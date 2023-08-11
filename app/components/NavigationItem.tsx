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
            <ul className="flex-row absolute w-44 pt-2 dropdown">
              {menuItems.categories.length !== 0
                ? menuItems.categories.map((category, index) => (
                    <Link
                      key={index}
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
