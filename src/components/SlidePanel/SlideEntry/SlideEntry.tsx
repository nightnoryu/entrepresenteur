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
      style={{
        backgroundColor: isSelected ? '#fdf7e6' : undefined,
      }}
    >
      <div
        className={styles.slideIndex}
        style={{
          fontWeight: isSelected ? 'bold' : undefined,
        }}
      >
        {index}
      </div>

      <div
        className={styles.slideView}
        style={{
          borderColor: isSelected ? '#eda912' : undefined,
        }}
      >
        <SlideView slide={displayedSlide} />
      </div>
    </div>
  );
}

export default SlideEntry;
