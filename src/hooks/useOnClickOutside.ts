import { RefObject } from 'react';
import useEventListener from './useEventListener';

type Handler = (event: MouseEvent) => void;

function useOnClickOutside<T extends SVGGeometryElement>(
  ref: RefObject<T>,
  handler: Handler,
): void {
  useEventListener('click', event => {
    const el = ref?.current;

    if (!el || el.contains(event.target as Node)) {
      return;
    }

    handler(event as MouseEvent);
  });
}

export default useOnClickOutside;
