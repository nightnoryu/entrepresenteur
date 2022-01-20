import React from 'react';
import { PrimitiveElement } from '../../../../../model/types';
import { getCommonPrimitiveProperties } from '../../../../../common/componentsUtils';

type RectanglePrimitiveProps = {
  element: PrimitiveElement;
}

function RectanglePrimitive({ element }: RectanglePrimitiveProps): JSX.Element {
  return (
    <rect
      {...getCommonPrimitiveProperties(element)}
      x={element.position.x}
      y={element.position.y}
      width={element.dimensions.width}
      height={element.dimensions.height}
    />
  );
}

export default RectanglePrimitive;
