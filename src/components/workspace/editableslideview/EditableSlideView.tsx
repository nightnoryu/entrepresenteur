import React from 'react';
import { ElementType, Slide } from '../../../model/types';
import styles from './EditableSlideView.module.css';
import { getSlideBackgroundStyle } from '../../../common/componentsUtils';
import TextElementView from '../../SlidePanel/SlideView/Elements/TextElementView/TextElementView';
import ImageElementView from '../../SlidePanel/SlideView/Elements/ImageElementView/ImageElementView';
import PrimitiveElementView from '../../SlidePanel/SlideView/Elements/PrimitiveElementView/PrimitiveElementView';
import { SLIDE_HEIGHT, SLIDE_WIDTH } from '../../../model/constants';
import { UUID } from '../../../model/uuid';
import { RootState } from '../../../state/reducers';
import { createNewSlide, isCurrentSlide } from '../../../model/model_utils';
import { connect } from 'react-redux';
import EditableElement from './EditableElement';

type EditableSlideViewProps = {
  slide: Slide;
  selectedElementIDs: UUID[];
}

function EditableSlideView({ slide, selectedElementIDs }: EditableSlideViewProps): JSX.Element {
  const slideBackgroundStyle = getSlideBackgroundStyle(slide);

  return (
    <svg
      viewBox={`0 0 ${SLIDE_WIDTH} ${SLIDE_HEIGHT}`}
      className={styles.editableslideview}
      style={slideBackgroundStyle}
    >
      {slide.elements.map(element => {
        switch (element.type) {
        case ElementType.TEXT:
          return <TextElementView key={element.id} element={element} />;
        case ElementType.IMAGE:
          return <ImageElementView key={element.id} element={element} />;
        case ElementType.PRIMITIVE:
          return <PrimitiveElementView key={element.id} element={element} />;
        }
      })}
      {slide.elements.map(element => {
        return <EditableElement
          key={element.id}
          element={element}
          isSelected={selectedElementIDs.includes(element.id)}
        />;
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
