import React from 'react';
import { MenuItem } from '../../RibbonTypes';
import styles from './DropdownList.module.css';
import DropdownListItem from '../DropdownItem/DropdownListItem';

type DropdownMenuItemProps = {
  label: string;
  items: MenuItem[];
  onClick: () => void;
  isVisible: boolean;
};

function DropdownList({ label, items, isVisible, onClick }: DropdownMenuItemProps): JSX.Element {
  return (
    <div className={styles.dropdownList}>
      <a
        className={styles.listLabel}
        href="#"
        onClick={event => {
          event.preventDefault();
          onClick();
        }}
      >
        {label}
      </a>

      {
        isVisible &&
        <ul className={styles.listItems}>
          {items.map(item => (
            <DropdownListItem key={item.label} item={item} onItemClick={onClick} />
          ))}
        </ul>
      }
    </div>
  );
}

export default DropdownList;
