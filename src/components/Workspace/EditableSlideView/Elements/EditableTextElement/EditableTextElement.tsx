import React, { useRef, useState } from 'react';
import styles from './EditableTextElement.module.css';
import { Position, TextElement } from '../../../../../model/types';
import { useDispatch } from 'react-redux';
import { actionCreators } from '../../../../../state';
import { bindActionCreators } from 'redux';
import useElementDragAndDrop from '../../../../../hooks/slideElements/useSlideElementDragAndDrop';
import useDoubleClick from '../../../../../hooks/mouse/useDoubleClick';
import useSlideElementActions from '../../../../../hooks/slideElements/useSlideElementActions';
import { mapFontToString } from '../../../../../model/modelUtils';

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
  } = bindActionCreators(actionCreators, dispatch);

  const ref = useRef(null);

  useSlideElementActions(ref, element, isSelected, selectElement, unselectElement, parentRef);
  useElementDragAndDrop(ref, element, scaleFactor, delta, setDelta, moveElements);

  const [editing, setEditing] = useState(false);
  useDoubleClick(ref, () => {
    setEditing(true);
  });

  return !editing
    ? (
      <text
        x={element.position.x}
        y={element.position.y}
        fill={element.color}
        dominantBaseline="hanging"
        textAnchor="left"
        style={{
          fontWeight: element.isBold ? 'bold' : undefined,
          fontStyle: element.isItalic ? 'italic' : undefined,
          fontFamily: mapFontToString(element.font),
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
    )
    : (
      <foreignObject
        x={element.position.x}
        y={element.position.y}
        width={200}
        height={200}
        className={styles.textWrapper}
      >
        <input
          type="text"
          value={element.value}
          className={styles.textInput}
          style={{
            fontWeight: element.isBold ? 'bold' : undefined,
            fontStyle: element.isItalic ? 'italic' : undefined,
            fontFamily: mapFontToString(element.font),
            fontSize: element.size,
          }}
        />
      </foreignObject>
    );
}

export default EditableTextElement;
