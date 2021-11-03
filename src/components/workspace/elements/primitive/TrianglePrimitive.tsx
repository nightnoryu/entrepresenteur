import React from 'react';
import { PrimitiveElement } from '../../../../model/types';

type TrianglePrimitiveProps = {
  trianglePrimitiveElement: PrimitiveElement;
}

function TrianglePrimitive({ trianglePrimitiveElement }: TrianglePrimitiveProps): JSX.Element {
  const svgViewBox = `0 0 ${trianglePrimitiveElement.dimensions.width} ${trianglePrimitiveElement.dimensions.height}`;

  const firstPoint = `0,${trianglePrimitiveElement.dimensions.height}`;
  const secondPoint = `${trianglePrimitiveElement.dimensions.width / 2},0`;
  const thirdPoint = `${trianglePrimitiveElement.dimensions.width},${trianglePrimitiveElement.dimensions.height}`;
  const points = `${firstPoint} ${secondPoint} ${thirdPoint}`;

  return (
    <svg viewBox={svgViewBox} xmlns="http://www.w3.org/2000/svg">
      <polygon
        points={points}
        fill={trianglePrimitiveElement.fill}
        stroke={trianglePrimitiveElement.stroke}
      />
    </svg>
  );
}

export default TrianglePrimitive;
