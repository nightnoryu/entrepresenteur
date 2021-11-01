import React from 'react';
import './Workspace.css';
import { BackgroundType, ElementType, Slide } from '../../model/types';
import TextElementView from './elements/TextElementView';
import ImageElementView from './elements/ImageElementView';
import PrimitiveElementView from './elements/PrimitiveElementView';

const initialSlide: Slide = {
  id: 'slide1',
  background: {
    type: BackgroundType.SOLID,
    color: '#ffffff',
  },
  elements: [
    {
      id: 'element1',
      type: ElementType.TEXT,
      position: {
        x: 200,
        y: 300,
      },
      dimensions: {
        width: 100,
        height: 100,
      },
      value: 'Sample',
      color: '#000000',
      font: 'Calibri',
      size: 14,
    },
  ],
};

function Workspace(): JSX.Element {
  const slideStyle = initialSlide.background.type == BackgroundType.SOLID
    ? {
      backgroundColor: initialSlide.background.color,
    }
    : {
      background: `url(${initialSlide.background.src})`,
    };

  return (
    <div className="workspace">
      <div className="workspace__current-slide" style={slideStyle}>
        {initialSlide.elements.map(element => {
          switch (element.type) {
          case ElementType.TEXT:
            return <TextElementView textElement={element} />;
          case ElementType.IMAGE:
            return <ImageElementView imageElement={element} />;
          case ElementType.PRIMITIVE:
            return <PrimitiveElementView primitiveElement={element} />;
          }
        })}
      </div>
    </div>
  );
}

export default Workspace;
