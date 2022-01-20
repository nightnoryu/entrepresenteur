import React from 'react';
import useEventListener from '../useEventListener';
import { Dimensions, Position, SlideElement } from '../../model/types';
import { bindActionCreators, Dispatch } from 'redux';
import { actionCreators } from '../../state';
import useSlideElementDragAndDrop from './useSlideElementDragAndDrop';
import useSlideElementResize from './useSlideElementResize';

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
  const {
    selectElement,
    unselectElement,
    moveElements,
    setCurrentElement,
    resizeElement,
  } = bindActionCreators(actionCreators, dispatch);

  useEventListener('mousedown', () => {
    if (!isSelected) {
      selectElement(element.id);
    }
  }, ref);

  useEventListener('mousedown', e => {
    if (e.target === containerRef.current) {
      unselectElement(element.id);
    }
  }, containerRef);

  useSlideElementDragAndDrop(
    ref,
    element,
    scaleFactor,
    delta,
    setDelta,
    moveElements,
    setCurrentElement,
    isSelected,
  );

  return useSlideElementResize(
    resizeAnchorRef,
    element,
    scaleFactor,
    resizeElement,
  );
}

export default useSlideElementActions;
