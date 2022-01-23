import React from 'react';
import { MenuButton } from '../../../RibbonTypes';
import styles from './ActionButton.module.css';

type ActionButtonProps = {
  item: MenuButton;
  hideParent: () => void;
}

function ActionButton({ item, hideParent }: ActionButtonProps): JSX.Element {
  return (
    <li
      className={styles.itemWrapper}
      onClick={event => {
        event.preventDefault();
        hideParent();
        item.action();
      }}
    >
      <a href="#" className={styles.item}>
        {
          item.icon &&
          <span className={'material-icons ' + styles.itemIcon}>{item.icon}</span>
        }
        {item.label}
      </a>
    </li>
  );
}

export default ActionButton;
