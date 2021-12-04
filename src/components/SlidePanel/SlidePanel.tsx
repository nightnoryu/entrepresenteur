import React from 'react';
import styles from './SlidePanel.module.css';
import { UUID } from '../../model/uuid';
import { Slide } from '../../model/types';
import SlideThumbnail from './SlideThumbnail/SlideThumbnail';
import { connect, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../state';
import { RootState } from '../../state/reducers';

type SlidePanelProps = {
  slides: Slide[];
  selectedSlideIDs: UUID[];
}

function SlidePanel({ slides, selectedSlideIDs }: SlidePanelProps): JSX.Element {
  const dispatch = useDispatch();
  const { setCurrentSlide, selectSlide } = bindActionCreators(actionCreators, dispatch);

  return (
    <div className={styles.slidepanel}>
      {slides.map((slide, i) => (
        <SlideThumbnail
          key={slide.id}
          slide={slide}
          index={i + 1}
          isSelected={selectedSlideIDs.includes(slide.id)}
          onClick={event => {
            if (event.ctrlKey) {
              selectSlide(slide.id);
            } else {
              setCurrentSlide(slide.id);
            }
          }}
        />
      ))}
    </div>);
}

function mapStateToProps(state: RootState): SlidePanelProps {
  return {
    slides: state.presentation.slides,
    selectedSlideIDs: state.selectedSlideIDs,
  };
}

export default connect(mapStateToProps)(SlidePanel);
