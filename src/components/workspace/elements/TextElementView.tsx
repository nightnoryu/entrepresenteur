import React from 'react';
import { TextElement } from '../../../model/types';
import './ElementView.css';
import './TextElementView.css';

type TextElementViewProps = {
  textElement: TextElement;
}

function TextElementView({ textElement }: TextElementViewProps): JSX.Element {
  const textElementStyles = {
    color: textElement.color,
    fontFamily: textElement.font,
    fontSize: textElement.size,

    width: textElement.dimensions.width,
    height: textElement.dimensions.height,

    left: textElement.position.x,
    top: textElement.position.y,
  };

  return (
    <div
      className="workspace__element-view workspace__element-view_text"
      style={textElementStyles}
    >
      {textElement.value}</div>
  );
}

export default TextElementView;
