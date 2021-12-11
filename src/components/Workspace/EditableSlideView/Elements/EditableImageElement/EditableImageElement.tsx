import React, { useRef } from 'react';
import { ImageElement } from '../../../../../model/types';
import { bindActionCreators } from 'redux';
import styles from '../EditableElement.module.css';
import { actionCreators } from '../../../../../state';
import { useDispatch } from 'react-redux';
import useSlideElementDragAndDrop from '../../../../../hooks/dragAndDrop/useSlideElementDragAndDrop';
import useSlideElementActions from '../../../../../hooks/useSlideElementActions';
import useSlideElementResize from '../../../../../hooks/useSlideElementResize';
import { getResizeAnchorProperties } from '../../../../../common/componentsUtils';

type EditableImageElementProps = {
  element: ImageElement;
  scaleFactor: number;
  isSelected: boolean;
}

function EditableImageElement({ element, scaleFactor, isSelected }: EditableImageElementProps): JSX.Element {
  const dispatch = useDispatch();
  const { selectElement, unselectElement, moveElements, resizeElement } = bindActionCreators(actionCreators, dispatch);

  const ref = useRef(null);
  useSlideElementActions(ref, element, isSelected, selectElement, unselectElement);
  const delta = useSlideElementDragAndDrop(ref, element, scaleFactor, moveElements);

  const resizeAnchorRef = useRef(null);
  useSlideElementResize(resizeAnchorRef, element, scaleFactor, resizeElement);

  return (
    <>
      <image
        href={element.src}
        x={element.position.x}
        y={element.position.y}
        width={element.dimensions.width}
        height={element.dimensions.height}
        onDragStart={e => e.preventDefault()}
        style={{ transform: `translate(${delta.x}px, ${delta.y}px)` }}
        ref={ref}
      />
      <rect
        ref={resizeAnchorRef}
        {...getResizeAnchorProperties(element)}
        className={styles.resizeAnchor}
        style={{ transform: `translate(${delta.x}px, ${delta.y}px)` }}
      />
    </>
  );
}

export default EditableImageElement;
