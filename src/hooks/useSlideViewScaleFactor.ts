import { RefObject, useEffect, useState } from 'react';

function useSlideViewScaleFactor<T extends HTMLElement>(
  ref: RefObject<T> | null,
): number {
  const [scaleFactor, setScaleFactor] = useState(1);
  useEffect(() => {
    const node = ref?.current;
    if (node) {
      setScaleFactor(800 / node.clientWidth);
    }
  }, [ref]);

  return scaleFactor;
}

export default useSlideViewScaleFactor;
