import React from 'react';
import { PrimitiveElement } from '../../../../model/types';
import { primitiveElementViewBox } from '../../../../common/svg';
import { getTrianglePoints } from '../../../../common/componentsFunctions';

type TrianglePrimitiveProps = {
  element: PrimitiveElement;
}

function TrianglePrimitive({ element }: TrianglePrimitiveProps): JSX.Element {
  return (
    <svg viewBox={primitiveElementViewBox(element)} xmlns="http://www.w3.org/2000/svg">
      <polygon
        points={getTrianglePoints(element)}
        fill={element.fill}
        stroke={element.stroke}
      />
    </svg>
  );
}

export default TrianglePrimitive;
