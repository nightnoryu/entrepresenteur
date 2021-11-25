import React, { useRef } from 'react';
import '../../slideview/SlideView';
import { Slide } from '../../../model/types';
import styles from './SlideThumbnail.module.css';
import SlideView from '../../slideview/SlideView';
import { createNewSlide } from '../../../model/infrastructure_actions';
import useEventListener from '../../../hooks/useEventListener';
import { dispatch } from '../../../state/editor';
import { setCurrentSlide } from '../../../model/actions';

type SlideThumbnailProps = {
  slide: Slide;
  index: number;
  isSelected: boolean;
};

function SlideThumbnail({ slide, index, isSelected }: SlideThumbnailProps): JSX.Element {
  const displayedSlide = slide || createNewSlide();

  const ref = useRef(null);
  useEventListener('mousedown', () => {
    dispatch(setCurrentSlide, slide.id);
  }, ref);

  return (
    <div className={styles.slidethumbnail} ref={ref}>
      <div className={styles.slideindex}>{index}</div>
      <div className={styles.slideview}>
        <SlideView slide={displayedSlide} />
      </div>
    </div>
  );
}

export default SlideThumbnail;
