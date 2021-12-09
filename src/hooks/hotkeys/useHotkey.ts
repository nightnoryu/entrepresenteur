import useEventListener from '../useEventListener';
import Handler from './handler';
import React from 'react';

function useHotkey(
  key: string,
  handler: Handler,
  ref?: React.RefObject<DocumentAndElementEventHandlers>,
): void {
  useEventListener('keydown', (e: Event) => {
    const event = e as KeyboardEvent;

    if (event.key === key) {
      event.preventDefault();
      handler(event);
    }
  }, ref);
}

export default useHotkey;
