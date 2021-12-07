import useEventListener from '../useEventListener';
import Handler from './handler';

function useHotkeyCtrlShift(
  key: string,
  handler: Handler,
): void {
  useEventListener('keydown', (e: Event) => {
    const event = e as KeyboardEvent;

    if (event.ctrlKey && event.shiftKey && event.key === key) {
      event.preventDefault();
      handler(event);
    }
  });
}

export default useHotkeyCtrlShift;
