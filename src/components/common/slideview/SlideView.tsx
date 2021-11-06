import React, { useRef } from 'react';
import { BackgroundType, Dimensions, ElementType, Slide, SlideElement } from '../../../model/types';
import TextElementView from '../elements/text/TextElementView';
import ImageElementView from '../elements/image/ImageElementView';
import PrimitiveElementView from '../elements/primitive/PrimitiveElementView';
import './SlideView.css';
import useElementDimensions from '../../../hooks/useElementDimensions';

type SlideViewProps = {
  slide: Slide;
}

function SlideView({ slide }: SlideViewProps): JSX.Element {
  const slideBackgroundStyle = getSlideBackgroundStyle(slide);

  const ref = useRef(null);
  const dimensions = useElementDimensions(ref);

  return (
    <div
      className="slideview"
      style={slideBackgroundStyle}
      ref={ref}
    >
      {slide.elements.map(element => {
        const scaleFactor = calculateScaleFactor(dimensions);
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

function getSlideBackgroundStyle(slide: Slide) {
  return slide.background.type == BackgroundType.SOLID
    ? {
      backgroundColor: slide.background.color,
    }
    : {
      background: `url(${slide.background.src})`,
    };
}

function calculateScaleFactor(dimensions: Dimensions): number {
  return 800 / dimensions.width;
}

function scaleElement(element: SlideElement, scaleFactor?: number): SlideElement {
  return scaleFactor === undefined
    ? element
    : {
      ...element,
      dimensions: {
        width: element.dimensions.width / scaleFactor,
        height: element.dimensions.height / scaleFactor,
      },
      position: {
        x: element.position.x / scaleFactor,
        y: element.position.y / scaleFactor,
      },
    };
}

export default SlideView;
