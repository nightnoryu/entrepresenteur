import React from 'react';
import { ElementType, Slide } from '../../../../model/types';
import { UUID } from '../../../../model/uuid';
import styles from './Overlay.module.css';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../../state';
import useHotkey from '../../../../hooks/hotkeys/useHotkey';
import EditableElement from './EditableElement';
import { SLIDE_HEIGHT, SLIDE_WIDTH } from '../../../../model/constants';

type OverlayProps = {
  slide: Slide;
  selectedElementIDs: UUID[];
};

function Overlay({ slide, selectedElementIDs }: OverlayProps): JSX.Element {
  const dispatch = useDispatch();
  const { removeElements, setTextValue } = bindActionCreators(actionCreators, dispatch);

  useHotkey('Delete', () => {
    removeElements();
  });

  return (
    <svg
      viewBox={`0 0 ${SLIDE_WIDTH} ${SLIDE_HEIGHT}`}
      className={styles.overlay}
    >
      {slide.elements.map(element => {
        const isSelected = selectedElementIDs.includes(element.id);

        if (element.type === ElementType.TEXT) {
          return (
            <EditableElement
              key={element.id}
              element={element}
              isSelected={isSelected}
              onDoubleClick={() => {
                const newText = prompt('Enter new text');

                if (!newText) {
                  removeElements();
                  return;
                }

                setTextValue(element.id, newText);
              }}
            />
          );
        }

        return (
          <EditableElement
            key={element.id}
            element={element}
            isSelected={isSelected}
          />
        );
      })}
    </svg>
  );
}

export default Overlay;
