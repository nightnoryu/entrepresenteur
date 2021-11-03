import React from 'react';
import { PrimitiveElement } from '../../../../model/types';

type RectanglePrimitiveProps = {
  element: PrimitiveElement;
}

function RectanglePrimitive({ element }: RectanglePrimitiveProps): JSX.Element {
  const svgViewBox = `0 0 ${element.dimensions.width} ${element.dimensions.height}`;

  return (
    <svg viewBox={svgViewBox} xmlns="http://www.w3.org/2000/svg">
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
