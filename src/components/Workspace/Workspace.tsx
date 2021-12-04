import React from 'react';
import styles from './Workspace.module.css';
import { Slide } from '../../model/types';
import { UUID } from '../../model/uuid';
import { createNewSlide, isCurrentSlide } from '../../model/model_utils';
import EditableSlideViewWrapper from './EditableSlideViewWrapper/EditableSlideViewWrapper';
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
      <EditableSlideViewWrapper slide={displayedSlide} selectedElementIDs={selectedElementIDs} />
    </div>
  );
}

function mapStateToProps(state: RootState): WorkspaceProps {
  return {
    slide: state.presentation.slides.find(slide => isCurrentSlide(slide, state.selectedSlideIDs)),
    selectedElementIDs: state.selectedElementIDs,
  };
}

export default connect(mapStateToProps)(Workspace);
