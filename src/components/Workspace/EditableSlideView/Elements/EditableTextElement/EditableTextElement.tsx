import React, { useRef } from 'react';
import { TextElement } from '../../../../../model/types';
import { useDispatch } from 'react-redux';
import { actionCreators } from '../../../../../state';
import { bindActionCreators } from 'redux';
import useEventListener from '../../../../../hooks/useEventListener';
import useOnClickOutside from '../../../../../hooks/mouse/useOnClickOutside';
import useElementDragAndDrop from '../../../../../hooks/dragAndDrop/useSlideElementDragAndDrop';
import useDoubleClick from '../../../../../hooks/mouse/useDoubleClick';

type EditableTextElementProps = {
  element: TextElement;
  isSelected: boolean;
}

function EditableTextElement({ element, isSelected }: EditableTextElementProps): JSX.Element {
  const dispatch = useDispatch();
  const { selectElement, unselectElement, moveElements, setTextValue } = bindActionCreators(actionCreators, dispatch);

  const ref = useRef<SVGTextElement>(null);
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

  useDoubleClick(ref, () => {
    const newValue = prompt('Enter new value') || '';
    setTextValue(element.id, newValue);
  });

  const delta = useElementDragAndDrop(ref, element, moveElements);

  return (
    <text
      x={element.position.x}
      y={element.position.y}
      // dominantBaseline="hanging"
      // textAnchor="left"
      style={{
        color: element.color,
        fontFamily: element.font,
        fontSize: element.size,
        width: element.dimensions.width,
        height: element.dimensions.height,
        transform: `translate(${delta.x}px, ${delta.y}px)`,
        userSelect: 'none',
      }}
      ref={ref}
    >
      {element.value}
    </text>
  );
}

export default EditableTextElement;
