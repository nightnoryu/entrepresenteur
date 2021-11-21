import React from 'react';
import '../../../slideview/SlideView';
import { Slide } from '../../../../model/types';
import './SlideThumbnail.css';
import SlideView from '../../../slideview/SlideView';
import { createNewSlide } from '../../../../model/infrastructure_actions';

type SlideThumbnailProps = {
  slide?: Slide;
  index?: number;
  selected?: boolean;
  onSelect?: () => void;
};

export function SlideThumbnail({ slide, index, selected, onSelect }: SlideThumbnailProps) {
  const displayedSlide = slide || createNewSlide();

  return (
    <div className="slidethumbnail">
      <span className="slideindex">{index}</span>
      <SlideView slide={displayedSlide} />
    </div>
  );
}
