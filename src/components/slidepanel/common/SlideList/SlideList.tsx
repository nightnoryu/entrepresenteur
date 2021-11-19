import React from 'react';
import { Slide } from '../../../../model/types';
import './SlideList.css';
import { SlideThumbnail } from '../SlideThumbnail/SlideThumbnail';
import { UUID } from '../../../../model/uuid';

type SlideListProps = {
  slides?: Slide[];
  selectedSlides?: UUID[];
}

function SlideList({ slides, selectedSlides }: SlideListProps) {
  const slidelist = slides?.map((slide, index) => (
    <SlideThumbnail
      key={slide.id}
      slide={slide}
      index={index + 1}
      selected={selectedSlides?.includes(slide.id)}
    />));
  return (
    <div>{slidelist}</div>
  );
}

export default SlideList;
