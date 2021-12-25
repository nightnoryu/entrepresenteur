import React, { useEffect, useState } from 'react';
import { SLIDE_WIDTH } from '../../model/constants';
import useEventListener from '../useEventListener';

function useScaleFactorForDragAndDrop<T extends Element>(
  ref: React.RefObject<T>,
): number {
  const [scaleFactor, setScaleFactor] = useState(1);

  const onResize = () => {
    if (ref?.current) {
      setScaleFactor(SLIDE_WIDTH / ref.current.getBoundingClientRect().width);
    }
  };

  useEffect(onResize, [ref?.current]);
  useEventListener('resize', onResize);

  return scaleFactor;
}

export default useScaleFactorForDragAndDrop;
