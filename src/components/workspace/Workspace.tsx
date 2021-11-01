import React from 'react';
import './Workspace.css';
import { Slide } from '../../model/types';
import { UUID } from '../../model/uuid';

type WorkspaceProps = {
  slide?: Slide;
  selectedElementIDs: UUID[];
}

function Workspace({ slide, selectedElementIDs }: WorkspaceProps): JSX.Element {
  return (
    <div className="workspace">
      {slide?.id}
    </div>
  );
}

export default Workspace;
