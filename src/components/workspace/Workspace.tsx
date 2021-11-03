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
    {
      id: 'element2',
      type: ElementType.IMAGE,
      position: {
        x: 400,
        y: 100,
      },
      dimensions: {
        width: 100,
        height: 100,
      },
      src: 'https://sun9-52.userapi.com/impg/hfp3GegAiTarASchXrdeEHs2mZxuWzSRlZYKwQ/KGBV_Z07zM8.jpg?size=737x647&quality=95&sign=6fed5591ff3f39e8304ea05d3e4cf8d4&type=album',
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
