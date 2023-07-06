'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

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
        <motion.li
          key={index}
          className="px-2 relative"
          variants={motionNavLink}
          custom={index}
          initial="hidden"
          animate="visible">
          <NavigationItem
            menuItems={menuItem}
            dropdown={activeDropdown}
            setDropdown={(name: string) => setActiveDropdown(name)}
          />
        </motion.li>
      ))}
    </ul>
  );
};

export default Navigation;

const motionNavLink = {
  hidden: { opacity: 0, y: -10 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.1,
      duration: 0.3,
    },
  }),
};
