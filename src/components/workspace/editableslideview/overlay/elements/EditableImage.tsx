import React, { useEffect, useRef } from 'react';
import { ImageElement } from '../../../../../model/types';
import { getSelectedSVGElementProperties } from '../../../../../common/componentsUtils';
import useEventListener from '../../../../../hooks/useEventListener';
import useDragAndDrop from '../../../../../hooks/useDragAndDrop';
import useOnClickOutside from '../../../../../hooks/useOnClickOutside';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../../../state';

type EditableImageProps = {
  element: ImageElement;
  isSelected: boolean;
}

function EditableImage({ element, isSelected }: EditableImageProps): JSX.Element {
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

export default EditableImage;
