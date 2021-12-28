import { DropdownMenuItemType, MenuItemType } from '../../components/Ribbon/RibbonTypes';
import { PrimitiveType } from '../types';

type MenuAction = () => void;
type AddPrimitiveMenuAction = (type: PrimitiveType) => void;

type MenuActions = {
  newPresentation: MenuAction,
  openPresentation: MenuAction,
  savePresentation: MenuAction,
  addText: MenuAction,
  addImage: MenuAction,
  addPrimitive: AddPrimitiveMenuAction,
  addSlide: MenuAction,
  removeSlides: MenuAction,
  setSlideBackgroundImage: MenuAction,
  setSlideBackgroundColor: MenuAction,
  removeElements: MenuAction,
  undo: MenuAction,
  redo: MenuAction,
  startDemonstrationFromStart: MenuAction,
  startDemonstration: MenuAction,
  moveSlidesUp: MenuAction,
  moveSlidesDown: MenuAction,
  moveSlidesToBeginning: MenuAction,
  moveSlidesToEnd: MenuAction,
};

export function getRibbonMenuItems<T extends MenuActions>(actions: T): DropdownMenuItemType[] {
  return [
    {
      label: 'File',
      items: [
        {
          type: MenuItemType.MenuButton,
          label: 'New',
          action: actions.newPresentation,
          icon: 'add',
        },
        {
          type: MenuItemType.MenuButton,
          label: 'Open',
          action: actions.openPresentation,
          icon: 'upload',
        },
        {
          type: MenuItemType.MenuButton,
          label: 'Download',
          action: actions.savePresentation,
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
          action: actions.undo,
          icon: 'undo',
        },
        {
          type: MenuItemType.MenuButton,
          label: 'Redo',
          action: actions.redo,
          icon: 'redo',
        },
        {
          type: MenuItemType.MenuButton,
          label: 'Delete',
          action: actions.removeElements,
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
          action: actions.addImage,
          icon: 'image',
        },
        {
          type: MenuItemType.MenuButton,
          label: 'Text',
          action: actions.addText,
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
              action: () => actions.addPrimitive(PrimitiveType.RECTANGLE),
              icon: 'rectangle',
            },
            {
              type: MenuItemType.MenuButton,
              label: 'Triangle',
              action: () => actions.addPrimitive(PrimitiveType.TRIANGLE),
              icon: 'change_history',
            },
            {
              type: MenuItemType.MenuButton,
              label: 'Ellipse',
              action: () => actions.addPrimitive(PrimitiveType.ELLIPSE),
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
          action: actions.addSlide,
          icon: 'add_box',
        },
        {
          type: MenuItemType.MenuButton,
          label: 'Delete',
          action: actions.removeSlides,
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
              action: actions.setSlideBackgroundColor,
              icon: 'format_color_fill',
            },
            {
              type: MenuItemType.MenuButton,
              label: 'Image',
              action: actions.setSlideBackgroundImage,
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
              action: actions.moveSlidesUp,
              icon: 'arrow_upward',
            },
            {
              type: MenuItemType.MenuButton,
              label: 'Down',
              action: actions.moveSlidesDown,
              icon: 'arrow_downward',
            },
            {
              type: MenuItemType.MenuButton,
              label: 'To beginning',
              action: actions.moveSlidesToBeginning,
              icon: 'vertical_align_top',
            },
            {
              type: MenuItemType.MenuButton,
              label: 'To end',
              action: actions.moveSlidesToEnd,
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
          action: actions.startDemonstrationFromStart,
          icon: 'restart_alt',
        },
        {
          type: MenuItemType.MenuButton,
          label: 'From current slide',
          action: actions.startDemonstration,
          icon: 'play_arrow',
        },
      ],
    },
  ];
}
