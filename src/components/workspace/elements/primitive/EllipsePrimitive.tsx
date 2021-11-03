import React from 'react';
import { PrimitiveElement } from '../../../../model/types';

type EllipsePrimitiveProps = {
  ellipsePrimitiveElement: PrimitiveElement;
}

function EllipsePrimitive({ ellipsePrimitiveElement }: EllipsePrimitiveProps): JSX.Element {
  const svgViewBox = `0 0 ${ellipsePrimitiveElement.dimensions.width} ${ellipsePrimitiveElement.dimensions.height}`;

  return (
    <svg viewBox={svgViewBox} xmlns="http://www.w3.org/2000/svg">
      <ellipse
        cx={ellipsePrimitiveElement.dimensions.width / 2}
        cy={ellipsePrimitiveElement.dimensions.height / 2}
        rx={ellipsePrimitiveElement.dimensions.width / 2}
        ry={ellipsePrimitiveElement.dimensions.height / 2}
        fill={ellipsePrimitiveElement.fill}
        stroke={ellipsePrimitiveElement.stroke}
      />
    </svg>
  );
}

export default EllipsePrimitive;
