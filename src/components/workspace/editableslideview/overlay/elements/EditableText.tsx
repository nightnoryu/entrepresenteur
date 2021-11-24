import React from 'react';
import { TextElement } from '../../../../../model/types';

type EditableTextProps = {
  element: TextElement;
  isSelected: boolean;
}

function EditableText({ element, isSelected }: EditableTextProps): JSX.Element {
  const selectedStyles = isSelected ? {
    fill: '#2a8ec8',
    stroke: '#1563c8',
    fillOpacity: '0.3',
    strokeOpacity: '0.3',
  } : {
    fillOpacity: '0',
    strokeOpacity: '0',
  };

  return (
    <rect
      x={element.position.x}
      y={element.position.y}
      width={element.dimensions.width}
      height={element.dimensions.height}
      rx="2"
      ry="2"
      {...selectedStyles}
    />
  );
}

export default EditableText;
