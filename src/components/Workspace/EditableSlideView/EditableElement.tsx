import React, { useRef } from 'react';
import { SlideElement } from '../../../model/types';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../state';
import { getSelectedSVGElementProperties } from '../../../common/componentsUtils';
import useEventListener from '../../../hooks/useEventListener';
import useOnClickOutside from '../../../hooks/mouse/useOnClickOutside';
import useDoubleClick from '../../../hooks/mouse/useDoubleClick';

type EditableElementProps = {
  element: SlideElement;
  isSelected: boolean;
  onDoubleClick?: (event: Event) => void;
}

function EditableElement({ element, isSelected, onDoubleClick }: EditableElementProps): JSX.Element {
  const dispatch = useDispatch();
  const { selectElement, unselectElement, moveElements, saveState } = bindActionCreators(actionCreators, dispatch);

  const selectedStyles = getSelectedSVGElementProperties(element, isSelected);

  const ref = useRef<SVGRectElement>(null);
  useEventListener('mousedown', () => {
    if (!isSelected) {
      selectElement(element.id);
    }
  }, ref);

  useOnClickOutside(ref, event => {
    if (isSelected && !event.ctrlKey) {
      unselectElement(element.id);
    }
  });

  useDoubleClick(ref, (event: Event) => {
    if (onDoubleClick) {
      onDoubleClick(event);
    }
  });

  return (
    <rect
      ref={ref}
      x={element.position.x}
      y={element.position.y}
      width={element.dimensions.width}
      height={element.dimensions.height}
      rx="2"
      ry="2"
      {...selectedStyles}
    />
  );
}

export default EditableElement;
