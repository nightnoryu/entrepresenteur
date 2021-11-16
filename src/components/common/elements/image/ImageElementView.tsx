import React, { useRef } from 'react';
import { ImageElement } from '../../../../model/types';
import '../ElementView.css';
import './ImageElementView.css';
import useDragAndDrop from '../../../../hooks/useDragAndDrop';

type ImageElementViewProps = {
  element: ImageElement;
}

function ImageElementView({ element }: ImageElementViewProps): JSX.Element {
  const ref = useRef<HTMLImageElement>(null);
  const position = useDragAndDrop(ref, element.position);

  return (
    <img
      src={element.src}
      alt="Image"
      className="workspace__element-view workspace__element-view_image"
      style={{
        width: element.dimensions.width,
        height: element.dimensions.height,
        left: position.x,
        top: position.y,
      }}
      draggable={false}
      ref={ref}
    />
  );
}

export default ImageElementView;
