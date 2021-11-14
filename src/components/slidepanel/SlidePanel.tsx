import React from 'react';
import './SlidePanel.css';
import { UUID } from '../../model/uuid';
import { Slide } from '../../model/types';

type SlidePanelProps = {
  slides: Slide[];
  selectedSlideIDs: UUID[];
}

function SlidePanel({ slides, selectedSlideIDs }: SlidePanelProps): JSX.Element {
  return (
    <div className="slidepanel">
      SlidePanel
      <div className="slidepanel__slide">
        Slide block
        <div className="slidepanel__slide-thumbnail">
          thumbnail
        </div>
      </div>
    </div>);
}

export default SlidePanel;
