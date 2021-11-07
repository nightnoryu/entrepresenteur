import React from 'react';
import { PrimitiveElement } from '../../../../model/types';
import { primitiveElementViewBox } from '../../../../common/svg';

type EllipsePrimitiveProps = {
  element: PrimitiveElement;
}

function EllipsePrimitive({ element }: EllipsePrimitiveProps): JSX.Element {
  const properties = calculateEllipseProperties(element);

  return (
    <svg viewBox={primitiveElementViewBox(element)} xmlns="http://www.w3.org/2000/svg">
      <ellipse
        cx={properties.cx}
        cy={properties.cy}
        rx={properties.rx}
        ry={properties.ry}
        fill={element.fill}
        stroke={element.stroke}
      />
    </svg>
  );
}

export default EllipsePrimitive;

function calculateEllipseProperties(element: PrimitiveElement) {
  return {
    cx: element.dimensions.width / 2,
    cy: element.dimensions.height / 2,
    rx: element.dimensions.width / 2 - 1,
    ry: element.dimensions.height / 2 - 1,
  };
}
