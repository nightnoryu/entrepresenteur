import React from 'react';
import { ImageElement } from '../../../../model/types';
import '../ElementView.css';
import './ImageElementView.css';

type ImageElementViewProps = {
  imageElement: ImageElement;
}

function ImageElementView({ imageElement }: ImageElementViewProps): JSX.Element {
  const imageElementStyles = {
    width: imageElement.dimensions.width - 2,
    height: imageElement.dimensions.height - 2,

    left: imageElement.position.x,
    top: imageElement.position.y,
  };

  return (
    <img
      src={imageElement.src}
      alt="Image"
      className="workspace__element-view workspace__element-view_image"
      style={imageElementStyles}
    />
  );
}

export default ImageElementView;
