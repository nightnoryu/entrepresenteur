import React from 'react';
import { MenuItem } from '../../RibbonTypes';
import styles from './DropdownMenuItem.module.css';

type DropdownMenuItemProps = {
  label: string;
  items: MenuItem[];
  onClick: () => void;
  isVisible: boolean;
};

function DropdownMenuItem({ label, items, isVisible, onClick }: DropdownMenuItemProps): JSX.Element {
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
              <li key={item.label}>
                <a href="#">{item.label}</a>
                {
                  item.icon &&
                    <span className={'material-icons md-18 ' + styles.itemIcon}>{item.icon}</span>
                }
              </li>
            ))}
          </ul>
      }
    </div>
  );
}

export default DropdownMenuItem;
