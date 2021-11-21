import React from 'react';
import styles from './Workspace.module.css';
import { Slide } from '../../model/types';
import SlideView from '../common/slideview/SlideView';
import { UUID } from '../../model/uuid';
import { createNewSlide } from '../../model/infrastructure_actions';

type WorkspaceProps = {
  slide?: Slide;
  selectedElementIDs: UUID[];
}

function Workspace({ slide, selectedElementIDs }: WorkspaceProps): JSX.Element {
  const displayedSlide = slide || createNewSlide();

  return (
    <div className={styles.workspace}>
      <div className={styles.wrapper}>
        <SlideView slide={displayedSlide} />
      </div>
    </div>
  );
}

export default Workspace;
