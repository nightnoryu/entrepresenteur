import React, { useRef } from 'react';
import { PrimitiveElement } from '../../../../../model/types';
import { getSelectedSVGElementProperties } from '../../../../../common/componentsFunctions';
import useEventListener from '../../../../../hooks/useEventListener';
import { dispatch } from '../../../../../state/editor';
import { selectElement, unselectElement } from '../../../../../model/actions';

type EditablePrimitiveProps = {
  element: PrimitiveElement;
  isSelected: boolean;
}

function EditablePrimitive({ element, isSelected }: EditablePrimitiveProps): JSX.Element {
  const selectedStyles = getSelectedSVGElementProperties(element, isSelected);

  const ref = useRef(null);
  useEventListener('mousedown', () => {
    dispatch(isSelected ? unselectElement : selectElement, element.id);
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

export default EditablePrimitive;
