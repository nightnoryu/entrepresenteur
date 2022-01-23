import useHotkeyCtrl from './useHotkeyCtrl';
import useHotkey from './useHotkey';
import useHotkeyCtrlShift from './useHotkeyCtrlShift';
import { Locale } from '../../model/types';
import useLocale from '../useLocale';

type HotkeyAction = () => void;
type HotkeyActions = {
  newPresentation: (locale: Locale) => void;
  openPresentation: (locale: Locale) => void;
  savePresentation: HotkeyAction;
  addSlide: HotkeyAction;
  undo: HotkeyAction;
  redo: HotkeyAction;
  nextSlide: HotkeyAction;
  previousSlide: HotkeyAction;
};

function useAppHotkeys<T extends HotkeyActions>(actions: T): void {
  const locale = useLocale();

  useHotkeyCtrl('s', actions.savePresentation);
  useHotkeyCtrl('o', () => actions.openPresentation(locale));
  useHotkeyCtrlShift('n', () => actions.newPresentation(locale));

  useHotkeyCtrl('z', actions.undo);
  useHotkeyCtrl('y', actions.redo);

  useHotkeyCtrl('m', actions.addSlide);
  useHotkey('ArrowRight', actions.nextSlide);
  useHotkey('ArrowLeft', actions.previousSlide);
}

export default useAppHotkeys;
