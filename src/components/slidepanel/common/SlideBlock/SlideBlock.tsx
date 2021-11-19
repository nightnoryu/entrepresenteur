import React, {JSXElementConstructor} from 'react';
import './SlideBlock.css';
import {SlideThumbnail} from '../SlideThumbnail/SlideThumbnail';
import {selectSlide} from '../../../../model/actions';

type SlideBlockProps = {
  index?: number;
  selected?: boolean;
  onSelect?: () => void;
}

export function SlideBlock({index, selected, onSelect}: SlideBlockProps) {
  return(
      <div className='slideblock'
      onClick={(event) =>{
        onSelect && onSelect();
      }}>
        <SlideThumbnail  />
      </div>
  );
}
