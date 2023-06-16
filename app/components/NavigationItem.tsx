'use client';

import React, { useState } from 'react';

import MenuItem from './MenuItem';

interface NavigationItemProps {
  menuItems: {
    text: string;
    path: string;
    categories: {
      tagtitle: string;
    }[];
  }[];
}

const NavigationItem: React.FC<NavigationItemProps> = ({ menuItems }) => {
  const [activeDropdown, setActiveDropdown] = useState<string>('');
  return (
    <ul className="flex flex-column">
      {menuItems.map((menuItem, index) => (
        <li key={index} className="px-2 relative">
          <MenuItem
            menuItems={menuItem}
            dropdown={activeDropdown}
            setDropdown={(name: string) => setActiveDropdown(name)}
          />
        </li>
      ))}
    </ul>
  );
};

export default NavigationItem;
