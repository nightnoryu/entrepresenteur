import useHotkeyCtrl from './useHotkeyCtrl';
import useHotkeyCtrlShift from './useHotkeyCtrlShift';

type HotkeyAction = () => void;

function useAppHotkeys(
  newPresentation: HotkeyAction,
  openPresentation: HotkeyAction,
  savePresentation: HotkeyAction,
  undo: HotkeyAction,
  redo: HotkeyAction,
): void {
  useHotkeyCtrl('s', savePresentation);
  useHotkeyCtrl('o', openPresentation);
  useHotkeyCtrl('m', newPresentation);
  useHotkeyCtrl('z', undo);
  useHotkeyCtrlShift('z', redo);
}

export default useAppHotkeys;
