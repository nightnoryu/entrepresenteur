import React, { Dispatch, useEffect, useState } from 'react';
import { Position, SlideElement } from '../../model/types';
import useDragAndDrop from './useDragAndDrop';
import Action from '../../state/actions/actions';

function useElementDragAndDrop<T extends SVGGeometryElement>(
  ref: React.RefObject<T> | null,
  element: SlideElement,
  moveElements: (positionDiff: Position) => (dispatch: Dispatch<Action>) => void,
  saveState: () => (dispatch: Dispatch<Action>) => void,
): void {
  const [pos, setPos] = useState(element.position);
  let scaleFactor = 1;
  let startPos: Position;

  if (ref?.current) {
    scaleFactor = element.dimensions.width / ref.current.getBoundingClientRect().width;
  }

  const onStart = (event: MouseEvent) => {
    startPos = {
      x: event.pageX,
      y: event.pageY,
    };

    saveState();
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

  useEffect(() => {
    moveElements({
      x: pos.x - element.position.x,
      y: pos.y - element.position.y,
    });
  }, [pos]);

  useDragAndDrop(ref, onStart, onMove);
}

export default useElementDragAndDrop;
