import React from 'react';
import { SlideElement } from '../../../../../model/types';

type SelectedElementProps = {
  element: SlideElement;
}

function SelectedElement({ element }: SelectedElementProps): JSX.Element {
  return (
    <rect
      x={element.position.x}
      y={element.position.y}
      width={element.dimensions.width}
      height={element.dimensions.height}
      fill="#2A8EC8"
      stroke="#1563C8"
      fillOpacity="0.3"
      strokeOpacity="0.3"
      rx="2"
      ry="2"
    />
  );
}

export default SelectedElement;
