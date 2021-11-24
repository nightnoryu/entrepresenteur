import React, { useRef } from 'react';
import { ImageElement } from '../../../../../model/types';
import { getSelectedSVGElementProperties } from '../../../../../common/componentsFunctions';
import useEventListener from '../../../../../hooks/useEventListener';
import { dispatch } from '../../../../../state/editor';
import { selectElement } from '../../../../../model/actions';

type EditableImageProps = {
  element: ImageElement;
  isSelected: boolean;
}

function EditableImage({ element, isSelected }: EditableImageProps): JSX.Element {
  const selectedStyles = getSelectedSVGElementProperties(element, isSelected);

  const ref = useRef(null);
  useEventListener('mousedown', () => {
    if (!isSelected) {
      dispatch(selectElement, element.id);
    }
  }, ref);

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
