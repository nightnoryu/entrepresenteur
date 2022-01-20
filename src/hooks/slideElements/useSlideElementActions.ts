import React from 'react';
import useEventListener from '../useEventListener';
import { SlideElement } from '../../model/types';
import { bindActionCreators, Dispatch } from 'redux';
import { actionCreators } from '../../state';

function useSlideElementActions<T extends SVGElement>(
  element: SlideElement,
  ref: React.RefObject<T>,
  containerRef: React.RefObject<DocumentAndElementEventHandlers>,
  isSelected: boolean,
  dispatch: Dispatch,
): void {
  const { selectElement, unselectElement } = bindActionCreators(actionCreators, dispatch);

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
}

export default useSlideElementActions;
