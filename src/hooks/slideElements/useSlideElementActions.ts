import React from 'react';
import useEventListener from '../useEventListener';
import {
  selectElement as selectElementCreator,
  unselectElement as unselectElementCreator,
} from '../../state/actions/actionCreators';
import { SlideElement } from '../../model/types';

function useSlideElementActions<T extends SVGElement>(
  ref: React.RefObject<T>,
  element: SlideElement,
  isSelected: boolean,
  selectElement: typeof selectElementCreator,
  unselectElement: typeof unselectElementCreator,
  containerRef: React.RefObject<DocumentAndElementEventHandlers>,
): void {
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
