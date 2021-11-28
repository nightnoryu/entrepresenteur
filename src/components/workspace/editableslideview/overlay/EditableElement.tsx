import React, { useEffect, useRef } from 'react';
import { SlideElement } from '../../../../model/types';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../../state';
import { getSelectedSVGElementProperties } from '../../../../common/componentsUtils';
import useEventListener from '../../../../hooks/useEventListener';
import useOnClickOutside from '../../../../hooks/useOnClickOutside';
import useDragAndDrop from '../../../../hooks/useDragAndDrop';
import useDoubleClick from '../../../../hooks/useDoubleClick';

type EditableElementProps = {
  element: SlideElement;
  isSelected: boolean;
  onDoubleClick?: (event: Event) => void;
}

function EditableElement({ element, isSelected, onDoubleClick }: EditableElementProps): JSX.Element {
  const dispatch = useDispatch();
  const { selectElement, unselectElement, moveElement } = bindActionCreators(actionCreators, dispatch);

  const selectedStyles = getSelectedSVGElementProperties(element, isSelected);

  const ref = useRef(null);
  useEventListener('mousedown', (event: Event) => {
    if ((event as MouseEvent).button !== 0) {
      return;
    }

    if (!isSelected) {
      selectElement(element.id);
    }
  }, ref);

  useOnClickOutside(ref, () => {
    if (isSelected) {
      unselectElement(element.id);
    }
  });

  const position = useDragAndDrop(ref, element.position);
  useEffect(() => {
    moveElement({
      elementID: element.id,
      positionDiff: {
        x: position.x - element.position.x,
        y: position.y - element.position.y,
      },
    });
  }, [position]);

  useDoubleClick(ref, (event: Event) => {
    if (onDoubleClick) {
      onDoubleClick(event);
    }
  });

  return (
    <rect
      ref={ref}
      x={position.x}
      y={position.y}
      width={element.dimensions.width}
      height={element.dimensions.height}
      rx="2"
      ry="2"
      {...selectedStyles}
    />
  );
}

export default EditableElement;
