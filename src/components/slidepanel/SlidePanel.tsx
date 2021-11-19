import React from 'react';
import './SlidePanel.css';
import { UUID } from '../../model/uuid';
import { Slide } from '../../model/types';
import SlideList from './common/SlideList/SlideList';

type SlidePanelProps = {
  slides: Slide[];
  selectedSlideIDs: UUID[];
}

function SlidePanel({ slides, selectedSlideIDs }: SlidePanelProps): JSX.Element {
  return (
    <div className="slidepanel">
      <SlideList slides={slides} selectedSlides={selectedSlideIDs} />
    </div>);
}

export default SlidePanel;
