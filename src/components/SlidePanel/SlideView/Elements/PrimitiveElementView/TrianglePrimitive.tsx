import React from 'react';
import { PrimitiveElement } from '../../../../../model/types';
import { getCommonPrimitiveProperties, getTrianglePointsAsPath } from '../../../../../common/componentsUtils';

type TrianglePrimitiveProps = {
  element: PrimitiveElement;
}

function TrianglePrimitive({ element }: TrianglePrimitiveProps): JSX.Element {
  return (
    <polygon
      {...getCommonPrimitiveProperties(element)}
      points={getTrianglePointsAsPath(element)}
    />
  );
}

export default TrianglePrimitive;
