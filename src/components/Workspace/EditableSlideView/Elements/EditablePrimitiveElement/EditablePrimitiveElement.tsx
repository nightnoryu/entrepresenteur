import React, { useRef } from 'react';
import { PrimitiveElement, PrimitiveType } from '../../../../../model/types';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import useEventListener from '../../../../../hooks/useEventListener';
import useOnClickOutside from '../../../../../hooks/mouse/useOnClickOutside';
import useElementDragAndDrop from '../../../../../hooks/dragAndDrop/useSlideElementDragAndDrop';
import { actionCreators } from '../../../../../state';
import { calculateEllipseProperties, getTrianglePoints } from '../../../../../common/componentsUtils';

type EditablePrimitiveElementProps = {
  element: PrimitiveElement;
  scaleFactor: number;
  isSelected: boolean;
}

function EditablePrimitiveElement({ element, scaleFactor, isSelected }: EditablePrimitiveElementProps): JSX.Element {
  const dispatch = useDispatch();
  const { selectElement, unselectElement, moveElements } = bindActionCreators(actionCreators, dispatch);

  const ref = useRef(null);
  useEventListener('mousedown', () => {
    if (!isSelected) {
      selectElement(element.id);
    }
  }, ref);

  useOnClickOutside(ref, event => {
    if (isSelected && !event.ctrlKey) {
      unselectElement(element.id);
    }
  });

  const delta = useElementDragAndDrop(ref, element, scaleFactor, moveElements);

  switch (element.primitiveType) {
  case PrimitiveType.RECTANGLE:
    return (
      <rect
        x={element.position.x}
        y={element.position.y}
        width={element.dimensions.width}
        height={element.dimensions.height}
        fill={element.fill}
        stroke={element.stroke}
        style={delta && { transform: `translate(${delta.x}px, ${delta.y}px)` }}
        ref={ref}
      />
    );
  case PrimitiveType.TRIANGLE:
    return (
      <polygon
        points={getTrianglePoints(element)}
        fill={element.fill}
        stroke={element.stroke}
        style={delta && { transform: `translate(${delta.x}px, ${delta.y}px)` }}
        ref={ref}
      />
    );
  case PrimitiveType.ELLIPSE: {
    const properties = calculateEllipseProperties(element);

    return (
      <ellipse
        cx={properties.cx}
        cy={properties.cy}
        rx={properties.rx}
        ry={properties.ry}
        fill={element.fill}
        stroke={element.stroke}
        style={delta && { transform: `translate(${delta.x}px, ${delta.y}px)` }}
        ref={ref}
      />
    );
  }
  }
}

export default EditablePrimitiveElement;
