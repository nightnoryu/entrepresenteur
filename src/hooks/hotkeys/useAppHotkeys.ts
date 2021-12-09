import useHotkeyCtrl from './useHotkeyCtrl';

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
  useHotkeyCtrl('y', redo);
}

export default useAppHotkeys;