'use client';

import React, { useState } from 'react';

import NavigationItem from './NavigationItem';
import { MenuItem } from '@/types/menuItems';

interface NavigationProps {
  menuItems: MenuItem[];
}

const Navigation: React.FC<NavigationProps> = ({ menuItems }) => {
  const [activeDropdown, setActiveDropdown] = useState<string>('');
  return (
    <ul className="flex flex-column">
      {menuItems.map((menuItem, index) => (
        <li key={index} className="px-2 relative">
          <NavigationItem
            menuItems={menuItem}
            dropdown={activeDropdown}
            setDropdown={(name: string) => setActiveDropdown(name)}
          />
        </li>
      ))}
    </ul>
  );
};

export default Navigation;
