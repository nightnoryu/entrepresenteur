import React from 'react';
import '../../slideview/SlideView';
import { Slide } from '../../../model/types';
import styles from './SlideThumbnail.module.css';
import SlideView from '../../slideview/SlideView';
import { createNewSlide } from '../../../model/model_utils';

type SlideThumbnailProps = {
  slide: Slide;
  index: number;
  isSelected: boolean;
  onClick?: () => void;
};

function SlideThumbnail({ slide, index, isSelected, onClick }: SlideThumbnailProps): JSX.Element {
  const displayedSlide = slide || createNewSlide();

  return (
    <div className={styles.slidethumbnail} onClick={onClick}>
      <span className={styles.slideindex}>{index}</span>
      <div className={styles.slideview}>
        <SlideView slide={displayedSlide} />
      </div>
    </div>
  );
}

export default SlideThumbnail;
