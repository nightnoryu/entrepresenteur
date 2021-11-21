import React from 'react';
import { PrimitiveElement, PrimitiveType } from '../../../../model/types';
import RectanglePrimitive from './RectanglePrimitive';
import EllipsePrimitive from './EllipsePrimitive';

type PrimitiveElementViewProps = {
  element: PrimitiveElement;
}

function PrimitiveElementView({ element }: PrimitiveElementViewProps): JSX.Element {
  switch (element.primitiveType) {
  case PrimitiveType.RECTANGLE:
    return <RectanglePrimitive element={element} />;
  case PrimitiveType.TRIANGLE:
    return <RectanglePrimitive element={element} />;
  case PrimitiveType.ELLIPSE:
    return <EllipsePrimitive element={element} />;
  }
}

export default PrimitiveElementView;
