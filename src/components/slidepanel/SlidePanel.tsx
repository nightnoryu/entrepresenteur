import React from 'react';
import styles from './SlidePanel.module.css';
import { UUID } from '../../model/uuid';
import { Slide } from '../../model/types';
import SlideThumbnail from './slidethumbnail/SlideThumbnail';
import { dispatch } from '../../state/editor';
import { selectSlide } from '../../model/actions';

type SlidePanelProps = {
  slides: Slide[];
  selectedSlideIDs: UUID[];
}

function SlidePanel({ slides, selectedSlideIDs }: SlidePanelProps): JSX.Element {
  return (
    <div className={styles.slidepanel}>
      {slides.map((slide, i) => (
        <SlideThumbnail
          key={slide.id}
          slide={slide}
          index={i + 1}
          isSelected={selectedSlideIDs.includes(slide.id)}
          onSelect={() => {
            dispatch(selectSlide, [ slide.id ]);
          }}
        />
      ))}
    </div>);
}

export default SlidePanel;
