import React from 'react';

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
      {drawer ? (
        <aside className="fixed top-0 left-0 right-0 bottom-0 flex flex-col justify-center bg-white z-10">
          <ul className="flex flex-col justify-center items-center h-64">
            {menuItems.map((menuItem) => (
              <div key={menuItem.text}>
                <MobileMenuItem setDrawer={setDrawer} menuItem={menuItem} />
              </div>
            ))}
          </ul>
        </aside>
      ) : null}
    </>
  );
};

export default MobileMenu;
