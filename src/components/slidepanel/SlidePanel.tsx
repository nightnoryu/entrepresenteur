import React from 'react';
import './SlidePanel.css';
import { UUID } from '../../model/uuid';
import SlideView from '../common/slideview/SlideView';
import { Slide } from '../../model/types';

type SlidePanelProps = {
  slides: Slide[];
  selectedSlideIDs: UUID[];
}

function SlidePanel({ slides, selectedSlideIDs }: SlidePanelProps): JSX.Element {
  return (
    <div className="slidepanel">
      <div className="slidepanel__slide">
        <div className="slidepanel__slide-thumbnail">
        </div>
      </div>
    </div>);
}

export default SlidePanel;
