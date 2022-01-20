import useEventListener from '../useEventListener';
import { UUID } from '../../model/uuid';
import React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { actionCreators } from '../../state';

function useSlideElementSelection<T extends SVGElement>(
  elementID: UUID,
  ref: React.RefObject<T>,
  containerRef: React.RefObject<DocumentAndElementEventHandlers>,
  isSelected: boolean,
  dispatch: Dispatch,
): void {
  const { selectElement, unselectElement } = bindActionCreators(actionCreators, dispatch);

  useEventListener('mousedown', () => {
    if (!isSelected) {
      selectElement(elementID);
    }
  }, ref);

  useEventListener('mousedown', e => {
    if (e.target === containerRef.current) {
      unselectElement(elementID);
    }
  }, containerRef);
}

export default useSlideElementSelection;
