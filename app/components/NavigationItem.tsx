import Link from 'next/link';
import React from 'react';

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
  console.log(menuItems);
  return (
    <ul className="flex flex-column">
      {menuItems.map((menuItem) => (
        <li key={menuItem.text} className="px-2">
          <Link href={menuItem.path}>{menuItem.text}</Link>
          {menuItem.categories.length !== 0
            ? menuItem.categories.map((category) => (
                <ul key={category.tagtitle}>
                  <li>
                    <Link href={`/works/${category.tagtitle}`}>
                      {category.tagtitle}
                    </Link>
                  </li>
                </ul>
              ))
            : null}
        </li>
      ))}
    </ul>
  );
};

export default NavigationItem;
