import React, { useRef } from 'react';
import { Position, PrimitiveElement, PrimitiveType } from '../../../../../model/types';
import { useDispatch } from 'react-redux';
import {
  calculateEllipseProperties,
  getPrimitiveStrokeStyle,
  getResizeAnchorTranslateDelta,
  getTrianglePoints,
} from '../../../../../common/componentsUtils';
import useSlideElementActions from '../../../../../hooks/slideElements/useSlideElementActions';
import ResizeAnchor from '../../ResizeAnchor/ResizeAnchor';

type EditablePrimitiveElementProps = {
  element: PrimitiveElement;
  scaleFactor: number;
  delta: Position;
  setDelta: (position: Position) => void;
  isSelected: boolean;
  parentRef: React.RefObject<DocumentAndElementEventHandlers>;
}

function EditablePrimitiveElement(
  {
    element,
    scaleFactor,
    delta,
    setDelta,
    isSelected,
    parentRef,
  }: EditablePrimitiveElementProps,
): JSX.Element {
  const dispatch = useDispatch();

  const ref = useRef(null);
  const resizeAnchorRef = useRef(null);

  const dimensions = useSlideElementActions(
    element,
    ref,
    resizeAnchorRef,
    parentRef,
    isSelected,
    scaleFactor,
    delta,
    setDelta,
    dispatch,
  );

  const resizeAnchorDelta = getResizeAnchorTranslateDelta(element, delta, dimensions);

  const getPrimitiveElement = () => {
    switch (element.primitiveType) {
    case PrimitiveType.RECTANGLE:
      return (
        <rect
          x={element.position.x}
          y={element.position.y}
          width={dimensions.width}
          height={dimensions.height}
          fill={element.fill}
          stroke={element.stroke}
          strokeDasharray={getPrimitiveStrokeStyle(element.strokeStyle)}
          strokeWidth={element.strokeSize}
          style={{ transform: isSelected ? `translate(${delta.x}px, ${delta.y}px)` : undefined }}
          ref={ref}
        />
      );
    case PrimitiveType.TRIANGLE:
      return (
        <polygon
          points={getTrianglePoints({ ...element, dimensions })}
          fill={element.fill}
          stroke={element.stroke}
          strokeDasharray={getPrimitiveStrokeStyle(element.strokeStyle)}
          strokeWidth={element.strokeSize}
          style={{ transform: isSelected ? `translate(${delta.x}px, ${delta.y}px)` : undefined }}
          ref={ref}
        />
      );
    case PrimitiveType.ELLIPSE:
      return (
        <ellipse
          {...calculateEllipseProperties({ ...element, dimensions })}
          fill={element.fill}
          stroke={element.stroke}
          strokeDasharray={getPrimitiveStrokeStyle(element.strokeStyle)}
          strokeWidth={element.strokeSize}
          style={{ transform: isSelected ? `translate(${delta.x}px, ${delta.y}px)` : undefined }}
          ref={ref}
        />
      );
    }
  };

  return (
    <>
      {getPrimitiveElement()}
      {
        isSelected &&
        <rect
          x={element.position.x - element.strokeSize / 2}
          y={element.position.y - element.strokeSize / 2}
          width={dimensions.width + element.strokeSize / 2}
          height={dimensions.height + element.strokeSize / 2}
          fill="#2a8ec8"
          stroke="#1563c8"
          fillOpacity="0.3"
          strokeOpacity="0.3"
          style={{ transform: `translate(${delta.x}px, ${delta.y}px)`, pointerEvents: 'none' }}
        />
      }
      {
        isSelected &&
        <ResizeAnchor
          element={element}
          delta={resizeAnchorDelta}
          ref={resizeAnchorRef}
        />
      }
    </>
  );
}

export default EditablePrimitiveElement;
