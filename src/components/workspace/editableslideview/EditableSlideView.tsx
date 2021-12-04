import React from 'react';
import { ElementType, Slide } from '../../../model/types';
import styles from './EditableSlideView.module.css';
import { getSlideBackgroundStyle } from '../../../common/componentsUtils';
import TextElementView from '../../SlidePanel/SlideView/Elements/TextElementView/TextElementView';
import ImageElementView from '../../SlidePanel/SlideView/Elements/ImageElementView/ImageElementView';
import PrimitiveElementView from '../../SlidePanel/SlideView/Elements/PrimitiveElementView/PrimitiveElementView';
import { SLIDE_HEIGHT, SLIDE_WIDTH } from '../../../model/constants';
import { UUID } from '../../../model/uuid';

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
    </svg>
  );
}

export default EditableSlideView;
