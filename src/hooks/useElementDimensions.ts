import { Dimensions } from '../model/types';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import useEventListener from './useEventListener';

function useElementDimensions<T extends HTMLElement>(ref: React.RefObject<T> | null): Dimensions {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  const updateDimensions = useCallback(() => {
    const node = ref?.current;
    if (node) {
      setDimensions({
        width: node.offsetWidth || 0,
        height: node.offsetHeight || 0,
      });
    }
  }, [ref]);

  useLayoutEffect(() => {
    updateDimensions();
  }, []);

  useEventListener('resize', updateDimensions);

  return dimensions;
}

export default useElementDimensions;
