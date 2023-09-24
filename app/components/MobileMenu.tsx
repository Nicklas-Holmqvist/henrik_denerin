import Link from 'next/link';
import React from 'react';
import { LuMail } from '@metamist/lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import HamburgerButton from './HamburgerButton';
import MobileMenuItem from './MobileMenuItem';
import { MenuItem } from '@/types/menuItems';

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
      <AnimatePresence>
        {drawer ? (
          <motion.aside
            className="fixed top-0 bottom-0 flex flex-col justify-center bg-white z-10"
            variants={motionMobilMenu}
            initial="hidden"
            animate="visible"
            exit="exit">
            <ul className="flex flex-col justify-center items-center h-64">
              <motion.div
                variants={motionNavLink}
                initial="hidden"
                animate="visible"
                exit="exit">
                <Link className="text-2xl" href="/" onClick={setDrawer}>
                  Home
                </Link>
              </motion.div>
              {menuItems.map((menuItem, index) => (
                <motion.div
                  key={menuItem.text}
                  variants={motionNavLink}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  exit="exit">
                  <MobileMenuItem setDrawer={setDrawer} menuItem={menuItem} />
                </motion.div>
              ))}
              <motion.a
                href="mailto:info@denerin.org"
                className="pl-2"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.5, delay: 0.7 },
                  y: 6,
                }}
                exit={{
                  opacity: 0,
                }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}>
                <LuMail size={18} />
              </motion.a>
            </ul>
          </motion.aside>
        ) : null}
      </AnimatePresence>
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
      delay: index * 0.2,
      duration: 0.3,
    },
  }),
  exit: {
    opacity: 0,
  },
};

const motionMobilMenu = {
  hidden: { opacity: 0 },
  visible: {
    left: 0,
    right: 0,
    opacity: 1,
    transition: {
      delay: 0.1,
      stiffness: 100,
    },
  },
  exit: {
    opacity: 0,
    left: '-300',
    right: 500,
    transition: {
      delay: 0.1,
      stiffness: 100,
    },
  },
};
