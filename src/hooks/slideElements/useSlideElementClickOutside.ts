import useEventListener from '../useEventListener';
import { bindActionCreators, Dispatch } from 'redux';
import React from 'react';
import { UUID } from '../../model/uuid';
import { actionCreators } from '../../state';

function useSlideElementClickOutside(
  elementID: UUID,
  containerRef: React.RefObject<DocumentAndElementEventHandlers>,
  dispatch: Dispatch,
): void {
  const { unselectElement } = bindActionCreators(actionCreators, dispatch);

  useEventListener('mousedown', event => {
    if (event.target === containerRef?.current) {
      unselectElement(elementID);
    }
  });
}

export default useSlideElementClickOutside;
