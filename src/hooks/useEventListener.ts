import React, { useEffect, useRef } from 'react';

function useEventListener<K extends keyof WindowEventMap, T extends DocumentAndElementEventHandlers>(
  eventName: K,
  handler: (e: WindowEventMap[K] | Event) => void,
  ref?: React.RefObject<T>,
): void {
  const savedHandler = useRef<typeof handler>();

  useEffect(() => {
    const targetElement: T | Window = ref?.current || window;
    if (!(targetElement && targetElement.addEventListener)) {
      return;
    }

    if (savedHandler.current !== handler) {
      savedHandler.current = handler;
    }

    const eventListener: typeof handler = event => {
      savedHandler?.current?.(event);
    };

    targetElement.addEventListener(eventName, eventListener);

    return () => {
      targetElement.removeEventListener(eventName, eventListener);
    };
  }, [eventName, ref, handler]);
}

export default useEventListener;
