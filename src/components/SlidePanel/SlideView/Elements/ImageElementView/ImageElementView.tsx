import React from 'react';
import { ImageElement } from '../../../../../model/types';

type ImageElementViewProps = {
  element: ImageElement;
}

function ImageElementView({ element }: ImageElementViewProps): JSX.Element {
  return (
    <image
      href={element.src}
      x={element.position.x}
      y={element.position.y}
      width={element.dimensions.width}
      height={element.dimensions.height}
      preserveAspectRatio="none"
    />
  );
}

export default ImageElementView;
