import React from 'react';
import styles from './Ribbon.module.css';
import PresentationTitle from './PresentationTitle/PresentationTitle';
import DropdownMenu from './DropdownMenu/DropdownMenu';
import { DropdownMenuItem } from './RibbonTypes';

type RibbonProps = {
  menuItems: DropdownMenuItem[];
};

function Ribbon({ menuItems }: RibbonProps): JSX.Element {
  return (
    <div className={styles.ribbon}>
      <PresentationTitle />
      <DropdownMenu menuItems={menuItems} />
    </div>
  );
}

export default Ribbon;
