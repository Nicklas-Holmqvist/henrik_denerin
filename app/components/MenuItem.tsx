'use client';

import Link from 'next/link';
import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface MenuItemProps {
  dropdown: string;
  setDropdown: (name: string) => void;
  menuItems: {
    text: string;
    path: string;
    categories: {
      tagtitle: string;
    }[];
  };
}

const MenuItem: React.FC<MenuItemProps> = ({
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
          onMouseEnter={() => {
            setDropdown(menuItems.text);
          }}
          className={
            includesPathname
              ? 'border-bottom font-medium'
              : 'border-hover font-medium'
          }
          href={menuItems.path}>
          {menuItems.text}
        </Link>
      ) : (
        <p
          className={
            includesPathname
              ? 'pt-0.5 border-bottom font-medium'
              : 'pt-0.5 pointer-cursor font-medium border-hover'
          }
          onClick={() => setDropdown(menuItems.text)}
          onMouseEnter={() => setDropdown(menuItems.text)}>
          {menuItems.text}
        </p>
      )}
      {activeDropdown ? (
        <ul className="flex-row absolute w-40 mt-2">
          {menuItems.categories.length !== 0
            ? menuItems.categories.map((category, index) => (
                <li key={index} className="font-medium">
                  <Link
                    href={`/works/${category.tagtitle}`}
                    onClick={() => setDropdown('')}>
                    {category.tagtitle}
                  </Link>
                </li>
              ))
            : null}
        </ul>
      ) : null}
    </div>
  );
};

export default MenuItem;
