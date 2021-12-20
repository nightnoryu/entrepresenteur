import React, { useRef } from 'react';
import styles from './SlidePanel.module.css';
import { UUID } from '../../model/uuid';
import { Slide } from '../../model/types';
import SlideThumbnail from './SlideThumbnail/SlideThumbnail';
import { connect, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../state';
import { RootState } from '../../state/reducers';
import useHotkey from '../../hooks/hotkeys/useHotkey';

type SlidePanelProps = {
  slides: Slide[];
  selectedSlideIDs: UUID[];
}

function SlidePanel({ slides, selectedSlideIDs }: SlidePanelProps): JSX.Element {
  const dispatch = useDispatch();
  const { setCurrentSlide, selectSlide, removeSlides } = bindActionCreators(actionCreators, dispatch);

  const ref = useRef(null);
  useHotkey('Delete', () => {
    removeSlides();
  }, ref);

  return (
    <div
      className={styles.slidepanel}
      ref={ref}
      tabIndex={1}
    >
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
    selectedSlideIDs: state.selections.selectedSlideIDs,
  };
}

export default connect(mapStateToProps)(SlidePanel);
