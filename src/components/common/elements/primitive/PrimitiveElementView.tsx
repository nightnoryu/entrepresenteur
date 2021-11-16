import React, { useRef } from 'react';
import { PrimitiveElement } from '../../../../model/types';
import '../ElementView.css';
import { selectPrimitive } from '../../../../common/componentsFunctions';
import useDragAndDrop from '../../../../hooks/useDragAndDrop';

type PrimitiveElementViewProps = {
  element: PrimitiveElement;
}

function PrimitiveElementView({ element }: PrimitiveElementViewProps): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const position = useDragAndDrop(ref, element.position);

  return (
    <div
      className="workspace__element-view"
      style={{
        width: element.dimensions.width,
        height: element.dimensions.height,
        left: position.x,
        top: position.y,
      }}
      draggable={false}
      ref={ref}
    >
      {selectPrimitive(element)}
    </div>
  );
}

export default PrimitiveElementView;
