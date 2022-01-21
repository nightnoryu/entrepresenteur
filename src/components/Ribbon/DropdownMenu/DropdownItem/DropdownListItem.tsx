import React from 'react';
import { MenuItem, MenuItemType } from '../../RibbonTypes';
import ActionButton from './ActionButton/ActionButton';
import SubMenu from './SubMenu/SubMenu';

type DropdownItemProps = {
  item: MenuItem;
  hideParent: () => void;
};

function DropdownListItem({ item, hideParent }: DropdownItemProps): JSX.Element {
  return item.type === MenuItemType.MenuButton
    ? (
      <ActionButton item={item} hideParent={hideParent} />
    )
    : (
      <SubMenu menu={item} hideParent={hideParent} />
    );
}

export default DropdownListItem;
