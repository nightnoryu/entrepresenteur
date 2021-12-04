import React, { useRef, useState } from 'react';
import { ImageElement, Position } from '../../../../../model/types';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../../../state';
import { useDispatch } from 'react-redux';
import useEventListener from '../../../../../hooks/useEventListener';
import useOnClickOutside from '../../../../../hooks/mouse/useOnClickOutside';
import useDragAndDrop from '../../../../../hooks/dragAndDrop/useDragAndDrop';

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

  const [delta, setDelta] = useState({ x: 0, y: 0 });
  let scaleFactor = 1;
  let startPos: Position;

  if (ref?.current) {
    scaleFactor = element.dimensions.width / ref.current.getBoundingClientRect().width;
  }

  const onStart = (event: MouseEvent) => {
    startPos = {
      x: event.pageX,
      y: event.pageY,
    };
  };

  const onMove = (event: MouseEvent) => {
    setDelta({
      x: scaleFactor * (event.pageX - startPos.x),
      y: scaleFactor * (event.pageY - startPos.y),
    });
  };

  const onFinish = () => {
    moveElements(delta);
    setDelta({ x: 0, y: 0 });
  };

  useDragAndDrop(ref, onStart, onMove, onFinish);

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
