import React, { useEffect, useRef, useState } from 'react';
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

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [editing, setEditing] = useState(false);
  const [editingValue, setEditingValue] = useState(element.value);

  useDoubleClick(ref, () => {
    setEditing(true);
  });
  useEffect(() => {
    const element = textareaRef.current;
    if (element && editing) {
      element.focus();
      element.selectionStart = element.selectionEnd = element.value.length;
    }
  }, [textareaRef, editing]);

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => setEditingValue(event.currentTarget.value);

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' || event.key === 'Escape') {
      event.currentTarget.blur();
      setEditing(false);
    }
  };

  const onBlur = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (event.currentTarget.value.trim() === '') {
      setEditingValue(element.value);
    } else {
      setTextValue(element.id, event.currentTarget.value);
    }
  };

  useEffect(() => {
    if (element.value !== editingValue) {
      setEditingValue(element.value);
    }
  }, [element.value]);

  return !editing
    ? (
      <>
        <text
          x={element.position.x}
          y={element.position.y}
          width={element.dimensions.width}
          height={element.dimensions.height}
          fill={element.color}
          dominantBaseline="hanging"
          textAnchor="left"
          style={{
            fontWeight: element.isBold ? 'bold' : undefined,
            fontStyle: element.isItalic ? 'italic' : undefined,
            fontFamily: mapFontToString(element.font),
            fontSize: element.size,
            userSelect: 'none',
            transform: isSelected ? `translate(${delta.x}px, ${delta.y}px)` : undefined,
            border: isSelected ? '1px solid #000000' : undefined,
          }}
        >
          {element.value}
        </text>

        <rect
          x={element.position.x}
          y={element.position.y}
          width={element.dimensions.width}
          height={element.dimensions.height}
          fill="#2a8ec8"
          stroke="#1563c8"
          fillOpacity={isSelected ? '0.3' : '0'}
          strokeOpacity={isSelected ? '0.3' : '0'}
          style={{ transform: `translate(${delta.x}px, ${delta.y}px)` }}
          ref={ref}
        />
      </>
    )
    : (
      <foreignObject
        x={element.position.x}
        y={element.position.y}
        width={element.dimensions.width}
        height={element.dimensions.height}
        className={styles.textWrapper}
      >
        <textarea
          value={editingValue}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onBlur={onBlur}
          className={styles.textInput}
          style={{
            fontWeight: element.isBold ? 'bold' : undefined,
            fontStyle: element.isItalic ? 'italic' : undefined,
            fontFamily: mapFontToString(element.font),
            fontSize: element.size,
            color: element.color,
          }}
          ref={textareaRef}
        />
      </foreignObject>
    );
}

export default EditableTextElement;
