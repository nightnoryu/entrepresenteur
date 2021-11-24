import { RefObject } from 'react';
import useEventListener from './useEventListener';

type Handler = (event: Event) => void;

function useDoubleClick<T extends DocumentAndElementEventHandlers>(
  ref: RefObject<T>,
  onSingleClick: Handler,
  onDoubleClick: Handler,
  latency = 200,
): void {
  let clickCount = 0;

  const handleClick = (event: Event) => {
    clickCount += 1;

    setTimeout(() => {
      if (clickCount === 1) {
        onSingleClick(event);
      } else if (clickCount === 2) {
        onDoubleClick(event);
      }

      clickCount = 0;
    }, latency);
  };

  useEventListener('mousedown', handleClick, ref);
}

export default useDoubleClick;
