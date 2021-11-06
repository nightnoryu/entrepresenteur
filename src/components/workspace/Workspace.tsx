import React from 'react';
import './Workspace.css';
import { BackgroundType, ElementType, PrimitiveType, Slide } from '../../model/types';
import SlideView from '../common/slideview/SlideView';

const initialSlide: Slide = {
  id: 'slide1',
  dimensions: {
    width: 800,
    height: 600,
  },
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
    {
      id: 'element3',
      type: ElementType.PRIMITIVE,
      position: {
        x: 500,
        y: 400,
      },
      dimensions: {
        width: 100,
        height: 100,
      },
      primitiveType: PrimitiveType.RECTANGLE,
      fill: '#ff0000',
      stroke: '#000000',
    },
    {
      id: 'element4',
      type: ElementType.PRIMITIVE,
      position: {
        x: 100,
        y: 100,
      },
      dimensions: {
        width: 100,
        height: 100,
      },
      primitiveType: PrimitiveType.TRIANGLE,
      fill: '#ff0000',
      stroke: '#000000',
    },
    {
      id: 'element5',
      type: ElementType.PRIMITIVE,
      position: {
        x: 100,
        y: 400,
      },
      dimensions: {
        width: 100,
        height: 100,
      },
      primitiveType: PrimitiveType.ELLIPSE,
      fill: '#ff0000',
      stroke: '#000000',
    },
  ],
};

function Workspace(): JSX.Element {
  return (
    <div className="workspace">
      <div className="workspace__slideview-wrapper">
        <SlideView slide={initialSlide} />
      </div>
    </div>
  );
}

export default Workspace;
