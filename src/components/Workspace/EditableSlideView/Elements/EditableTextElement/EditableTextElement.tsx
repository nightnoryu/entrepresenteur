import React, { useRef } from 'react';
import { Position, TextElement } from '../../../../../model/types';
import { useDispatch } from 'react-redux';
import { actionCreators } from '../../../../../state';
import { bindActionCreators } from 'redux';
import useElementDragAndDrop from '../../../../../hooks/slideElements/useSlideElementDragAndDrop';
import useDoubleClick from '../../../../../hooks/mouse/useDoubleClick';
import useSlideElementActions from '../../../../../hooks/slideElements/useSlideElementActions';

type EditableTextElementProps = {
  element: TextElement;
  scaleFactor: number;
  delta: Position;
  setDelta: (position: Position) => void;
  isSelected: boolean;
  parentRef: React.RefObject<DocumentAndElementEventHandlers>;
}

function EditableTextElement(
  {
    element,
    scaleFactor,
    delta,
    setDelta,
    isSelected,
    parentRef,
  }: EditableTextElementProps,
): JSX.Element {
  const dispatch = useDispatch();
  const {
    selectElement,
    unselectElement,
    moveElements,
    setTextValue,
    removeElements,
  } = bindActionCreators(actionCreators, dispatch);

  const ref = useRef(null);

  useSlideElementActions(ref, element, isSelected, selectElement, unselectElement, parentRef);
  useElementDragAndDrop(ref, element, scaleFactor, delta, setDelta, moveElements);

  useDoubleClick(ref, () => {
    const newValue = prompt('Enter new value', element.value);
    if (newValue !== null) {
      if (newValue === '') {
        removeElements();
      }

      setTextValue(element.id, newValue);
    }
  });

  return (
    <text
      x={element.position.x}
      y={element.position.y}
      fill={element.color}
      dominantBaseline="hanging"
      textAnchor="left"
      style={{
        fontFamily: element.font,
        fontSize: element.size,
        width: element.dimensions.width,
        height: element.dimensions.height,
        userSelect: 'none',
        transform: isSelected ? `translate(${delta.x}px, ${delta.y}px)` : undefined,
      }}
      ref={ref}
    >
      {element.value}
    </text>
  );
}

export default EditableTextElement;
