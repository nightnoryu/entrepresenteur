import React, { useEffect, useState } from 'react';
import { Dimensions } from '../model/types';

// eslint-disable-next-line
function useElementDimensions(ref: React.RefObject<HTMLElement>, deps?: ReadonlyArray<any>): Dimensions {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setDimensions({
        width: rect.width,
        height: rect.height,
      });
    }
  }, [...(deps ?? []), ref.current]);

  return dimensions;
}

export default useElementDimensions;
