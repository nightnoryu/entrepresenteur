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
  return (
    <div
      className="workspace__element-view"
      style={getPrimitiveElementStyles(element)}
    >
      {selectPrimitive(element)}
    </div>
  );
}

export default PrimitiveElementView;

function getPrimitiveElementStyles(element: PrimitiveElement) {
  return {
    width: element.dimensions.width,
    height: element.dimensions.height,
    left: element.position.x,
    top: element.position.y,
  };
}

function selectPrimitive(element: PrimitiveElement) {
  return cond([
    [PrimitiveType.RECTANGLE, <RectanglePrimitive element={element} />],
    [PrimitiveType.TRIANGLE, <TrianglePrimitive element={element} />],
    [PrimitiveType.ELLIPSE, <EllipsePrimitive element={element} />],
  ])(element.primitiveType);
}
