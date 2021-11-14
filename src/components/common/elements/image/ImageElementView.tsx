import React from 'react';
import { ImageElement } from '../../../../model/types';
import '../ElementView.css';
import './ImageElementView.css';

type ImageElementViewProps = {
  element: ImageElement;
}

function ImageElementView({ element }: ImageElementViewProps): JSX.Element {
  return (
    <img
      src={element.src}
      alt="Image"
      className="workspace__element-view workspace__element-view_image"
      style={{
        width: element.dimensions.width,
        height: element.dimensions.height,
        left: element.position.x,
        top: element.position.y,
      }}
    />
  );
}

export default ImageElementView;
