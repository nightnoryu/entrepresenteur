import React from 'react';
import { Slide } from '../../model/types';
import './SlidePanel.css';
import { UUID } from '../../model/uuid';

type SlidePanelProps = {
  slides: Slide[];
  selectedSlideIDs: UUID[];
}

function SlidePanel({ slides, selectedSlideIDs }: SlidePanelProps): JSX.Element {
  return (
    <div className="slidepanel">
      <ul>
        {slides.map(slide => selectedSlideIDs.includes(slide.id)
          ? <li key={slide.id}><b>{slide.id}</b></li>
          : <li key={slide.id}>{slide.id}</li>)}
      </ul>
    </div>
  );
}

export default SlidePanel;
