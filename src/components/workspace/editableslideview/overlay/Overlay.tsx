import React from 'react';
import { Slide } from '../../../../model/types';
import { UUID } from '../../../../model/uuid';
import styles from './Overlay.module.css';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../../state';
import useHotkey from '../../../../hooks/useHotkey';
import EditableElement from './EditableElement';

type OverlayProps = {
  slide: Slide;
  selectedSlideIDs: UUID[];
};

function Overlay({ slide, selectedSlideIDs }: OverlayProps): JSX.Element {
  const dispatch = useDispatch();
  const { removeElements } = bindActionCreators(actionCreators, dispatch);

  useHotkey('Delete', () => {
    removeElements();
  }, false);

  return (
    <svg
      viewBox="0 0 800 600"
      className={styles.overlay}
    >
      {slide.elements.map(element =>
        <EditableElement
          key={element.id}
          element={element}
          isSelected={selectedSlideIDs.includes(element.id)}
        />,
      )}
    </svg>
  );
}

export default Overlay;
