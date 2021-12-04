import React, { useRef } from 'react';
import { ImageElement } from '../../../../../model/types';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../../../state';
import { useDispatch } from 'react-redux';
import useEventListener from '../../../../../hooks/useEventListener';
import useOnClickOutside from '../../../../../hooks/mouse/useOnClickOutside';
import useElementDragAndDrop from '../../../../../hooks/dragAndDrop/useSlideElementDragAndDrop';

type EditableImageElementProps = {
  element: ImageElement;
  isSelected: boolean;
}

function EditableImageElement({ element, isSelected }: EditableImageElementProps): JSX.Element {
  const dispatch = useDispatch();
  const { selectElement, unselectElement, moveElements } = bindActionCreators(actionCreators, dispatch);

  const ref = useRef<SVGImageElement>(null);
  useEventListener('mousedown', () => {
    if (!isSelected) {
      selectElement(element.id);
    }
  }, ref);

  useOnClickOutside(ref, event => {
    if (isSelected && !event.ctrlKey) {
      unselectElement(element.id);
    }
  });

  const delta = useElementDragAndDrop(ref, element, moveElements);

  return (
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
  );
}

export default EditableImageElement;
