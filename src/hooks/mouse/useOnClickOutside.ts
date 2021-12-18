import React from 'react';
import useEventListener from '../useEventListener';

type Handler = (event: MouseEvent) => void;

function useOnClickOutside<T extends SVGElement>(
  ref: React.RefObject<T>,
  handler: Handler,
  includedElements?: React.RefObject<Node>[],
  parent?: React.RefObject<DocumentAndElementEventHandlers>,
): void {
  useEventListener('mousedown', event => {
    const element = ref?.current;

    const containsIncluded = (el: React.RefObject<Node>) => {
      return el?.current?.contains(event.target as Node);
    };

    if (!element || element.contains(event.target as Node)) {
      return;
    }
    if (includedElements && includedElements.every(containsIncluded)) {
      return;
    }

    handler(event as MouseEvent);
  }, parent);
}

export default useOnClickOutside;
