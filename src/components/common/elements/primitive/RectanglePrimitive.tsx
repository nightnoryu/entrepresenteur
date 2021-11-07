import React from 'react';
import { PrimitiveElement } from '../../../../model/types';
import { primitiveElementViewBox } from '../../../../common/svg';

type RectanglePrimitiveProps = {
  element: PrimitiveElement;
}

function RectanglePrimitive({ element }: RectanglePrimitiveProps): JSX.Element {
  return (
    <svg viewBox={primitiveElementViewBox(element)} xmlns="http://www.w3.org/2000/svg">
      <rect
        width={element.dimensions.width}
        height={element.dimensions.height}
        fill={element.fill}
        stroke={element.stroke}
      />
    </svg>
  );
}

export default RectanglePrimitive;
