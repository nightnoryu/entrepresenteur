import React, { useContext } from 'react';
import styles from './Workspace.module.css';
import EditableSlideViewWrapper from './EditableSlideViewWrapper/EditableSlideViewWrapper';
import ThemeContext from '../../context/ThemeContext';


function Workspace(): JSX.Element {
  const colorScheme = useContext(ThemeContext);

  return (
    <div
      className={styles.workspace}
      style={{
        backgroundColor: colorScheme.backgroundColor,
      }}
    >
      <EditableSlideViewWrapper />
    </div>
  );
}

export default Workspace;
