import React, { useRef } from 'react';
import { ImageElement, Position } from '../../../../../model/types';
import { bindActionCreators } from 'redux';
import styles from '../EditableElement.module.css';
import { actionCreators } from '../../../../../state';
import { useDispatch } from 'react-redux';
import useSlideElementDragAndDrop from '../../../../../hooks/slideElements/useSlideElementDragAndDrop';
import useSlideElementActions from '../../../../../hooks/slideElements/useSlideElementActions';
import useSlideElementResize from '../../../../../hooks/slideElements/useSlideElementResize';
import { getResizeAnchorProperties, getResizeAnchorTranslateDelta } from '../../../../../common/componentsUtils';

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
  const {
    setCurrentElement,
    selectElement,
    unselectElement,
    moveElements,
    resizeElement,
  } = bindActionCreators(actionCreators, dispatch);

  const resizeAnchorRef = useRef(null);
  const dimensions = useSlideElementResize(resizeAnchorRef, element, scaleFactor, resizeElement);

  const ref = useRef(null);
  useSlideElementActions(ref, element, isSelected, selectElement, unselectElement, parentRef);
  useSlideElementDragAndDrop(ref, element, scaleFactor, delta, setDelta, moveElements, setCurrentElement, isSelected);

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

export default EditableImageElement;
