import useEventListener from '../useEventListener';
import { UUID } from '../../model/uuid';
import React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { actionCreators } from '../../state';

function useSlideElementSelection<T extends SVGElement>(
  elementID: UUID,
  ref: React.RefObject<T>,
  isSelected: boolean,
  dispatch: Dispatch,
): void {
  const { selectElement } = bindActionCreators(actionCreators, dispatch);

  useEventListener('mousedown', () => {
    if (!isSelected) {
      selectElement(elementID);
    }
  }, ref);
}

export default useSlideElementSelection;
