import React from 'react';
import './Workspace.css';
import { Slide } from '../../model/types';
import SlideView from '../common/slideview/SlideView';
import { UUID } from '../../model/uuid';

type WorkspaceProps = {
  slide?: Slide;
  selectedElementIDs: UUID[];
}

function Workspace({ slide, selectedElementIDs }: WorkspaceProps): JSX.Element {
  const displayedSlide = slide || createNewSlide();

  return (
    <div className="workspace">
      <div className="workspace__slideview-wrapper">
        <SlideView slide={displayedSlide} />
      </div>
    </div>
  );
}

export default Workspace;
