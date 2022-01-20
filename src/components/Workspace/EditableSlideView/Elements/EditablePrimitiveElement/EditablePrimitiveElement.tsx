import React, { useRef } from 'react';
import { Position, PrimitiveElement, PrimitiveType } from '../../../../../model/types';
import { useDispatch } from 'react-redux';
import {
  calculateEllipseProperties,
  getCommonPrimitiveProperties,
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
  const transform = isSelected ? `translate(${delta.x}px, ${delta.y}px)` : undefined;

  const getPrimitiveElement = () => {
    switch (element.primitiveType) {
    case PrimitiveType.RECTANGLE:
      return (
        <rect
          {...getCommonPrimitiveProperties(element)}
          x={element.position.x}
          y={element.position.y}
          width={dimensions.width}
          height={dimensions.height}
          style={{ transform }}
          ref={ref}
        />
      );
    case PrimitiveType.TRIANGLE:
      return (
        <polygon
          {...getCommonPrimitiveProperties(element)}
          points={getTrianglePointsAsPath({ ...element, dimensions })}
          style={{ transform }}
          ref={ref}
        />
      );
    case PrimitiveType.ELLIPSE:
      return (
        <ellipse
          {...getCommonPrimitiveProperties(element)}
          {...calculateEllipseProperties({ ...element, dimensions })}
          style={{ transform }}
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
        <>
          <SelectedOverlay
            element={element}
            dimensions={dimensions}
            delta={delta}
          />
          <ResizeAnchor
            element={element}
            delta={resizeAnchorDelta}
            ref={resizeAnchorRef}
          />
        </>
      }
    </>
  );
}

export default EditablePrimitiveElement;
