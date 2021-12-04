import React from 'react';
import styles from './EditableSlideViewWrapper.module.css';
import { Slide } from '../../../model/types';
import { UUID } from '../../../model/uuid';
import EditableSlideView from '../EditableSlideView/EditableSlideView';

type EditableSlideViewProps = {
  slide: Slide;
  selectedElementIDs: UUID[];
}

function EditableSlideViewWrapper({ slide, selectedElementIDs }: EditableSlideViewProps): JSX.Element {
  return (
    <div className={styles.editable}>
      <EditableSlideView slide={slide} selectedElementIDs={selectedElementIDs} />
    </div>
  );
}

export default EditableSlideViewWrapper;
