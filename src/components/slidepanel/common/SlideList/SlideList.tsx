import React from "react";
import {Slide} from "../../../../model/types";
import {SlideBlock} from '../SlideBlock/SlideBlock';
import './SlideList.css'
import {SlideThumbnail} from '../SlideThumbnail/SlideThumbnail';

type SlideListProps = {
  slides?: Slide[];
  selectedslides: number[]
}

export function SlideList({slides, selectedslides}: SlideListProps) {
  const slidelist = slides?.map((slide, index) => (
    <SlideThumbnail
      key={index}
      index={index + 1}
      background={slide.background}
      selected={selectedslides.some((id) => id === index)}
    />))
  return (
    <>{slidelist}</>
  )
}