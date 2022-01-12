import React from 'react';
import '../SlideView/SlideView';
import { Slide } from '../../../model/types';
import styles from './SlideEntry.module.css';
import SlideView from '../SlideView/SlideView';
import { createNewSlide } from '../../../model/modelUtils';

type SlideThumbnailProps = {
  slide: Slide;
  index: number;
  isSelected: boolean;
  onClick?: (event: React.MouseEvent) => void;
};

function SlideEntry({ slide, index, isSelected, onClick }: SlideThumbnailProps): JSX.Element {
  const displayedSlide = slide || createNewSlide();

  return (
    <div
      className={styles.slideEntry}
      onClick={(event) => {
        if (onClick) {
          onClick(event);
        }
      }}
      style={isSelected ? {
        border: '2px solid blue',
      } : {}}
    >
      <span className={styles.slideIndex}>{index}</span>
      <div className={styles.slideView}>
        <SlideView slide={displayedSlide} />
      </div>
    </div>
  );
}

export default SlideEntry;
