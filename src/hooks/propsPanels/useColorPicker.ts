import React from 'react';
import useEventListener from '../useEventListener';

function useColorPicker<T extends HTMLInputElement>(
  ref: React.RefObject<T>,
  handler: (color: string) => void,
): void {
  useEventListener('change', event => {
    const target = event.currentTarget as T;
    handler(target.value);
  }, ref);
}

export default useColorPicker;
