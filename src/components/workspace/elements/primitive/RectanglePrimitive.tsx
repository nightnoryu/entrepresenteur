import React from 'react';
import { PrimitiveElement } from '../../../../model/types';

type RectanglePrimitiveProps = {
  rectanglePrimitiveElement: PrimitiveElement;
}

function RectanglePrimitive({ rectanglePrimitiveElement }: RectanglePrimitiveProps): JSX.Element {
  const svgViewBox = `0 0 ${rectanglePrimitiveElement.dimensions.width} ${rectanglePrimitiveElement.dimensions.height}`;

  return (
    <svg viewBox={svgViewBox} xmlns="http://www.w3.org/2000/svg">
      <rect
        width={rectanglePrimitiveElement.dimensions.width - 1}
        height={rectanglePrimitiveElement.dimensions.height - 1}
        fill={rectanglePrimitiveElement.fill}
        stroke={rectanglePrimitiveElement.stroke}
      />
    </svg>
  );
}

export default RectanglePrimitive;
