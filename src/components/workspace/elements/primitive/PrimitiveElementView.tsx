/* eslint-disable react/jsx-key */
import React from 'react';
import { PrimitiveElement, PrimitiveType } from '../../../../model/types';
import '../ElementView.css';
import RectanglePrimitive from './RectanglePrimitive';
import TrianglePrimitive from './TrianglePrimitive';
import cond from '../../../../common/cond';
import EllipsePrimitive from './EllipsePrimitive';

type PrimitiveElementViewProps = {
  primitiveElement: PrimitiveElement;
}

function PrimitiveElementView({ primitiveElement }: PrimitiveElementViewProps): JSX.Element {
  const primitiveElementStyles = {
    width: primitiveElement.dimensions.width,
    height: primitiveElement.dimensions.height,

    left: primitiveElement.position.x,
    top: primitiveElement.position.y,
  };

  const primitiveCond = cond([
    [PrimitiveType.RECTANGLE, <RectanglePrimitive rectanglePrimitiveElement={primitiveElement} />],
    [PrimitiveType.TRIANGLE, <TrianglePrimitive trianglePrimitiveElement={primitiveElement} />],
    [PrimitiveType.ELLIPSE, <EllipsePrimitive ellipsePrimitiveElement={primitiveElement} />],
    [true, <div>Unknown primitive type</div>],
  ]);

  return (
    <div
      className="workspace__element-view"
      style={primitiveElementStyles}
    >
      {primitiveCond(primitiveElement.primitiveType)}
    </div>
  );
}

export default PrimitiveElementView;
