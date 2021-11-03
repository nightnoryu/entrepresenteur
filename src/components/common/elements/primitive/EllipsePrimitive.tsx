import React from 'react';
import { PrimitiveElement } from '../../../../model/types';

type EllipsePrimitiveProps = {
  element: PrimitiveElement;
}

function EllipsePrimitive({ element }: EllipsePrimitiveProps): JSX.Element {
  const svgViewBox = `0 0 ${element.dimensions.width} ${element.dimensions.height}`;

  return (
    <svg viewBox={svgViewBox} xmlns="http://www.w3.org/2000/svg">
      <ellipse
        cx={element.dimensions.width / 2}
        cy={element.dimensions.height / 2}
        rx={element.dimensions.width / 2 - 1}
        ry={element.dimensions.height / 2 - 1}
        fill={element.fill}
        stroke={element.stroke}
      />
    </svg>
  );
}

export default EllipsePrimitive;
