import React, { useEffect, useRef, useState } from 'react';
import styles from './EditableTextElement.module.css';
import { Position, TextElement } from '../../../../../model/types';
import { useDispatch } from 'react-redux';
import { actionCreators } from '../../../../../state';
import { bindActionCreators } from 'redux';
import useDoubleClick from '../../../../../hooks/mouse/useDoubleClick';
import useSlideElementActions from '../../../../../hooks/slideElements/useSlideElementActions';
import { mapFontToString } from '../../../../../model/modelUtils';
import { getResizeAnchorTranslateDelta } from '../../../../../common/componentsUtils';
import useEventListener from '../../../../../hooks/useEventListener';
import ResizeAnchor from '../../ResizeAnchor/ResizeAnchor';

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
  const { unselectElement, setTextValue } = bindActionCreators(actionCreators, dispatch);

  const resizeAnchorRef = useRef(null);
  const ref = useRef(null);

  const dimensions = useSlideElementActions(
    element,
    ref,
    resizeAnchorRef,
    parentRef,
    isSelected,
    scaleFactor,
    delta,
    setDelta,
    dispatch,
  );

  const resizeAnchorDelta = getResizeAnchorTranslateDelta(element, delta, dimensions);

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
    event.stopPropagation();
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

  useEffect(() => {
    if (element.value === '') {
      setEditing(true);
    }
  }, [element.value]);

  useEffect(() => {
    if (!isSelected) {
      textareaRef.current?.blur();
      setEditing(false);
    }
  }, [isSelected]);

  useEventListener('mousedown', event => {
    if (event.target === parentRef?.current) {
      textareaRef.current?.blur();
      setEditing(false);
      unselectElement(element.id);
    }
  });

  return !editing
    ? (
      <>
        <text
          x={element.position.x}
          y={element.position.y}
          width={dimensions.width}
          height={dimensions.height}
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
          width={dimensions.width}
          height={dimensions.height}
          fill="#2a8ec8"
          stroke="#1563c8"
          fillOpacity={isSelected ? '0.3' : '0'}
          strokeOpacity={isSelected ? '0.3' : '0'}
          style={{ transform: `translate(${delta.x}px, ${delta.y}px)` }}
          ref={ref}
        />

        {
          isSelected &&
          <ResizeAnchor
            element={element}
            delta={resizeAnchorDelta}
            ref={resizeAnchorRef}
          />
        }
      </>
    )
    : (
      <foreignObject
        x={element.position.x - 2}
        y={element.position.y - 2}
        width={element.dimensions.width - 2}
        height={element.dimensions.height - 2}
        className={styles.textWrapper}
      >
        <textarea
          value={editingValue}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onBlur={onBlur}
          spellCheck="true"
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
