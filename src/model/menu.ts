import { MenuItemType, RibbonMenu } from '../components/Ribbon/RibbonTypes';

export function menuItems(): RibbonMenu {
  return {
    items: [
      {
        label: 'File',
        items: [
          {
            type: MenuItemType.MenuButton,
            label: 'New',
            action: () => console.log('New'),
            icon: 'add',
          },
          {
            type: MenuItemType.MenuButton,
            label: 'Open',
            action: () => console.log('Open'),
            icon: 'upload',
          },
          {
            type: MenuItemType.MenuButton,
            label: 'Download',
            action: () => console.log('Download'),
            icon: 'download',
          },
          {
            type: MenuItemType.MenuButton,
            label: 'Export',
            action: () => console.log('Export'),
            icon: 'picture_as_pdf',
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
            icon: 'undo',
          },
          {
            type: MenuItemType.MenuButton,
            label: 'Redo',
            action: () => console.log('Redo'),
            icon: 'redo',
          },
          {
            type: MenuItemType.MenuButton,
            label: 'Delete',
            action: () => console.log('Delete'),
            icon: 'delete',
          },
          {
            type: MenuItemType.Submenu,
            label: 'Text',
            icon: 'text_fields',
            items: [
              {
                type: MenuItemType.MenuButton,
                label: 'Color',
                action: () => console.log('Color'),
                icon: 'palette',
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
            icon: 'dashboard',
            items: [
              {
                type: MenuItemType.MenuButton,
                label: 'Fill',
                action: () => console.log('Fill'),
                icon: 'format_color_fill',
              },
              {
                type: MenuItemType.MenuButton,
                label: 'Stroke',
                action: () => console.log('Stroke'),
                icon: 'border_color',
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
            icon: 'image',
          },
          {
            type: MenuItemType.MenuButton,
            label: 'Text',
            action: () => console.log('Text'),
            icon: 'text_fields',
          },
          {
            type: MenuItemType.Submenu,
            label: 'Primitive',
            icon: 'dashboard',
            items: [
              {
                type: MenuItemType.MenuButton,
                label: 'Rectangle',
                action: () => console.log('Rectangle'),
                icon: 'rectangle',
              },
              {
                type: MenuItemType.MenuButton,
                label: 'Triangle',
                action: () => console.log('Triangle'),
                icon: 'change_history',
              },
              {
                type: MenuItemType.MenuButton,
                label: 'Circle',
                action: () => console.log('Circle'),
                icon: 'circle',
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
            icon: 'add_box',
          },
          {
            type: MenuItemType.MenuButton,
            label: 'Delete',
            action: () => console.log('Delete'),
            icon: 'remove_circle_outline',
          },
          {
            type: MenuItemType.Submenu,
            label: 'Background',
            icon: 'wallpaper',
            items: [
              {
                type: MenuItemType.MenuButton,
                label: 'Color',
                action: () => console.log('Color'),
                icon: 'format_color_fill',
              },
              {
                type: MenuItemType.MenuButton,
                label: 'Image',
                action: () => console.log('Image'),
                icon: 'image',
              },
            ],
          },
        ],
      },
    ],
  };
}
