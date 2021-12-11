import React, { useState } from 'react';
import { Dimensions, Position, SlideElement } from '../model/types';
import useDragAndDrop from './dragAndDrop/useDragAndDrop';
import { actionCreators } from '../state';

function useSlideElementResize(
  ref: React.RefObject<SVGRectElement>,
  element: SlideElement,
  scaleFactor: number,
  resizeElement: typeof actionCreators.resizeElement,
): Dimensions {
  const [delta, setDelta] = useState({ width: 0, height: 0 });
  let startPos: Position;

  const onStart = (event: MouseEvent) => {
    startPos = {
      x: event.pageX,
      y: event.pageY,
    };
  };

  const onMove = (event: MouseEvent) => {
    setDelta({
      width: scaleFactor * (event.pageX - startPos.x),
      height: scaleFactor * (event.pageY - startPos.y),
    });
  };

  const onFinish = () => {
    if (delta.width !== 0 && delta.height !== 0) {
      resizeElement(element.id, {
        width: element.dimensions.width + delta.width,
        height: element.dimensions.height + delta.height,
      });
    }
    setDelta({ width: 0, height: 0 });
  };

  useDragAndDrop(ref, onStart, onMove, onFinish);

  return delta;
}

export default useSlideElementResize;
