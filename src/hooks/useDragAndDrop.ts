import React, { useEffect, useState } from 'react';
import { Position } from '../model/types';

function useDragAndDrop<T extends HTMLElement>(
  ref: React.RefObject<T> | null,
  initialPosition: Position,
): Position {
  const [pos, setPos] = useState(initialPosition);
  let startPos: Position;

  const onMouseMove = (e: MouseEvent) => {
    const delta = {
      x: e.pageX - startPos.x,
      y: e.pageY - startPos.y,
    };

    const newPos = {
      x: pos.x + delta.x,
      y: pos.y + delta.y,
    };

    setPos(newPos);
  };

  const onMouseDown = (e: MouseEvent) => {
    startPos = {
      x: e.pageX,
      y: e.pageY,
    };

    addEventListener('mousemove', onMouseMove);
    addEventListener('mouseup', onMouseUp);
  };

  const onMouseUp = () => {
    removeEventListener('mousemove', onMouseMove);
    removeEventListener('mouseup', onMouseUp);
  };

  useEffect(() => {
    if (ref) {
      ref.current?.addEventListener('mousedown', onMouseDown);
    }

    return () => {
      if (ref) {
        ref.current?.removeEventListener('mousedown', onMouseDown);
      }
    };
  });

  return pos;
}

export default useDragAndDrop;
