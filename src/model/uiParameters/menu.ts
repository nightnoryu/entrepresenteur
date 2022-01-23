import { DropdownMenuItemType, MenuItemType } from '../../components/Ribbon/RibbonTypes';
import { Locale, PrimitiveType } from '../types';
import i18n_get from '../../i18n/i18n_get';

type MenuAction = () => void;
type AddPrimitiveMenuAction = (type: PrimitiveType) => void;

type MenuActions = {
  newPresentation: MenuAction;
  openPresentation: MenuAction;
  savePresentation: MenuAction;
  exportPresentation: MenuAction;
  addText: MenuAction;
  addImage: MenuAction;
  addPrimitive: AddPrimitiveMenuAction;
  addSlide: MenuAction;
  removeSlides: MenuAction;
  setSlideBackgroundImage: MenuAction;
  setSlideBackgroundColor: MenuAction;
  removeElements: MenuAction;
  undo: MenuAction;
  redo: MenuAction;
  startDemonstrationFromStart: MenuAction;
  startDemonstration: MenuAction;
  moveSlidesUp: MenuAction;
  moveSlidesDown: MenuAction;
  moveSlidesToBeginning: MenuAction;
  moveSlidesToEnd: MenuAction;
  localeEN: MenuAction;
  localeRU: MenuAction;
};

export function getRibbonMenuItems<T extends MenuActions>(actions: T, locale: Locale): DropdownMenuItemType[] {
  return [
    {
      label: i18n_get(locale, 'menu.file'),
      items: [
        {
          type: MenuItemType.ActionButton,
          label: 'New',
          action: actions.newPresentation,
          icon: 'add',
          hotkey: 'Ctrl+Shift+N',
        },
        {
          type: MenuItemType.ActionButton,
          label: 'Open',
          action: actions.openPresentation,
          icon: 'upload',
          hotkey: 'Ctrl+O',
        },
        {
          type: MenuItemType.ActionButton,
          label: 'Download',
          action: actions.savePresentation,
          icon: 'download',
          hotkey: 'Ctrl+S',
        },
        {
          type: MenuItemType.ActionButton,
          label: 'Export',
          action: actions.exportPresentation,
          icon: 'picture_as_pdf',
        },
      ],
    },
    {
      label: i18n_get(locale, 'menu.edit'),
      items: [
        {
          type: MenuItemType.ActionButton,
          label: 'Undo',
          action: actions.undo,
          icon: 'undo',
          hotkey: 'Ctrl+Z',
        },
        {
          type: MenuItemType.ActionButton,
          label: 'Redo',
          action: actions.redo,
          icon: 'redo',
          hotkey: 'Ctrl+Y',
        },
        {
          type: MenuItemType.ActionButton,
          label: 'Delete',
          action: actions.removeElements,
          icon: 'delete',
          hotkey: 'Del',
        },
      ],
    },
    {
      label: i18n_get(locale, 'menu.insert'),
      items: [
        {
          type: MenuItemType.ActionButton,
          label: 'Image',
          action: actions.addImage,
          icon: 'image',
        },
        {
          type: MenuItemType.ActionButton,
          label: 'Text',
          action: actions.addText,
          icon: 'text_fields',
        },
        {
          type: MenuItemType.SubMenu,
          label: 'Primitive',
          icon: 'dashboard',
          items: [
            {
              type: MenuItemType.ActionButton,
              label: 'Rectangle',
              action: () => actions.addPrimitive(PrimitiveType.RECTANGLE),
              icon: 'rectangle',
            },
            {
              type: MenuItemType.ActionButton,
              label: 'Triangle',
              action: () => actions.addPrimitive(PrimitiveType.TRIANGLE),
              icon: 'change_history',
            },
            {
              type: MenuItemType.ActionButton,
              label: 'Ellipse',
              action: () => actions.addPrimitive(PrimitiveType.ELLIPSE),
              icon: 'circle',
            },
          ],
        },
      ],
    },
    {
      label: i18n_get(locale, 'menu.slide'),
      items: [
        {
          type: MenuItemType.ActionButton,
          label: 'New',
          action: actions.addSlide,
          icon: 'add_box',
          hotkey: 'Ctrl+M',
        },
        {
          type: MenuItemType.ActionButton,
          label: 'Delete',
          action: actions.removeSlides,
          icon: 'remove_circle_outline',
          hotkey: 'Del',
        },
        {
          type: MenuItemType.SubMenu,
          label: 'Background',
          icon: 'wallpaper',
          items: [
            {
              type: MenuItemType.ActionButton,
              label: 'Color',
              action: actions.setSlideBackgroundColor,
              icon: 'format_color_fill',
            },
            {
              type: MenuItemType.ActionButton,
              label: 'Image',
              action: actions.setSlideBackgroundImage,
              icon: 'image',
            },
          ],
        },
        {
          type: MenuItemType.SubMenu,
          label: 'Move',
          icon: 'low_priority',
          items: [
            {
              type: MenuItemType.ActionButton,
              label: 'Up',
              action: actions.moveSlidesUp,
              icon: 'arrow_upward',
            },
            {
              type: MenuItemType.ActionButton,
              label: 'Down',
              action: actions.moveSlidesDown,
              icon: 'arrow_downward',
            },
            {
              type: MenuItemType.ActionButton,
              label: 'To beginning',
              action: actions.moveSlidesToBeginning,
              icon: 'vertical_align_top',
            },
            {
              type: MenuItemType.ActionButton,
              label: 'To end',
              action: actions.moveSlidesToEnd,
              icon: 'vertical_align_bottom',
            },
          ],
        },
      ],
    },
    {
      label: i18n_get(locale, 'menu.demonstration'),
      items: [
        {
          type: MenuItemType.ActionButton,
          label: 'From start',
          action: actions.startDemonstrationFromStart,
          icon: 'restart_alt',
        },
        {
          type: MenuItemType.ActionButton,
          label: 'From current slide',
          action: actions.startDemonstration,
          icon: 'play_arrow',
        },
      ],
    },
    {
      label: 'Language',
      items: [
        {
          type: MenuItemType.ActionButton,
          label: 'English',
          action: actions.localeEN,
        },
        {
          type: MenuItemType.ActionButton,
          label: 'Russian',
          action: actions.localeRU,
        },
      ],
    },
  ];
}
