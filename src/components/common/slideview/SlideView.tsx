import React, { useEffect } from 'react';
import { BackgroundType, Dimensions, ElementType, Slide, SlideElement } from '../../../model/types';
import TextElementView from '../elements/text/TextElementView';
import ImageElementView from '../elements/image/ImageElementView';
import PrimitiveElementView from '../elements/primitive/PrimitiveElementView';
import './SlideView.css';

type SlideViewProps = {
  slide: Slide;
  scaleFactor?: number;
}

function getScaledSlideDimensions(slide: Slide, scaleFactor?: number): Dimensions {
  if (scaleFactor === undefined) {
    return slide.dimensions;
  }

  return {
    width: slide.dimensions.width / scaleFactor,
    height: slide.dimensions.height / scaleFactor,
  };
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

function SlideView({ slide, scaleFactor }: SlideViewProps): JSX.Element {
  const scaledDimensions = getScaledSlideDimensions(slide, scaleFactor);
  let slideStyle = slide.background.type == BackgroundType.SOLID
    ? {
      backgroundColor: slide.background.color,
      ...scaledDimensions,
    }
    : {
      background: `url(${slide.background.src})`,
      ...scaledDimensions,
    };

  useEffect(() => {
    const scaledDimensions = getScaledSlideDimensions(slide, scaleFactor);
    slideStyle = {
      ...slideStyle,
      ...scaledDimensions,
    };
  }, [scaleFactor]);

  return (
    <div className="slideview" style={slideStyle}>
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
