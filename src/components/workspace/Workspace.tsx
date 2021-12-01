import React from 'react';
import styles from './Workspace.module.css';
import { Slide } from '../../model/types';
import { UUID } from '../../model/uuid';
import { createNewSlide, isCurrentSlide } from '../../model/model_utils';
import EditableSlideView from './editableslideview/EditableSlideView';
import { RootState } from '../../state/reducers';
import { connect } from 'react-redux';

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

function mapStateToProps(state: RootState) {
  return {
    slide: state.editor.presentation.slides.find(slide => isCurrentSlide(slide, state.editor.selectedSlideIDs)),
    selectedElementIDs: state.editor.selectedElementIDs,
  };
}

export default connect(mapStateToProps)(Workspace);
