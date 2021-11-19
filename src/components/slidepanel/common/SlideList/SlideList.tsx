import React from 'react';
import {Slide} from '../../../../model/types';
import {SlideBlock} from '../SlideBlock/SlideBlock';
import './SlideList.css';
import {SlideThumbnail} from '../SlideThumbnail/SlideThumbnail';
import {UUID} from '../../../../model/uuid';

type SlideListProps = {
  slides?: Slide[];
  selectedSlides?: UUID[];
}

export function SlideList({slides, selectedSlides}: SlideListProps) {
  const slidelist = slides?.map((slide, index) => (
    <SlideThumbnail
      key={slide.id}
      index={index + 1}
      background={slide.background}
      selected={selectedSlides?.includes(slide.id)}
    />));
  return (
    <div>{slidelist}</div>
  );
}