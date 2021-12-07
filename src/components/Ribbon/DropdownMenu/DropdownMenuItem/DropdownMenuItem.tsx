import React, { useState } from 'react';
import { MenuItem } from '../../RibbonTypes';
import styles from './DropdownMenuItem.module.css';

type DropdownMenuItemProps = {
  label: string;
  items: MenuItem[];
};

function DropdownMenuItem({ label, items }: DropdownMenuItemProps): JSX.Element {
  const [active, setActive] = useState(false);

  return (
    <div className={styles.item}>
      <a
        className={styles.itemLabel}
        href="#"
        onClick={event => {
          event.preventDefault();
          setActive(!active);
        }}
      >
        {label}
      </a>

      {
        active &&
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
