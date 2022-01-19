import React, { Dispatch } from 'react';
import { Position, SlideElement } from '../../model/types';
import useDragAndDrop from '../dragAndDrop/useDragAndDrop';
import Action from '../../state/actions/actions';

function useSlideElementDragAndDrop<T extends SVGElement>(
  ref: React.RefObject<T> | null,
  element: SlideElement,
  scaleFactor: number,
  delta: Position,
  setDelta: (position: Position) => void,
  moveElements: (positionDiff: Position) => (dispatch: Dispatch<Action>) => void,
): void {
  let startPos: Position;

  const onStart = (event: MouseEvent) => {
    startPos = {
      x: event.pageX,
      y: event.pageY,
    };
  };

  const onMove = (event: MouseEvent) => {
    setDelta({
      x: scaleFactor * (event.pageX - startPos.x),
      y: scaleFactor * (event.pageY - startPos.y),
    });
  };

  const onFinish = () => {
    if (delta.x !== 0 && delta.y !== 0) {
      moveElements(delta);
    }
    setDelta({ x: 0, y: 0 });
  };

  useDragAndDrop(ref, onStart, onMove, onFinish);
}

export default useSlideElementDragAndDrop;
