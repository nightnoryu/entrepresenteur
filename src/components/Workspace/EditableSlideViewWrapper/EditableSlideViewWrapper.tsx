import React, { useRef } from 'react';
import styles from './EditableSlideViewWrapper.module.css';
import EditableSlideView from '../EditableSlideView/EditableSlideView';
import { RootState } from '../../../state/reducers';
import { connect, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../state';
import useFullscreen from '../../../hooks/useFullscreen';

type EditableSlideViewWrapperProps = {
  isDemonstrating: boolean;
};

function EditableSlideViewWrapper({ isDemonstrating }: EditableSlideViewWrapperProps): JSX.Element {
  const dispatch = useDispatch();
  const { stopDemonstration, removeElements } = bindActionCreators(actionCreators, dispatch);

  const ref = useRef<HTMLDivElement>(null);
  useFullscreen(ref, isDemonstrating, stopDemonstration);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Delete') {
      event.preventDefault();
      removeElements();
    }
  };

  return (
    <div
      className={styles.wrapper}
      ref={ref}
      onKeyDown={onKeyDown}
    >
      <EditableSlideView />
      {
        isDemonstrating && <div className={styles.overlay} />
      }
    </div>
  );
}

function mapStateToProps(state: RootState): EditableSlideViewWrapperProps {
  return {
    isDemonstrating: state.isDemonstrating,
  };
}

export default connect(mapStateToProps)(EditableSlideViewWrapper);
