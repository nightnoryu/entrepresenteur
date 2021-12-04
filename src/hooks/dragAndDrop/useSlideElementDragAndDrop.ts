import React, { useState } from 'react';
import { Position } from '../../model/types';
import useDragAndDrop from './useDragAndDrop';

function useElementDragAndDrop<T extends SVGGeometryElement>(
  ref: React.RefObject<T> | null,
  initialPosition: Position,
  scaleFactor = 1,
): Position {
  const [pos, setPos] = useState(initialPosition);
  let startPos: Position;

  const onStart = (event: MouseEvent) => {
    startPos = {
      x: event.pageX,
      y: event.pageY,
    };
  };

  const onMove = (event: MouseEvent) => {
    const delta = {
      x: scaleFactor * (event.pageX - startPos.x),
      y: scaleFactor * (event.pageY - startPos.y),
    };

    const newPos = {
      x: pos.x + delta.x,
      y: pos.y + delta.y,
    };

    setPos(newPos);
  };

  useDragAndDrop(ref, onStart, onMove);

  return pos;
}

export default useElementDragAndDrop;
