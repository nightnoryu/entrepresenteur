/* eslint-disable react/jsx-key */
import React from 'react';
import { PrimitiveElement, PrimitiveType } from '../../../../model/types';
import '../ElementView.css';
import RectanglePrimitive from './RectanglePrimitive';
import TrianglePrimitive from './TrianglePrimitive';
import cond from '../../../../common/cond';
import EllipsePrimitive from './EllipsePrimitive';

type PrimitiveElementViewProps = {
  element: PrimitiveElement;
}

function PrimitiveElementView({ element }: PrimitiveElementViewProps): JSX.Element {
  const primitiveElementStyles = {
    width: element.dimensions.width,
    height: element.dimensions.height,

    left: element.position.x,
    top: element.position.y,
  };

  const primitiveCond = cond([
    [PrimitiveType.RECTANGLE, <RectanglePrimitive element={element} />],
    [PrimitiveType.TRIANGLE, <TrianglePrimitive element={element} />],
    [PrimitiveType.ELLIPSE, <EllipsePrimitive element={element} />],
  ]);

  return (
    <div
      className="workspace__element-view"
      style={primitiveElementStyles}
    >
      {primitiveCond(element.primitiveType)}
    </div>
  );
}

export default PrimitiveElementView;
