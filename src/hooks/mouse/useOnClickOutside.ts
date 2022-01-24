import React from 'react';
import useEventListener from '../useEventListener';

type Handler = (event: MouseEvent) => void;

function useOnClickOutside<T extends Node>(
  ref: React.RefObject<T>,
  handler: Handler,
): void {
  useEventListener('mousedown', event => {
    const element = ref?.current;

    if (!element || element.contains(event.target as Node)) {
      return;
    }

    handler(event as MouseEvent);
  });
}

export default useOnClickOutside;
