import React from 'react';
import styles from './Ribbon.module.css';
import PresentationTitle from './PresentationTitle/PresentationTitle';
import DropdownMenu from './DropdownMenu/DropdownMenu';
import { DropdownMenuItemType } from './RibbonTypes';
import PropertiesPanel from './PropertiesPanel/PropertiesPanel';
import logo from './logo.svg';

type RibbonProps = {
  menuItems: DropdownMenuItemType[];
};

function Ribbon({ menuItems }: RibbonProps): JSX.Element {
  return (
    <div className={styles.ribbon}>
      <img src={logo} alt="Logo" className={styles.logo} />
      <PresentationTitle />
      <DropdownMenu menuItems={menuItems} />
      <PropertiesPanel />
    </div>
  );
}

export default Ribbon;
