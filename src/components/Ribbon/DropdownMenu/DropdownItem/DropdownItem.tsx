import React, { useState } from 'react';
import styles from './DropdownItem.module.css';
import { MenuItem, MenuItemType } from '../../RibbonTypes';

type DropdownItemProps = {
  item: MenuItem;
  onClick: () => void;
};

// TODO: split menu button and menu submenu
//       think about terminology (dropdown, dropdownItem, nestedDropdown, nestedDropdownItem)
function DropdownItem({ item, onClick }: DropdownItemProps): JSX.Element {
  const [isNestedVisible, setIsNestedVisible] = useState(false);

  return (
    <li>
      <a
        href="#"
        className={styles.item}
        onClick={event => {
          event.preventDefault();
          if (item.type === MenuItemType.MenuButton) {
            item.action();
            onClick();
          } else {
            setIsNestedVisible(!isNestedVisible);
          }
        }}
      >
        {item.label}
        {
          item.icon &&
            <span className={'material-icons md-18 ' + styles.itemIcon}>{item.icon}</span>
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
                    onClick();
                  }}
                >
                  {subItem.label}
                  {
                    subItem.icon &&
                      <span className={'material-icons md-18 ' + styles.subItemIcon}>{subItem.icon}</span>
                  }
                </a>
              </li>
            ))}
          </ul>
      }
    </li>
  );
}

export default DropdownItem;
