import React, { useRef } from 'react';
import { ElementType, Slide } from '../../../model/types';
import styles from './EditableSlideView.module.css';
import { getSlideBackgroundStyle } from '../../../common/componentsUtils';
import { SLIDE_HEIGHT, SLIDE_WIDTH } from '../../../model/constants';
import { UUID } from '../../../model/uuid';
import { RootState } from '../../../state/reducers';
import { createNewSlide, isCurrentSlide } from '../../../model/model_utils';
import { connect, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../state';
import useHotkey from '../../../hooks/hotkeys/useHotkey';
import EditableImageElement from './Elements/EditableImageElement/EditableImageElement';
import EditableTextElement from './Elements/EditableTextElement/EditableTextElement';
import EditablePrimitiveElement from './Elements/EditablePrimitiveElement/EditablePrimitiveElement';

type EditableSlideViewProps = {
  slide: Slide;
  selectedElementIDs: UUID[];
}

function EditableSlideView({ slide, selectedElementIDs }: EditableSlideViewProps): JSX.Element {
  const slideBackgroundStyle = getSlideBackgroundStyle(slide);

  const dispatch = useDispatch();
  const { removeElements } = bindActionCreators(actionCreators, dispatch);

  const ref = useRef(null);
  useHotkey('Delete', () => {
    removeElements();
  }, ref);

  return (
    <svg
      viewBox={`0 0 ${SLIDE_WIDTH} ${SLIDE_HEIGHT}`}
      className={styles.editableslideview}
      style={slideBackgroundStyle}
      ref={ref}
      tabIndex={0}
    >
      {slide.elements.map(element => {
        const isSelected = selectedElementIDs.includes(element.id);

        switch (element.type) {
        case ElementType.IMAGE:
          return <EditableImageElement
            key={element.id}
            element={element}
            isSelected={isSelected}
          />;
        case ElementType.TEXT:
          return <EditableTextElement
            key={element.id}
            element={element}
            isSelected={isSelected}
          />;
        case ElementType.PRIMITIVE:
          return <EditablePrimitiveElement
            key={element.id}
            element={element}
            isSelected={isSelected}
          />;
        }
      })}
    </svg>
  );
}

function mapStateToProps(state: RootState): EditableSlideViewProps {
  return {
    slide: state.presentation.slides.find(slide => isCurrentSlide(slide, state.selectedSlideIDs)) || createNewSlide(),
    selectedElementIDs: state.selectedElementIDs,
  };
}

export default connect(mapStateToProps)(EditableSlideView);
