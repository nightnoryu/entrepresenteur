import React, { useRef } from 'react';
import { ElementType, Slide } from '../../../model/types';
import TextElementView from '../elements/text/TextElementView';
import ImageElementView from '../elements/image/ImageElementView';
import PrimitiveElementView from '../elements/primitive/PrimitiveElementView';
import './SlideView.css';
import useElementDimensions from '../../../hooks/useElementDimensions';
import { calculateScaleFactor, getSlideBackgroundStyle, scaleElement } from '../../../common/componentsFunctions';

type SlideViewProps = {
  slide: Slide;
}

function SlideView({ slide }: SlideViewProps): JSX.Element {
  const slideBackgroundStyle = getSlideBackgroundStyle(slide);

  const ref = useRef(null);
  const dimensions = useElementDimensions(ref);
  const scaleFactor = calculateScaleFactor(dimensions);

  return (
    <div
      className="slideview"
      style={slideBackgroundStyle}
      ref={ref}
    >
      {slide.elements.map(element => {
        const scaledElement = scaleElement(element, scaleFactor);
        switch (scaledElement.type) {
        case ElementType.TEXT:
          return <TextElementView key={element.id} element={scaledElement} />;
        case ElementType.IMAGE:
          return <ImageElementView key={element.id} element={scaledElement} />;
        case ElementType.PRIMITIVE:
          return <PrimitiveElementView key={element.id} element={scaledElement} />;
        }
      })}
    </div>
  );
}

export default SlideView;
