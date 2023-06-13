'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

interface MenuItemProps {
  menuItems: {
    text: string;
    path: string;
    categories: {
      tagtitle: string;
    }[];
  };
}

const MenuItem: React.FC<MenuItemProps> = ({ menuItems }) => {
  const pathname = usePathname();
  const includesPathname = pathname.includes(menuItems.text);

  const [open, setOpen] = useState<boolean>(false);

  const subRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(event: any) {
      if (subRef.current && !subRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [subRef]);

  return (
    <div ref={subRef}>
      {menuItems.text !== 'works' ? (
        <Link
          onMouseEnter={() => {
            setOpen(false);
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
          onClick={() => setOpen(true)}
          onMouseEnter={() => setOpen(true)}>
          {menuItems.text}
        </p>
      )}
      {open ? (
        <ul className="flex-row absolute w-40 mt-2">
          {menuItems.categories.length !== 0
            ? menuItems.categories.map((category, index) => (
                <li key={index} className="font-medium">
                  <Link
                    href={`/works/${category.tagtitle}`}
                    onClick={() => setOpen(false)}>
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
