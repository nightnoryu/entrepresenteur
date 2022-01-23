export type DropdownMenuItemType = {
  label: string;
  items: MenuItem[];
};

export type MenuItem = ActionButtonType | SubMenuType;

export enum MenuItemType {
  ActionButton,
  SubMenu,
}

export type ActionButtonType = {
  type: MenuItemType.ActionButton;
  label: string;
  action: () => void;
  icon?: string;
  hotkey?: string;
};

export type SubMenuType = {
  type: MenuItemType.SubMenu;
  label: string;
  items: ActionButtonType[];
  icon?: string;
};
