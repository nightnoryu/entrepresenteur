import React from 'react';
import { DropdownMenuItemType } from '../RibbonTypes';
import styles from './DropdownMenu.module.css';
import DropdownMenuItem from './DropdownMenuItem/DropdownMenuItem';

type DropdownMenuProps = {
  menuItems: DropdownMenuItemType[];
}

function DropdownMenu({ menuItems }: DropdownMenuProps): JSX.Element {
  return (
    <div className={styles.menu}>
      {menuItems.map(menuItem => (
        <DropdownMenuItem key={menuItem.label} label={menuItem.label} items={menuItem.items} />
      ))}
    </div>
  );
}

export default DropdownMenu;
