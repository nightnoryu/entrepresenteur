import React, { useRef, useState } from 'react';
import { DropdownMenuItemType } from '../RibbonTypes';
import styles from './DropdownMenu.module.css';
import Dropdown from './Dropdown/Dropdown';
import useOnClickOutside from '../../../hooks/mouse/useOnClickOutside';

type DropdownMenuProps = {
  menuItems: DropdownMenuItemType[];
}

function DropdownMenu({ menuItems }: DropdownMenuProps): JSX.Element {
  const initialVisibility = new Array(menuItems.length).fill(false);
  const [visibility, setVisibility] = useState(initialVisibility);

  const ref = useRef(null);
  useOnClickOutside(ref, () => {
    setVisibility(new Array(menuItems.length).fill(false));
  });

  return (
    <div className={styles.menu} ref={ref}>
      {menuItems.map((menuItem, index) => (
        <Dropdown
          key={index}
          label={menuItem.label}
          items={menuItem.items}
          isVisible={visibility[index]}
          onClick={() => {
            setVisibility(visibility.map((isVisible, i) => i === index ? !isVisible : false));
          }}
        />
      ))}
    </div>
  );
}

export default DropdownMenu;
