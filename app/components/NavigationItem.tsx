import React from 'react';
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
  return (
    <ul className="flex flex-column">
      {menuItems.map((menuItem) => (
        <li key={menuItem.text} className="px-2 relative">
          <MenuItem menuItems={menuItem} />
        </li>
      ))}
    </ul>
  );
};

export default NavigationItem;
