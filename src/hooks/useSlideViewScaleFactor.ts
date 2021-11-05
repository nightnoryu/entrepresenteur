import React, { useEffect, useRef, useState } from 'react';

function useSlideViewScaleFactor<T extends HTMLElement>(): [React.RefObject<T>, number] {
  const [scaleFactor, setScaleFactor] = useState(1);
  const ref = useRef<T>(null);
  useEffect(() => {
    const node = ref.current;
    if (node) {
      setScaleFactor(800 / node.clientWidth);
    }
  }, [ref]);

  return [ref, scaleFactor];
}

export default useSlideViewScaleFactor;
