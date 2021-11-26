import React from 'react';
import styles from './Workspace.module.css';
import { Slide } from '../../model/types';
import { UUID } from '../../model/uuid';
import { createNewSlide } from '../../model/model_utils';
import EditableSlideView from './editableslideview/EditableSlideView';

type WorkspaceProps = {
  slide?: Slide;
  selectedElementIDs: UUID[];
}

function Workspace({ slide, selectedElementIDs }: WorkspaceProps): JSX.Element {
  const displayedSlide = slide || createNewSlide();

  return (
    <div className={styles.workspace}>
      <EditableSlideView slide={displayedSlide} selectedElementIDs={selectedElementIDs} />
    </div>
  );
}

export default Workspace;
