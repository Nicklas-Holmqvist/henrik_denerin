'use client';

import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

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
      <Link
        href={menuItems.path}
        onClick={() => setOpen(true)}
        onMouseOver={() => setOpen(true)}>
        {menuItems.text}
      </Link>
      {open ? (
        <ul className="flex-row absolute w-40">
          {menuItems.categories.length !== 0
            ? menuItems.categories.map((category) => (
                <li key={category.tagtitle} className="">
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
