import React from 'react';
import { ImageElement } from '../../../model/types';

type ImageElementViewProps = {
  imageElement: ImageElement;
}

function ImageElementView({ imageElement }: ImageElementViewProps): JSX.Element {
  return (
    <img src={imageElement.src} alt="Image" className="workspace__element-view" />
  );
}

export default ImageElementView;
