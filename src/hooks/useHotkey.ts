import useEventListener from './useEventListener';

type Handler = (event: KeyboardEvent) => void;

function useHotkey(
  key: string,
  handler: Handler,
  ctrl = true,
): void {
  useEventListener('keydown', (e: Event) => {
    const event = e as KeyboardEvent;

    if (event.key === key) {
      event.preventDefault();

      if (ctrl) {
        if (event.ctrlKey) {
          handler(event);
        }
      } else {
        handler(event);
      }
    }
  });
}

export default useHotkey;
