import React from 'react';
import { ImageElement } from '../../../../../model/types';

type EditableImageProps = {
  element: ImageElement;
  isSelected: boolean;
}

function EditableImage({ element, isSelected }: EditableImageProps): JSX.Element {
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

export default EditableImage;
