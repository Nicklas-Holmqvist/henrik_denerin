import React from 'react';

import HamburgerButton from './HamburgerButton';
import MobileMenuItem from './MobileMenuItem';
import { MenuItem } from '@/types/menuItems';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileMenuProps {
  drawer: boolean;
  setDrawer: () => void;
  menuItems: MenuItem[];
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  menuItems,
  drawer,
  setDrawer,
}) => {
  return (
    <>
      <HamburgerButton active={drawer} onClick={setDrawer} />
      {drawer ? (
        <AnimatePresence>
          <motion.aside
            className="fixed top-0 bottom-0 flex flex-col justify-center bg-white z-10"
            variants={motionMobilMenu}
            initial="hidden"
            animate="visible"
            exit="exit">
            <ul className="flex flex-col justify-center items-center h-64">
              {menuItems.map((menuItem, index) => (
                <motion.div
                  key={menuItem.text}
                  variants={motionNavLink}
                  custom={index}
                  initial="hidden"
                  animate="visible">
                  <MobileMenuItem setDrawer={setDrawer} menuItem={menuItem} />
                </motion.div>
              ))}
            </ul>
          </motion.aside>
        </AnimatePresence>
      ) : null}
    </>
  );
};

export default MobileMenu;

const motionNavLink = {
  hidden: { opacity: 0, x: -30 },
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: index * 0.1,
      duration: 0.3,
    },
  }),
};

const motionMobilMenu = {
  hidden: { margin: '-100%', width: '100vw' },
  visible: {
    margin: 0,
    width: '100vw',
    transition: {
      delay: 0.2,
      stiffness: 100,
    },
  },
  exit: { margin: '-100%', width: '0' },
};
