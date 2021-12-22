import React, { useEffect, useRef } from 'react';
import styles from './EditableSlideViewWrapper.module.css';
import EditableSlideView from '../EditableSlideView/EditableSlideView';
import { RootState } from '../../../state/reducers';
import { connect, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../state';

type EditableSlideViewWrapperProps = {
  isDemonstrating: boolean;
};

function EditableSlideViewWrapper({ isDemonstrating }: EditableSlideViewWrapperProps): JSX.Element {
  const dispatch = useDispatch();
  const { stopDemonstration } = bindActionCreators(actionCreators, dispatch);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const view = ref.current;

    if (view) {
      if (isDemonstrating) {
        if (!document.fullscreenElement) {
          view.requestFullscreen().catch(error => alert(error.message));
        }
      }
    }

    const onFullscreenChange = () => {
      if (!document.fullscreenElement) {
        stopDemonstration();
      }
    };

    document.addEventListener('fullscreenchange', onFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange);
    };
  }, [isDemonstrating]);


  return (
    <div className={styles.wrapper} ref={ref}>
      <EditableSlideView />
    </div>
  );
}

function mapStateToProps(state: RootState): EditableSlideViewWrapperProps {
  return {
    isDemonstrating: state.isDemonstrating,
  };
}

export default connect(mapStateToProps)(EditableSlideViewWrapper);
