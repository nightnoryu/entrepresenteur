import React from 'react';
import styles from './Workspace.module.css';
import EditableSlideViewWrapper from './EditableSlideViewWrapper/EditableSlideViewWrapper';


function Workspace(): JSX.Element {
  return (
    <div className={styles.workspace}>
      <EditableSlideViewWrapper />
    </div>
  );
}

export default Workspace;
