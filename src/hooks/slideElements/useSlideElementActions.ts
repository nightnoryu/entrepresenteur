import React from 'react';
import { Dimensions, Position, SlideElement } from '../../model/types';
import { Dispatch } from 'redux';
import useSlideElementDragAndDrop from './useSlideElementDragAndDrop';
import useSlideElementResize from './useSlideElementResize';
import useSlideElementSelection from './useSlideElementSelection';
import useSlideElementClickOutside from './useSlideElementClickOutside';

function useSlideElementActions<T extends SVGElement>(
  element: SlideElement,
  ref: React.RefObject<T>,
  resizeAnchorRef: React.RefObject<SVGRectElement>,
  containerRef: React.RefObject<DocumentAndElementEventHandlers>,
  isSelected: boolean,
  scaleFactor: number,
  delta: Position,
  setDelta: (delta: Position) => void,
  dispatch: Dispatch,
): Dimensions {
  useSlideElementSelection(
    element.id,
    ref,
    containerRef,
    isSelected,
    dispatch,
  );

  useSlideElementDragAndDrop(
    ref,
    element,
    scaleFactor,
    delta,
    setDelta,
    isSelected,
    dispatch,
  );

  useSlideElementClickOutside(element.id, containerRef, dispatch);

  return useSlideElementResize(
    resizeAnchorRef,
    element,
    scaleFactor,
    dispatch,
  );
}

export default useSlideElementActions;
