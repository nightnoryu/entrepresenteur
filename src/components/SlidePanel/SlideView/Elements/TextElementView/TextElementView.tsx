import React from 'react';
import { TextElement } from '../../../../../model/types';
import { mapFontToString } from '../../../../../model/modelUtils';

type TextElementViewProps = {
  element: TextElement;
}

function TextElementView({ element }: TextElementViewProps): JSX.Element {
  return (
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
      }}
    >
      {element.value}
    </text>
  );
}

export default TextElementView;
