import React, { useRef } from 'react';
import { TextElement } from '../../../../model/types';
import '../ElementView.css';
import './TextElementView.css';
import useDragAndDrop from '../../../../hooks/useDragAndDrop';

type TextElementViewProps = {
  element: TextElement;
}

function TextElementView({ element }: TextElementViewProps): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const position = useDragAndDrop(ref, element.position);

  return (
    <div
      className="workspace__element-view workspace__element-view_text"
      style={{
        color: element.color,
        fontFamily: element.font,
        fontSize: element.size,
        width: element.dimensions.width,
        height: element.dimensions.height,
        left: position.x,
        top: position.y,
      }}
      draggable={false}
      ref={ref}
    >
      {element.value}</div>
  );
}

export default TextElementView;
