import useHotkeyCtrl from './useHotkeyCtrl';
import useHotkey from './useHotkey';
import useHotkeyCtrlShift from './useHotkeyCtrlShift';

type HotkeyAction = () => void;
type HotkeyActions = {
  newPresentation: HotkeyAction,
  openPresentation: HotkeyAction,
  savePresentation: HotkeyAction,
  addSlide: HotkeyAction,
  undo: HotkeyAction,
  redo: HotkeyAction,
  nextSlide: HotkeyAction,
  previousSlide: HotkeyAction,
};

function useAppHotkeys<T extends HotkeyActions>(actions: T): void {
  useHotkeyCtrl('s', actions.savePresentation);
  useHotkeyCtrl('o', actions.openPresentation);
  useHotkeyCtrlShift('n', actions.newPresentation);

  useHotkeyCtrl('z', actions.undo);
  useHotkeyCtrl('y', actions.redo);

  useHotkeyCtrl('m', actions.addSlide);
  useHotkey('ArrowRight', actions.nextSlide);
  useHotkey('ArrowLeft', actions.previousSlide);
}

export default useAppHotkeys;
