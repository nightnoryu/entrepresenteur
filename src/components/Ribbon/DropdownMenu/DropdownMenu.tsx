import React from 'react';
import { DropdownMenuItem } from '../RibbonTypes';

type DropdownMenuProps = {
  menuItems: DropdownMenuItem[];
}

function DropdownMenu({ menuItems }: DropdownMenuProps): JSX.Element {
  return (
    <div>
      {menuItems.map(menuItem => {
        return <div key={menuItem.label}>{menuItem.label}</div>;
      })}
    </div>
  );
}

export default DropdownMenu;
