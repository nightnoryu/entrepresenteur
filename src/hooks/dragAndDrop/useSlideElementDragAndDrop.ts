import React, { Dispatch, useCallback, useState } from 'react';
import { Position, SlideElement } from '../../model/types';
import useDragAndDrop from './useDragAndDrop';
import Action from '../../state/actions/actions';

function useElementDragAndDrop<T extends SVGElement>(
  ref: React.RefObject<T> | null,
  element: SlideElement,
  moveElements: (positionDiff: Position) => (dispatch: Dispatch<Action>) => void,
): Position {
  const [delta, setDelta] = useState({ x: 0, y: 0 });
  let startPos: Position;

  const getScaleFactor = useCallback(() => {
    return ref?.current
      ? element.dimensions.width / ref.current.getBoundingClientRect().width
      : 1;
  }, [ref?.current]);

  const onStart = (event: MouseEvent) => {
    startPos = {
      x: event.pageX,
      y: event.pageY,
    };
  };

  const onMove = (event: MouseEvent) => {
    setDelta({
      x: getScaleFactor() * (event.pageX - startPos.x),
      y: getScaleFactor() * (event.pageY - startPos.y),
    });
  };

  const onFinish = () => {
    moveElements(delta);
    setDelta({ x: 0, y: 0 });
  };

  useDragAndDrop(ref, onStart, onMove, onFinish);

  return delta;
}

export default useElementDragAndDrop;
