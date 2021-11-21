import React from 'react';
import { ImageElement } from '../../../../model/types';
import styles from '../ElementView.module.css';

type ImageElementViewProps = {
  element: ImageElement;
}

function ImageElementView({ element }: ImageElementViewProps): JSX.Element {
  return (
    <img
      src={element.src}
      alt="Image"
      className={styles.element}
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
