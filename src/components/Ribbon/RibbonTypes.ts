export type DropdownMenuItemType = {
  label: string;
  items: MenuItem[];
};

export type MenuItem = MenuButton | Submenu;

export enum MenuItemType {
  MenuButton,
  Submenu,
}

export type MenuButton = {
  type: MenuItemType.MenuButton;
  label: string;
  action: () => void;
  icon?: string;
};

export type Submenu = {
  type: MenuItemType.Submenu;
  label: string;
  items: MenuButton[];
  icon?: string;
};
