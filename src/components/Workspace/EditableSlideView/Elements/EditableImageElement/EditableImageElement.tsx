import React, { useRef } from 'react';
import { ImageElement, Position } from '../../../../../model/types';
import { useDispatch } from 'react-redux';
import useSlideElementActions from '../../../../../hooks/slideElements/useSlideElementActions';
import { getResizeAnchorTranslateDelta } from '../../../../../common/componentsUtils';
import ResizeAnchor from '../../ResizeAnchor/ResizeAnchor';
import SelectedOverlay from '../../SelectedOverlay/SelectedOverlay';

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
  const transform = isSelected ? `translate(${delta.x}px, ${delta.y}px)` : undefined;

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
        style={{ transform }}
        ref={ref}
      />
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

export default EditableImageElement;
