import { MenuItemType, RibbonMenu } from '../components/ribbon/RibbonTypes';

export const menuItems: RibbonMenu = {
  items: [
    {
      label: 'File',
      items: [
        {
          type: MenuItemType.Submenu,
          label: 'New',
          items: [
            {
              type: MenuItemType.MenuButton,
              label: 'Empty',
              action: () => console.log('Empty'),
            },
            {
              type: MenuItemType.MenuButton,
              label: 'From Template',
              action: () => console.log('From Template'),
            },
          ],
        },
      ],
    },
    {
      label: 'Edit',
      items: [
        {
          type: MenuItemType.MenuButton,
          label: 'Undo',
          action: () => console.log('Undo'),
        },
        {
          type: MenuItemType.MenuButton,
          label: 'Redo',
          action: () => console.log('Redo'),
        },
        {
          type: MenuItemType.MenuButton,
          label: 'Delete',
          action: () => console.log('Delete'),
        },
        {
          type: MenuItemType.Submenu,
          label: 'Text',
          items: [
            {
              type: MenuItemType.MenuButton,
              label: 'Color',
              action: () => console.log('Color'),
            },
            {
              type: MenuItemType.MenuButton,
              label: 'Font',
              action: () => console.log('Font'),
            },
            {
              type: MenuItemType.MenuButton,
              label: 'Size',
              action: () => console.log('Size'),
            },
          ],
        },
        {
          type: MenuItemType.Submenu,
          label: 'Primitive',
          items: [
            {
              type: MenuItemType.MenuButton,
              label: 'Fill',
              action: () => console.log('Fill'),
            },
            {
              type: MenuItemType.MenuButton,
              label: 'Stroke',
              action: () => console.log('Stroke'),
            },
          ],
        },
      ],
    },
    {
      label: 'Insert',
      items: [
        {
          type: MenuItemType.MenuButton,
          label: 'Image',
          action: () => console.log('Image'),
        },
        {
          type: MenuItemType.MenuButton,
          label: 'Text',
          action: () => console.log('Text'),
        },
        {
          type: MenuItemType.Submenu,
          label: 'Primitive',
          items: [
            {
              type: MenuItemType.MenuButton,
              label: 'Rectangle',
              action: () => console.log('Rectangle'),
            },
            {
              type: MenuItemType.MenuButton,
              label: 'Triangle',
              action: () => console.log('Triangle'),
            },
            {
              type: MenuItemType.MenuButton,
              label: 'Circle',
              action: () => console.log('Circle'),
            },
          ],
        },
      ],
    },
    {
      label: 'Slide',
      items: [
        {
          type: MenuItemType.MenuButton,
          label: 'New',
          action: () => console.log('New'),
        },
        {
          type: MenuItemType.MenuButton,
          label: 'Delete',
          action: () => console.log('Delete'),
        },
        {
          type: MenuItemType.Submenu,
          label: 'Background',
          items: [
            {
              type: MenuItemType.MenuButton,
              label: 'Color',
              action: () => console.log('Color'),
            },
            {
              type: MenuItemType.MenuButton,
              label: 'Image',
              action: () => console.log('Image'),
            },
          ],
        },
      ],
    },
  ],
};
