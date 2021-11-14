import React from 'react';
import { PrimitiveElement } from '../../../../model/types';
import { primitiveElementViewBox } from '../../../../common/svg';
import { calculateEllipseProperties } from '../../../../common/componentsFunctions';

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
