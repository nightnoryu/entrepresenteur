import React from 'react';
import '../../../common/slideview/SlideView';
import {Background, Slide, SlideElement} from '../../../../model/types';
import './SlideThumbnail.css';
import SlideView from '../../../common/slideview/SlideView';
import {UUID} from '../../../../model/uuid';

type SlideThumbnailProps = {
  slide?: Slide;
  elements?: SlideElement[];
  background?: Background;
  index?: number;
  selected?: boolean;
  onSelect?: () => void;
};

export function SlideThumbnail({slide, elements, background, index, selected, onSelect }: SlideThumbnailProps) {
  // const displayedSlide = slide || createNewSlide();

  return (
      <div className='slidethumbnail'>
        <span className='slideindex'>{index}</span>
        {/*<SlideView slide={displayedSlide} />*/}
      </div>
  );
}

