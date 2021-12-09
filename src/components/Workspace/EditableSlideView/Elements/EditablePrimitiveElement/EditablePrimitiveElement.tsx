import React, { useRef } from 'react';
import { PrimitiveElement, PrimitiveType } from '../../../../../model/types';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import useElementDragAndDrop from '../../../../../hooks/dragAndDrop/useSlideElementDragAndDrop';
import { actionCreators } from '../../../../../state';
import { calculateEllipseProperties, getTrianglePoints } from '../../../../../common/componentsUtils';
import useSlideElementActions from '../../../../../hooks/useSlideElementActions';

type EditablePrimitiveElementProps = {
  element: PrimitiveElement;
  scaleFactor: number;
  isSelected: boolean;
}

function EditablePrimitiveElement({ element, scaleFactor, isSelected }: EditablePrimitiveElementProps): JSX.Element {
  const dispatch = useDispatch();
  const { selectElement, unselectElement, moveElements } = bindActionCreators(actionCreators, dispatch);

  const ref = useRef(null);

  useSlideElementActions(ref, element, isSelected, selectElement, unselectElement);
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
