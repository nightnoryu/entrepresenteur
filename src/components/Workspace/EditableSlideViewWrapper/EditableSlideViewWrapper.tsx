import React from 'react';
import styles from './EditableSlideViewWrapper.module.css';
import EditableSlideView from '../EditableSlideView/EditableSlideView';

function EditableSlideViewWrapper(): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <EditableSlideView />
    </div>
  );
}

export default EditableSlideViewWrapper;
