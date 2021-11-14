import React from 'react';
import { TextElement } from '../../../../model/types';
import '../ElementView.css';
import './TextElementView.css';

type TextElementViewProps = {
  element: TextElement;
}

function TextElementView({ element }: TextElementViewProps): JSX.Element {
  return (
    <div
      className="workspace__element-view workspace__element-view_text"
      style={{
        color: element.color,
        fontFamily: element.font,
        fontSize: element.size,
        width: element.dimensions.width,
        height: element.dimensions.height,
        left: element.position.x,
        top: element.position.y,
      }}
    >
      {element.value}</div>
  );
}

export default TextElementView;
