import React from 'react';
import { MenuItem } from '../../RibbonTypes';
import styles from './DropdownList.module.css';
import DropdownListItem from '../DropdownItem/DropdownListItem';

type DropdownMenuItemProps = {
  label: string;
  items: MenuItem[];
  onHover: () => void;
  isVisible: boolean;
};

function DropdownList({ label, items, isVisible, onHover }: DropdownMenuItemProps): JSX.Element {
  const onHoverHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    onHover();
  };

  return (
    <div
      className={styles.dropdownList}
      onMouseEnter={onHoverHandler}
      onMouseLeave={onHoverHandler}
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
            onItemClick={onHover}
          />
        ))}
      </ul>
    </div>
  );
}

export default DropdownList;
