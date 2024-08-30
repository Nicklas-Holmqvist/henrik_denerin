'use client';

import { motion } from 'framer-motion';
import React, { useState } from 'react';

import { MenuItem } from '@/types/menuItems';
import NavigationItem from './NavigationItem';

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
      <motion.a
        href="mailto:denerin@gmail.com"
        className="relative px-2 font-medium text-lg pb-0.5 navlink-bg"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { duration: 0.2, delay: 0.5 },
        }}>
        contact
      </motion.a>
    </ul>
  );
};

export default Navigation;

export const motionNavLink = {
  hidden: { opacity: 0, y: -10 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.1,
      duration: 0.2,
    },
    motionLink: {
      opacity: 0,
    },
  }),
};
