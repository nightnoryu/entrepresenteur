import React, { useEffect, useRef } from 'react';
import '../SlideView/SlideView';
import { Slide } from '../../../model/types';
import styles from './SlideEntry.module.css';
import SlideView from '../SlideView/SlideView';
import { createNewSlide } from '../../../model/modelUtils';

type SlideThumbnailProps = {
  slide: Slide;
  index: number;
  isSelected: boolean;
  onClick: (event: React.MouseEvent) => void;
};

function SlideEntry({ slide, index, isSelected, onClick }: SlideThumbnailProps): JSX.Element {
  const displayedSlide = slide || createNewSlide();

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  }, []);

  return (
    <div
      className={isSelected ? styles.slideEntrySelected : styles.slideEntry}
      onClick={onClick}
      ref={ref}
    >
      <div className={isSelected ? styles.slideIndexSelected : styles.slideIndex}>
        {index}
      </div>
      <div className={isSelected ? styles.slideViewSelected : styles.slideView}>
        <SlideView slide={displayedSlide} />
      </div>
    </div>
  );
}

export default SlideEntry;
