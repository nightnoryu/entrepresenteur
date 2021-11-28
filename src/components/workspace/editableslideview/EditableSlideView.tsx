import React from 'react';
import styles from './EditableSlideView.module.css';
import SlideView from '../../slideview/SlideView';
import { Slide } from '../../../model/types';
import { UUID } from '../../../model/uuid';
import Overlay from './overlay/Overlay';

type EditableSlideViewProps = {
  slide: Slide;
  selectedElementIDs: UUID[];
}

function EditableSlideView({ slide, selectedElementIDs }: EditableSlideViewProps): JSX.Element {
  return (
    <div className={styles.editable}>
      <SlideView slide={slide} />
      <Overlay slide={slide} selectedElementIDs={selectedElementIDs} />
    </div>
  );
}

export default EditableSlideView;
