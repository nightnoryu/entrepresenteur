import React from 'react';
import { PrimitiveElement } from '../../../../model/types';
import { calculateEllipseProperties } from '../../../../common/componentsFunctions';

type EllipsePrimitiveProps = {
  element: PrimitiveElement;
}

function EllipsePrimitive({ element }: EllipsePrimitiveProps): JSX.Element {
  const properties = calculateEllipseProperties(element);

  return (
    <ellipse
      cx={properties.cx}
      cy={properties.cy}
      rx={properties.rx}
      ry={properties.ry}
      fill={element.fill}
      stroke={element.stroke}
    />
  );
}

export default EllipsePrimitive;
