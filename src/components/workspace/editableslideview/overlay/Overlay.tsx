import React from 'react';
import { Slide } from '../../../../model/types';
import { UUID } from '../../../../model/uuid';
import styles from './Overlay.module.css';
import SelectedElement from './elements/SelectedElement';

type OverlayProps = {
  slide: Slide;
  selectedSlideIDs: UUID[];
};

function Overlay({ slide, selectedSlideIDs }: OverlayProps): JSX.Element {
  return (
    <svg
      viewBox="0 0 800 600"
      className={styles.overlay}
    >
      {slide.elements.flatMap(element => {
        if (selectedSlideIDs.includes(element.id)) {
          return <SelectedElement key={element.id} element={element} />;
        }

        return [];
      })}
    </svg>
  );
}

export default Overlay;
