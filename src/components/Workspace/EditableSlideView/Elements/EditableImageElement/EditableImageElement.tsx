import React, { useRef } from 'react';
import { ImageElement, Position } from '../../../../../model/types';
import { useDispatch } from 'react-redux';
import useSlideElementActions from '../../../../../hooks/slideElements/useSlideElementActions';
import { getResizeAnchorTranslateDelta } from '../../../../../common/componentsUtils';
import ResizeAnchor from '../../ResizeAnchor/ResizeAnchor';

type EditableImageElementProps = {
  element: ImageElement;
  scaleFactor: number;
  delta: Position;
  setDelta: (position: Position) => void;
  isSelected: boolean;
  parentRef: React.RefObject<DocumentAndElementEventHandlers>;
}

function EditableImageElement(
  {
    element,
    scaleFactor,
    delta,
    setDelta,
    isSelected,
    parentRef,
  }: EditableImageElementProps,
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

  return (
    <>
      <image
        href={element.src}
        x={element.position.x}
        y={element.position.y}
        width={dimensions.width}
        height={dimensions.height}
        preserveAspectRatio="none"
        onDragStart={e => e.preventDefault()}
        style={{ transform: isSelected ? `translate(${delta.x}px, ${delta.y}px)` : undefined }}
        ref={ref}
      />
      {
        isSelected &&
        <rect
          x={element.position.x}
          y={element.position.y}
          width={dimensions.width}
          height={dimensions.height}
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

export default EditableImageElement;
