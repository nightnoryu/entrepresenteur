import React from 'react';
import './SlidePanel.css';
import { UUID } from '../../model/uuid';
import SlideView from '../common/slideview/SlideView';
import { Slide } from '../../model/types';
import SlideBlock from './common/SlideBlock/SlideBlock';
import SlideThumbnail from './common/SlideThumbnail/SlideThumbnail';
import {ReactComponent as SlideSVG} from './images/dots_orange.svg';

type SlidePanelProps = {
  slides: Slide[];
  selectedSlideIDs: UUID[];
}

function SlidePanel({ slides, selectedSlideIDs }: SlidePanelProps): JSX.Element {
  return (
    <div className="slidepanel">
      <div className='slideblock'>
          {SlideBlock}
          <div className='slideicon'>
              <SlideSVG
              />
          </div>
        <div className='slidethumbnail'>
            {SlideThumbnail}
        </div>
      </div>
    </div>);
}

export default SlidePanel;
