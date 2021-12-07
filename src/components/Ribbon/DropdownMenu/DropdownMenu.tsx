import React from 'react';
import { DropdownMenuItem } from '../RibbonTypes';
import styles from './DropdownMenu.module.css';

type DropdownMenuProps = {
  menuItems: DropdownMenuItem[];
}

function DropdownMenu({ menuItems }: DropdownMenuProps): JSX.Element {
  return (
    <div className={styles.menu}>
      {menuItems.map(menuItem => (
        <div key={menuItem.label} className={styles.item}>
          <div className={styles.itemLabel}>{menuItem.label}</div>
        </div>
      ))}
    </div>
  );
}

export default DropdownMenu;
