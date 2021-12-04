export type RibbonMenu = {
  items: MenuDropdown[];
};

export type MenuDropdown = {
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
};

export type Submenu = {
  type: MenuItemType.Submenu;
  label: string;
  items: MenuButton[];
};
