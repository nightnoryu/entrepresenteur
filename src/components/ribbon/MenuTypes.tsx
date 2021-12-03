export type MenuAction = {
  label: string;
  icon?: string;
  action?: () => void;
};

export type Menu = {
  label: string;
  actions?: MenuAction[];
};

export type MenuProps = {
  ribbon: Menu[];
};

export type MenuButtonProps = {
  label: string;
  elements?: MenuAction[];
  expand: boolean;
  onHover?: () => void;
  onClick?: () => void;
};

export type MenuElementProps = {
  label: string;
  actionCall?: () => void;
};

export type MenuPopupProps = {
  data: MenuAction[];
  onAction?: () => void;
};