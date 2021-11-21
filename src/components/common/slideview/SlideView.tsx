import React from 'react';
import { ElementType, Slide } from '../../../model/types';
import TextElementView from '../elements/text/TextElementView';
import ImageElementView from '../elements/image/ImageElementView';
import PrimitiveElementView from '../elements/primitive/PrimitiveElementView';
import styles from './SlideView.module.css';
import { getSlideBackgroundStyle } from '../../../common/componentsFunctions';

type SlideViewProps = {
  slide: Slide;
}

function SlideView({ slide }: SlideViewProps): JSX.Element {
  const slideBackgroundStyle = getSlideBackgroundStyle(slide);

  return (
    <svg
      viewBox="0 0 800 600"
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
