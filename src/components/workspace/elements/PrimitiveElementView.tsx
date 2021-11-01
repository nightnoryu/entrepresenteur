import React from 'react';
import { PrimitiveElement } from '../../../model/types';

type PrimitiveElementViewProps = {
  primitiveElement: PrimitiveElement;
}

function PrimitiveElementView({ primitiveElement }: PrimitiveElementViewProps): JSX.Element {
  return (
    <div className="workspace__element-view">Primitive: {primitiveElement.id}</div>
  );
}

export default PrimitiveElementView;
