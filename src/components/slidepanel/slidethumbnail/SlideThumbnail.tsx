import React, { useRef } from 'react';
import '../../slideview/SlideView';
import { Slide } from '../../../model/types';
import styles from './SlideThumbnail.module.css';
import SlideView from '../../slideview/SlideView';
import { createNewSlide } from '../../../model/model_utils';
import useEventListener from '../../../hooks/useEventListener';

type SlideThumbnailProps = {
  slide: Slide;
  index: number;
  isSelected: boolean;
  onClick?: () => void;
};

function SlideThumbnail({ slide, index, isSelected, onClick }: SlideThumbnailProps): JSX.Element {
  const displayedSlide = slide || createNewSlide();

  const ref = useRef(null);
  useEventListener('click', () => {
    if (onClick) {
      onClick();
    }
  }, ref);

  return (
    <div className={styles.slidethumbnail} ref={ref}>
      <span className={styles.slideindex}>{index}</span>
      <div className={styles.slideview}>
        <SlideView slide={displayedSlide} />
      </div>
    </div>
  );
}

export default SlideThumbnail;
