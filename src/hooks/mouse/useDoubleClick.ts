import { RefObject } from 'react';
import useEventListener from '../useEventListener';

type Handler = (event: Event) => void;

function useDoubleClick<T extends DocumentAndElementEventHandlers>(
  ref: RefObject<T>,
  onDoubleClick: Handler,
  latency = 300,
): void {
  let clickCount = 0;

  const handleClick = (event: Event) => {
    if ((event as MouseEvent).button !== 0) {
      return;
    }

    clickCount += 1;

    setTimeout(() => {
      if (clickCount === 2) {
        onDoubleClick(event);
      }

      clickCount = 0;
    }, latency);
  };

  useEventListener('mousedown', handleClick, ref);
}

export default useDoubleClick;
