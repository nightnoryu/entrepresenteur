import React from 'react';
import { PrimitiveElement } from '../../../../../model/types';
import { getPrimitiveStrokeStyle } from '../../../../../common/componentsUtils';

type RectanglePrimitiveProps = {
  element: PrimitiveElement;
}

function RectanglePrimitive({ element }: RectanglePrimitiveProps): JSX.Element {
  return (
    <rect
      x={element.position.x}
      y={element.position.y}
      width={element.dimensions.width}
      height={element.dimensions.height}
      fill={element.fill}
      stroke={element.stroke}
      strokeDasharray={getPrimitiveStrokeStyle(element.strokeStyle)}
    />
  );
}

export default RectanglePrimitive;
