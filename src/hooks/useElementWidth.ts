import React, { useEffect, useState } from 'react';

// eslint-disable-next-line
function useElementWidth(ref: React.RefObject<HTMLElement>, deps: ReadonlyArray<any>): number {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (ref.current) {
      setWidth(ref.current.getBoundingClientRect().width);
    }
  }, [...deps, ref.current]);

  return width;
}

export default useElementWidth;
