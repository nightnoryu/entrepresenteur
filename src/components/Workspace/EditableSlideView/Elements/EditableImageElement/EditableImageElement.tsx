import React, { useRef } from 'react';
import { ImageElement } from '../../../../../model/types';
import { bindActionCreators } from 'redux';
import styles from '../EditableElement.module.css';
import { actionCreators } from '../../../../../state';
import { useDispatch } from 'react-redux';
import useSlideElementDragAndDrop from '../../../../../hooks/dragAndDrop/useSlideElementDragAndDrop';
import useSlideElementActions from '../../../../../hooks/useSlideElementActions';
import useSlideElementResize from '../../../../../hooks/useSlideElementResize';
import { getResizeAnchorProperties, getResizeAnchorTranslateDelta } from '../../../../../common/componentsUtils';

type EditableImageElementProps = {
  element: ImageElement;
  scaleFactor: number;
  isSelected: boolean;
  parentRef: React.RefObject<DocumentAndElementEventHandlers>;
}

function EditableImageElement({ element, scaleFactor, isSelected, parentRef }: EditableImageElementProps): JSX.Element {
  const dispatch = useDispatch();
  const { selectElement, unselectElement, moveElements, resizeElement } = bindActionCreators(actionCreators, dispatch);

  const resizeAnchorRef = useRef(null);
  const dimensions = useSlideElementResize(resizeAnchorRef, element, scaleFactor, resizeElement);

  const ref = useRef(null);
  useSlideElementActions(ref, element, isSelected, selectElement, unselectElement, parentRef, resizeAnchorRef);
  const delta = useSlideElementDragAndDrop(ref, element, scaleFactor, moveElements);

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
        style={{ transform: `translate(${delta.x}px, ${delta.y}px)` }}
        ref={isSelected ? undefined : ref}
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

export default EditableImageElement;
