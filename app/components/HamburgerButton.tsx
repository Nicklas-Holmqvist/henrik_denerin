import { LuMenu, LuX } from '@metamist/lucide-react';
import React from 'react';

interface HamburgerButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  active: boolean;
}

const HamburgerButton: React.FC<HamburgerButtonProps> = ({
  active,
  ...props
}) => {
  return (
    <button className="fixed top-4 left-5 z-50" {...props}>
      {active ? <LuX size={32} /> : <LuMenu size={32} />}
    </button>
  );
};

export default HamburgerButton;
