import { DropdownMenuItemType, MenuItemType } from '../../components/Ribbon/RibbonTypes';
import { PrimitiveType } from '../types';

type MenuAction = () => void;
type AddPrimitiveMenuAction = (type: PrimitiveType) => void;

export function getRibbonMenuItems(
  newPresentation: MenuAction,
  openPresentation: MenuAction,
  savePresentation: MenuAction,
  addText: MenuAction,
  addImage: MenuAction,
  addPrimitive: AddPrimitiveMenuAction,
  addSlide: MenuAction,
  removeSlide: MenuAction,
  setSlideBackgroundImage: MenuAction,
  setSlideBackgroundColor: MenuAction,
  removeElements: MenuAction,
  undo: MenuAction,
  redo: MenuAction,
  startDemonstrationFromStart: MenuAction,
  startDemonstration: MenuAction,
  moveSlidesToBeginning: MenuAction,
  moveSlidesToEnd: MenuAction,
): DropdownMenuItemType[] {
  return [
    {
      label: 'File',
      items: [
        {
          type: MenuItemType.MenuButton,
          label: 'New',
          action: newPresentation,
          icon: 'add',
        },
        {
          type: MenuItemType.MenuButton,
          label: 'Open',
          action: openPresentation,
          icon: 'upload',
        },
        {
          type: MenuItemType.MenuButton,
          label: 'Download',
          action: savePresentation,
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
          action: undo,
          icon: 'undo',
        },
        {
          type: MenuItemType.MenuButton,
          label: 'Redo',
          action: redo,
          icon: 'redo',
        },
        {
          type: MenuItemType.MenuButton,
          label: 'Delete',
          action: removeElements,
          icon: 'delete',
        },
      ],
    },
    {
      label: 'Insert',
      items: [
        {
          type: MenuItemType.MenuButton,
          label: 'Image',
          action: addImage,
          icon: 'image',
        },
        {
          type: MenuItemType.MenuButton,
          label: 'Text',
          action: addText,
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
              action: () => addPrimitive(PrimitiveType.RECTANGLE),
              icon: 'rectangle',
            },
            {
              type: MenuItemType.MenuButton,
              label: 'Triangle',
              action: () => addPrimitive(PrimitiveType.TRIANGLE),
              icon: 'change_history',
            },
            {
              type: MenuItemType.MenuButton,
              label: 'Ellipse',
              action: () => addPrimitive(PrimitiveType.ELLIPSE),
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
          action: addSlide,
          icon: 'add_box',
        },
        {
          type: MenuItemType.MenuButton,
          label: 'Delete',
          action: removeSlide,
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
              action: setSlideBackgroundColor,
              icon: 'format_color_fill',
            },
            {
              type: MenuItemType.MenuButton,
              label: 'Image',
              action: setSlideBackgroundImage,
              icon: 'image',
            },
          ],
        },
        {
          type: MenuItemType.Submenu,
          label: 'Move',
          icon: 'low_priority',
          items: [
            {
              type: MenuItemType.MenuButton,
              label: 'Up',
              action: () => console.log('Up'),
              icon: 'arrow_upward',
            },
            {
              type: MenuItemType.MenuButton,
              label: 'Down',
              action: () => console.log('Down'),
              icon: 'arrow_downward',
            },
            {
              type: MenuItemType.MenuButton,
              label: 'To beginning',
              action: moveSlidesToBeginning,
              icon: 'vertical_align_top',
            },
            {
              type: MenuItemType.MenuButton,
              label: 'To end',
              action: moveSlidesToEnd,
              icon: 'vertical_align_bottom',
            },
          ],
        },
      ],
    },
    {
      label: 'Demonstration',
      items: [
        {
          type: MenuItemType.MenuButton,
          label: 'From start',
          action: startDemonstrationFromStart,
          icon: 'restart_alt',
        },
        {
          type: MenuItemType.MenuButton,
          label: 'From current slide',
          action: startDemonstration,
          icon: 'play_arrow',
        },
      ],
    },
  ];
}
