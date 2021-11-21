import React from 'react';
import styles from './EditableSlideView.module.css';
import SlideView from '../../slideview/SlideView';
import { Slide } from '../../../model/types';
import { UUID } from '../../../model/uuid';

type EditableSlideViewProps = {
  slide: Slide;
  selectedElementIDs: UUID[];
}

function EditableSlideView({ slide, selectedElementIDs }: EditableSlideViewProps): JSX.Element {
  // Something like overlay above SlideView to highlight selected elements and
  // register editing events
  return (
    <div className={styles.editable}>
      <SlideView slide={slide} />
    </div>
  );
}

export default EditableSlideView;
