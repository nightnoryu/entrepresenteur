import React from 'react';
import styles from './SlidePanel.module.css';
import { UUID } from '../../model/uuid';
import { Slide } from '../../model/types';
import SlideThumbnail from './slidethumbnail/SlideThumbnail';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../state';

type SlidePanelProps = {
  slides: Slide[];
  selectedSlideIDs: UUID[];
}

function SlidePanel({ slides, selectedSlideIDs }: SlidePanelProps): JSX.Element {
  const dispatch = useDispatch();
  const { setCurrentSlide } = bindActionCreators(actionCreators, dispatch);

  return (
    <div className={styles.slidepanel}>
      {slides.map((slide, i) => (
        <SlideThumbnail
          key={slide.id}
          slide={slide}
          index={i + 1}
          isSelected={selectedSlideIDs.includes(slide.id)}
          onClick={() => {
            setCurrentSlide(slide.id);
          }}
        />
      ))}
    </div>);
}

export default SlidePanel;
