import React, { useState } from 'react';
import { Submenu } from '../../../RibbonTypes';
import styles from './SubMenu.module.css';

type SubMenuProps = {
  menu: Submenu;
}

function SubMenu({ menu }: SubMenuProps): JSX.Element {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <li
      onMouseEnter={event => {
        event.preventDefault();
        setIsVisible(!isVisible);
      }}
      onMouseLeave={event => {
        event.preventDefault();
        setIsVisible(!isVisible);
      }}
    >
      <a href="#" className={styles.item}>
        {menu.label}
        {
          menu.icon &&
          <span className={'material-icons ' + styles.itemIcon}>{menu.icon}</span>
        }
      </a>
      <ul
        className={styles.nested}
        style={{
          display: isVisible ? 'block' : 'none',
        }}
      >
        {menu.items.map(subItem => (
          <li key={subItem.label}>
            <a
              href="#"
              className={styles.subItem}
              onClick={event => {
                event.preventDefault();
                setIsVisible(!isVisible);
                subItem.action();
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
    </li>
  );
}

export default SubMenu;
