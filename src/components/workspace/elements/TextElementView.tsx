import React from 'react';
import { TextElement } from '../../../model/types';

type TextElementViewProps = {
  textElement: TextElement;
}

function TextElementView({ textElement }: TextElementViewProps): JSX.Element {
  const textElementStyles = {
    color: textElement.color,
    fontFamily: textElement.font,
    fontSize: textElement.size,
  };

  return (
    <div className="workspace__element-view" style={textElementStyles}>{textElement.value}</div>
  );
}

export default TextElementView;
