import React from 'react';
import { PrimitiveElement } from '../../../../../model/types';
import { getTrianglePoints } from '../../../../../common/componentsUtils';

type TrianglePrimitiveProps = {
  element: PrimitiveElement;
}

function TrianglePrimitive({ element }: TrianglePrimitiveProps): JSX.Element {
  return (
    <polygon
      points={getTrianglePoints(element)}
      fill={element.fill}
      stroke={element.stroke}
    />
  );
}

export default TrianglePrimitive;
