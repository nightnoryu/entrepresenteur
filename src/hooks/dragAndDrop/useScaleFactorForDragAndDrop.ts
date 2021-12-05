import React, { useEffect, useState } from 'react';
import { SLIDE_WIDTH } from '../../model/constants';

function useScaleFactorForDragAndDrop<T extends Element>(
  ref: React.RefObject<T>,
): number {
  const [scaleFactor, setScaleFactor] = useState(1);
  useEffect(() => {
    if (ref?.current) {
      setScaleFactor(SLIDE_WIDTH / ref.current.getBoundingClientRect().width);
    }
  }, [ref?.current]);

  return scaleFactor;
}

export default useScaleFactorForDragAndDrop;
