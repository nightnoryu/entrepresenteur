import React, { useRef } from 'react';
import { Position, PrimitiveElement, PrimitiveType } from '../../../../../model/types';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import useElementDragAndDrop from '../../../../../hooks/dragAndDrop/useSlideElementDragAndDrop';
import { actionCreators } from '../../../../../state';
import {
  calculateEllipseProperties,
  getResizeAnchorProperties,
  getResizeAnchorTranslateDelta,
  getTrianglePoints,
} from '../../../../../common/componentsUtils';
import useSlideElementActions from '../../../../../hooks/useSlideElementActions';
import useSlideElementResize from '../../../../../hooks/useSlideElementResize';
import styles from '../EditableElement.module.css';

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
  const { selectElement, unselectElement, moveElements, resizeElement } = bindActionCreators(actionCreators, dispatch);

  const resizeAnchorRef = useRef(null);
  const dimensions = useSlideElementResize(resizeAnchorRef, element, scaleFactor, resizeElement);

  const ref = useRef(null);
  useSlideElementActions(ref, element, isSelected, selectElement, unselectElement, parentRef, resizeAnchorRef);
  useElementDragAndDrop(ref, element, scaleFactor, delta, setDelta, moveElements);

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
          style={{ transform: isSelected ? `translate(${delta.x}px, ${delta.y}px)` : undefined }}
          ref={isSelected ? undefined : ref}
        />
      );
    case PrimitiveType.TRIANGLE:
      return (
        <polygon
          points={getTrianglePoints({ ...element, dimensions })}
          fill={element.fill}
          stroke={element.stroke}
          style={{ transform: `translate(${delta.x}px, ${delta.y}px)` }}
          ref={isSelected ? undefined : ref}
        />
      );
    case PrimitiveType.ELLIPSE: {
      const properties = calculateEllipseProperties({ ...element, dimensions });

      return (
        <ellipse
          cx={properties.cx}
          cy={properties.cy}
          rx={properties.rx}
          ry={properties.ry}
          fill={element.fill}
          stroke={element.stroke}
          style={{ transform: isSelected ? `translate(${delta.x}px, ${delta.y}px)` : undefined }}
          ref={isSelected ? undefined : ref}
        />
      );
    }
    }
  };

  return (
    <>
      {getPrimitiveElement()}
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
              style={{ transform: `translate(${delta.x}px, ${delta.y}px)` }}
              ref={isSelected ? ref : undefined}
          />
      }
      {
        isSelected &&
          <rect
              ref={resizeAnchorRef}
              {...getResizeAnchorProperties(element)}
              className={styles.resizeAnchor}
              style={{ transform: `translate(${resizeAnchorDelta.x}px, ${resizeAnchorDelta.y}px)` }}
          />
      }
    </>
  );
}

export default EditablePrimitiveElement;
