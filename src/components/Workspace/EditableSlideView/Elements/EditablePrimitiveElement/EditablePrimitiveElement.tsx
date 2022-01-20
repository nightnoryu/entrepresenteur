import React, { useRef } from 'react';
import { Position, PrimitiveElement, PrimitiveType } from '../../../../../model/types';
import { useDispatch } from 'react-redux';
import {
  calculateEllipseProperties,
  getPrimitiveStrokeStyle,
  getResizeAnchorTranslateDelta,
  getTrianglePointsAsPath,
} from '../../../../../common/componentsUtils';
import useSlideElementActions from '../../../../../hooks/slideElements/useSlideElementActions';
import ResizeAnchor from '../../ResizeAnchor/ResizeAnchor';
import SelectedOverlay from '../../SelectedOverlay/SelectedOverlay';

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
          points={getTrianglePointsAsPath({ ...element, dimensions })}
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
        <SelectedOverlay
          element={element}
          dimensions={dimensions}
          delta={delta}
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
