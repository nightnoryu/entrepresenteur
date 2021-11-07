import React from 'react';
import { PrimitiveElement } from '../../../../model/types';
import { primitiveElementViewBox } from '../../../../common/svg';

type TrianglePrimitiveProps = {
  element: PrimitiveElement;
}

function TrianglePrimitive({ element }: TrianglePrimitiveProps): JSX.Element {
  return (
    <svg viewBox={primitiveElementViewBox(element)} xmlns="http://www.w3.org/2000/svg">
      <polygon
        points={trianglePoints(element)}
        fill={element.fill}
        stroke={element.stroke}
      />
    </svg>
  );
}

export default TrianglePrimitive;

function trianglePoints(element: PrimitiveElement): string {
  const firstPoint = `0,${element.dimensions.height}`;
  const secondPoint = `${element.dimensions.width / 2},0`;
  const thirdPoint = `${element.dimensions.width},${element.dimensions.height}`;
  return `${firstPoint} ${secondPoint} ${thirdPoint}`;
}
