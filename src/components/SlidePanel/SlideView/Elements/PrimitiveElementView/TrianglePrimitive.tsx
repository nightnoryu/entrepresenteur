import React from 'react';
import { PrimitiveElement } from '../../../../../model/types';
import { getPrimitiveStrokeStyle, getTrianglePointsAsPath } from '../../../../../common/componentsUtils';

type TrianglePrimitiveProps = {
  element: PrimitiveElement;
}

function TrianglePrimitive({ element }: TrianglePrimitiveProps): JSX.Element {
  return (
    <polygon
      points={getTrianglePointsAsPath(element)}
      fill={element.fill}
      stroke={element.stroke}
      strokeDasharray={getPrimitiveStrokeStyle(element.strokeStyle)}
      strokeWidth={element.strokeSize}
    />
  );
}

export default TrianglePrimitive;
