import React from 'react';
import { PrimitiveElement } from '../../../../../model/types';
import { getSelectedSVGElementProperties } from '../../../../../common/componentsFunctions';

type EditablePrimitiveProps = {
  element: PrimitiveElement;
  isSelected: boolean;
}

function EditablePrimitive({ element, isSelected }: EditablePrimitiveProps): JSX.Element {
  const selectedStyles = getSelectedSVGElementProperties(element, isSelected);

  return (
    <rect
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
