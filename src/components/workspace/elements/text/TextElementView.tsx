import React from 'react';
import { TextElement } from '../../../../model/types';
import '../ElementView.css';
import './TextElementView.css';

type TextElementViewProps = {
  element: TextElement;
}

function TextElementView({ element }: TextElementViewProps): JSX.Element {
  const textElementStyles = {
    color: element.color,
    fontFamily: element.font,
    fontSize: element.size,

    width: element.dimensions.width - 2,
    height: element.dimensions.height - 2,

    left: element.position.x,
    top: element.position.y,
  };

  return (
    <div
      className="workspace__element-view workspace__element-view_text"
      style={textElementStyles}
    >
      {element.value}</div>
  );
}

export default TextElementView;
