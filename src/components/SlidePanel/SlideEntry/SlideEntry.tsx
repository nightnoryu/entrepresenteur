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
      className={styles.slideEntry}
      onClick={onClick}
      style={{
        backgroundColor: isSelected ? '#e1f4ed' : undefined,
      }}
      ref={ref}
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
          borderColor: isSelected ? '#89e6b0' : undefined,
        }}
      >
        <SlideView slide={displayedSlide} />
      </div>
    </div>
  );
}

export default SlideEntry;
