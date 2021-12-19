import React from 'react';
import useEventListener from './useEventListener';
import useOnClickOutside from './mouse/useOnClickOutside';
import {
  selectElement as selectElementCreator,
  unselectElement as unselectElementCreator,
} from '../state/actions/actionCreators';
import { SlideElement } from '../model/types';

function useSlideElementActions<T extends SVGElement>(
  ref: React.RefObject<T>,
  element: SlideElement,
  isSelected: boolean,
  selectElement: typeof selectElementCreator,
  unselectElement: typeof unselectElementCreator,
  containerRef: React.RefObject<DocumentAndElementEventHandlers>,
  resizeAnchorRef?: React.RefObject<T>,
): void {
  useEventListener('mousedown', () => {
    if (!isSelected) {
      selectElement(element.id);
    }
  }, ref);

  useOnClickOutside(ref, event => {
    if (isSelected && !event.ctrlKey) {
      unselectElement(element.id);
    }
  }, resizeAnchorRef ? [resizeAnchorRef] : undefined, containerRef);
}

export default useSlideElementActions;
