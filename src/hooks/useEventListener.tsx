import React, { useEffect, useRef } from 'react';

function useEventListener<T extends HTMLElement>(
  eventName: keyof WindowEventMap,
  handler: (e: Event) => void,
  ref?: React.RefObject<T>,
): void {
  const savedHandler = useRef<(e: Event) => void>();

  useEffect(() => {
    const targetElement: T | Window = ref?.current || window;
    if (!(targetElement && targetElement.addEventListener)) {
      return;
    }

    if (savedHandler.current !== handler) {
      savedHandler.current = handler;
    }

    const eventListener = (e: Event) => {
      if (savedHandler?.current) {
        savedHandler.current(e);
      }
    };

    targetElement.addEventListener(eventName, eventListener);

    return () => {
      targetElement.removeEventListener(eventName, eventListener);
    };
  }, [eventName, ref, handler]);
}

export default useEventListener;
