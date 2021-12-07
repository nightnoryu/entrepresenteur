import { RefObject, useState } from 'react';
import useEventListener from '../useEventListener';

type Handler = (event: Event) => void;

function useDoubleClick<T extends DocumentAndElementEventHandlers>(
  ref: RefObject<T>,
  onDoubleClick: Handler,
  latency = 300,
): void {
  const [clickCount, setClickCount] = useState(0);

  const handleClick = (event: Event) => {
    setClickCount(clickCount + 1);

    setTimeout(() => {
      if (clickCount === 2) {
        onDoubleClick(event);
        setClickCount(0);
      }
    }, latency);
  };

  useEventListener('click', handleClick, ref);
}

export default useDoubleClick;
