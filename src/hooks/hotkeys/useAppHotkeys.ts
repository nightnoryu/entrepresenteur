import useHotkeyCtrl from './useHotkeyCtrl';
import useHotkey from './useHotkey';

type HotkeyAction = () => void;

function useAppHotkeys(
  newPresentation: HotkeyAction,
  openPresentation: HotkeyAction,
  savePresentation: HotkeyAction,
  undo: HotkeyAction,
  redo: HotkeyAction,
  nextSlide: HotkeyAction,
  previousSlide: HotkeyAction,
): void {
  useHotkeyCtrl('s', savePresentation);
  useHotkeyCtrl('o', openPresentation);
  useHotkeyCtrl('m', newPresentation);

  useHotkeyCtrl('z', undo);
  useHotkeyCtrl('y', redo);

  useHotkey('ArrowRight', nextSlide);
  useHotkey('ArrowLeft', previousSlide);
}

export default useAppHotkeys;
