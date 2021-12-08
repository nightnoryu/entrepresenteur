import React from 'react';
import { MenuItem } from '../../RibbonTypes';
import styles from './Dropdown.module.css';
import DropdownItem from '../DropdownItem/DropdownItem';

type DropdownMenuItemProps = {
  label: string;
  items: MenuItem[];
  onClick: () => void;
  isVisible: boolean;
};

function Dropdown({ label, items, isVisible, onClick }: DropdownMenuItemProps): JSX.Element {
  return (
    <div className={styles.item}>
      <a
        className={styles.itemLabel}
        href="#"
        onClick={onClick}
      >
        {label}
      </a>

      {
        isVisible &&
          <ul className={styles.dropdownList}>
            {items.map(item => (
              <DropdownItem key={item.label} item={item} onClick={onClick} />
            ))}
          </ul>
      }
    </div>
  );
}

export default Dropdown;
