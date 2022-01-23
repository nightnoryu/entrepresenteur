import React, { useEffect, useState } from 'react';

// eslint-disable-next-line
function useElementWidth(ref: React.RefObject<HTMLElement>, deps?: ReadonlyArray<any>): number {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (element) {
      setWidth(element.getBoundingClientRect().width);
    }
  }, [
    ...(deps ?? []),
    ref.current?.getBoundingClientRect().width,
  ]);

  return width;
}

export default useElementWidth;
