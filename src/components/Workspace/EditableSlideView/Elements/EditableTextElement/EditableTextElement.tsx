import React, { useRef } from 'react';
import { TextElement } from '../../../../../model/types';
import { useDispatch } from 'react-redux';
import { actionCreators } from '../../../../../state';
import { bindActionCreators } from 'redux';
import useElementDragAndDrop from '../../../../../hooks/dragAndDrop/useSlideElementDragAndDrop';
import useDoubleClick from '../../../../../hooks/mouse/useDoubleClick';
import useSlideElementActions from '../../../../../hooks/useSlideElementActions';

type EditableTextElementProps = {
  element: TextElement;
  scaleFactor: number;
  isSelected: boolean;
  parentRef: React.RefObject<DocumentAndElementEventHandlers>;
}

function EditableTextElement({ element, scaleFactor, isSelected, parentRef }: EditableTextElementProps): JSX.Element {
  const dispatch = useDispatch();
  const { selectElement, unselectElement, moveElements, setTextValue } = bindActionCreators(actionCreators, dispatch);

  const ref = useRef(null);

  useSlideElementActions(ref, element, isSelected, selectElement, unselectElement, parentRef);
  const delta = useElementDragAndDrop(ref, element, scaleFactor, moveElements);

  useDoubleClick(ref, () => {
    const newValue = prompt('Enter new value', element.value) || '';
    setTextValue(element.id, newValue);
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
        transform: `translate(${delta.x}px, ${delta.y}px)`,
      }}
      ref={ref}
    >
      {element.value}
    </text>
  );
}

export default EditableTextElement;
