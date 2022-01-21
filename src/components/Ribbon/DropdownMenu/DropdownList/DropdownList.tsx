import React from 'react';
import { MenuItem } from '../../RibbonTypes';
import styles from './DropdownList.module.css';
import DropdownListItem from '../DropdownItem/DropdownListItem';

type DropdownMenuItemProps = {
  label: string;
  items: MenuItem[];
  show: () => void;
  hide: () => void;
  isVisible: boolean;
};

function DropdownList({ label, items, isVisible, show, hide }: DropdownMenuItemProps): JSX.Element {
  return (
    <div
      className={styles.dropdownList}
      onMouseEnter={event => {
        event.preventDefault();
        show();
      }}
      onMouseLeave={event => {
        event.preventDefault();
        hide();
      }}
    >
      <a href="#" className={styles.listLabel} onClick={e => e.preventDefault()}>
        {label}
      </a>

      <ul
        className={styles.listItems}
        style={{
          display: isVisible ? 'block' : 'none',
        }}
      >
        {items.map(item => (
          <DropdownListItem
            key={item.label}
            item={item}
            hideParent={hide}
          />
        ))}
      </ul>
    </div>
  );
}

export default DropdownList;
