import React, { useState } from 'react';
import styles from './DropdownItem.module.css';
import { MenuItem, MenuItemType } from '../../RibbonTypes';

type DropdownItemProps = {
  item: MenuItem;
  onItemClick: () => void;
};

function DropdownListItem({ item, onItemClick }: DropdownItemProps): JSX.Element {
  const [isNestedVisible, setIsNestedVisible] = useState(false);

  const onClick = (event: React.MouseEvent) => {
    event.preventDefault();
    if (item.type === MenuItemType.MenuButton) {
      item.action();
      onItemClick();
    } else {
      setIsNestedVisible(!isNestedVisible);
    }
  };

  return (
    <li>
      <a
        href="#"
        className={styles.item}
        onClick={onClick}
      >
        {item.label}
        {
          item.icon &&
          <span className={'material-icons ' + styles.itemIcon}>{item.icon}</span>
        }
      </a>

      {
        item.type === MenuItemType.Submenu && isNestedVisible &&
        <ul className={styles.nested}>
          {item.items.map(subItem => (
            <li key={subItem.label}>
              <a
                href="#"
                className={styles.subItem}
                onClick={event => {
                  event.preventDefault();
                  subItem.action();
                  onItemClick();
                }}
              >
                {subItem.label}
                {
                  subItem.icon &&
                  <span className={'material-icons ' + styles.subItemIcon}>{subItem.icon}</span>
                }
              </a>
            </li>
          ))}
        </ul>
      }
    </li>
  );
}

export default DropdownListItem;
