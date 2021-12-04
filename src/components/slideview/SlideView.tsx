import React from 'react';
import { ElementType, Slide } from '../../model/types';
import TextElementView from './elements/TextElementView/TextElementView';
import ImageElementView from './elements/ImageElementView/ImageElementView';
import PrimitiveElementView from './elements/PrimitiveElementView/PrimitiveElementView';
import styles from './SlideView.module.css';
import { getSlideBackgroundStyle } from '../../common/componentsUtils';
import { SLIDE_HEIGHT, SLIDE_WIDTH } from '../../model/constants';

type SlideViewProps = {
  slide: Slide;
}

function SlideView({ slide }: SlideViewProps): JSX.Element {
  const slideBackgroundStyle = getSlideBackgroundStyle(slide);

  return (
    <svg
      viewBox={`0 0 ${SLIDE_WIDTH} ${SLIDE_HEIGHT}`}
      className={styles.slideview}
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

export default SlideView;
