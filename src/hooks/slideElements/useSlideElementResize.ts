import React, { useState } from 'react';
import { Dimensions, Position, SlideElement } from '../../model/types';
import useDragAndDrop from '../dragAndDrop/useDragAndDrop';
import { actionCreators } from '../../state';

function useSlideElementResize(
  ref: React.RefObject<SVGRectElement>,
  element: SlideElement,
  scaleFactor: number,
  resizeElement: typeof actionCreators.resizeElement,
): Dimensions {
  const [dimensions, setDimensions] = useState(element.dimensions);
  let startPos: Position;

  const onStart = (event: MouseEvent) => {
    startPos = {
      x: event.pageX,
      y: event.pageY,
    };
  };

  const onMove = (event: MouseEvent) => {
    const delta = {
      width: scaleFactor * (event.pageX - startPos.x),
      height: scaleFactor * (event.pageY - startPos.y),
    };

    const newDimensions = {
      width: dimensions.width + delta.width,
      height: dimensions.height + delta.height,
    };

    if (newDimensions.width < 0) {
      newDimensions.width = 0;
    }
    if (newDimensions.height < 0) {
      newDimensions.height = 0;
    }

    setDimensions(newDimensions);
  };

  const onFinish = () => {
    resizeElement(element.id, {
      width: dimensions.width,
      height: dimensions.height,
    });
  };

  useDragAndDrop(ref, onStart, onMove, onFinish);

  return dimensions;
}

export default useSlideElementResize;
