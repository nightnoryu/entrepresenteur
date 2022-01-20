import React from 'react';
import { PrimitiveElement } from '../../../../../model/types';
import { calculateEllipseProperties, getCommonPrimitiveProperties } from '../../../../../common/componentsUtils';

type EllipsePrimitiveProps = {
  element: PrimitiveElement;
}

function EllipsePrimitive({ element }: EllipsePrimitiveProps): JSX.Element {
  return (
    <ellipse
      {...getCommonPrimitiveProperties(element)}
      {...calculateEllipseProperties(element)}
    />
  );
}

export default EllipsePrimitive;
