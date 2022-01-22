import React, { useRef, useState } from 'react';
import { Submenu } from '../../../RibbonTypes';
import styles from './SubMenu.module.css';
import { getVisibilityStyles } from '../../../../../common/componentsUtils';
import useElementDimensions from '../../../../../hooks/useElementDimensions';

type SubMenuProps = {
  menu: Submenu;
  hideParent: () => void;
}

function SubMenu({ menu, hideParent }: SubMenuProps): JSX.Element {
  const [isVisible, setIsVisible] = useState(false);

  const itemRef = useRef<HTMLLIElement>(null);
  const { width } = useElementDimensions(itemRef, []);

  return (
    <li
      className={styles.itemWrapper}
      onMouseEnter={event => {
        event.preventDefault();
        setIsVisible(true);
      }}
      onMouseLeave={event => {
        event.preventDefault();
        setIsVisible(false);
      }}
      ref={itemRef}
    >
      <ul
        className={styles.nested}
        style={{
          ...getVisibilityStyles(isVisible),
          left: `${width + 22}px`,
        }}
      >
        {menu.items.map(subItem => (
          <li key={subItem.label} className={styles.itemWrapper}>
            <a
              href="#"
              className={styles.subItem}
              onClick={event => {
                event.preventDefault();
                hideParent();
                setIsVisible(false);
                subItem.action();
              }}
            >
              {
                subItem.icon &&
                <span className={'material-icons ' + styles.subItemIcon}>{subItem.icon}</span>
              }
              {subItem.label}
            </a>
          </li>
        ))}
      </ul>
      <a href="#" className={styles.item}>
        {
          menu.icon &&
          <span className={'material-icons ' + styles.itemIcon}>{menu.icon}</span>
        }
        {menu.label}
        <span className={styles.submenuArrow} />
      </a>
    </li>
  );
}

export default SubMenu;
