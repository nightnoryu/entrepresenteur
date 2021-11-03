import React from 'react';
import { PrimitiveElement } from '../../../../model/types';

type TrianglePrimitiveProps = {
  element: PrimitiveElement;
}

function TrianglePrimitive({ element }: TrianglePrimitiveProps): JSX.Element {
  const svgViewBox = `0 0 ${element.dimensions.width} ${element.dimensions.height}`;

  const firstPoint = `0,${element.dimensions.height}`;
  const secondPoint = `${element.dimensions.width / 2},0`;
  const thirdPoint = `${element.dimensions.width},${element.dimensions.height}`;
  const points = `${firstPoint} ${secondPoint} ${thirdPoint}`;

  return (
    <svg viewBox={svgViewBox} xmlns="http://www.w3.org/2000/svg">
      <polygon
        points={points}
        fill={element.fill}
        stroke={element.stroke}
      />
    </svg>
  );
}

export default TrianglePrimitive;
