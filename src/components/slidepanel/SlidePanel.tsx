import React from 'react';
import './SlidePanel.css';
import {UUID} from '../../model/uuid';
import {Slide} from '../../model/types';
import {SlideBlock} from './common/SlideBlock/SlideBlock';

type SlidePanelProps = {
  slides: Slide[];
  selectedSlideIDs: UUID[];
}

function SlidePanel({slides, selectedSlideIDs}: SlidePanelProps): JSX.Element {
  return (
      <div className="slidepanel">
          <SlideBlock  />
      </div>);
}

export default SlidePanel;
