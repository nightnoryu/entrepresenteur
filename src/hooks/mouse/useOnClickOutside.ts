import { RefObject } from 'react';
import useEventListener from '../useEventListener';

type Handler = (event: MouseEvent) => void;

function useOnClickOutside<T extends SVGElement>(
  ref: RefObject<T>,
  handler: Handler,
  includedElements?: RefObject<Node>[],
): void {
  useEventListener('mousedown', event => {
    const element = ref?.current;

    const containsIncluded = (el: RefObject<Node>) => {
      return el?.current?.contains(event.target as Node);
    };
    console.log(includedElements?.every(containsIncluded));

    if (!element || element.contains(event.target as Node)) {
      return;
    }
    if (includedElements && includedElements.every(containsIncluded)) {
      return;
    }

    handler(event as MouseEvent);
  });
}

export default useOnClickOutside;
