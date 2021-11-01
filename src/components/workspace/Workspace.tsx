import React from 'react';
import './Workspace.css';
import { Slide } from '../../model/types';
import { UUID } from '../../model/uuid';
import { dispatch } from '../../state/editor';
import { addSlide } from '../../model/actions';

type WorkspaceProps = {
  slide?: Slide;
  selectedElementIDs: UUID[];
}

function Workspace({ slide, selectedElementIDs }: WorkspaceProps): JSX.Element {
  return (
    <div className="workspace" onClick={() => dispatch(addSlide)}>
      {slide?.id}
    </div>
  );
}

export default Workspace;
