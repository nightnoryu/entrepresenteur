/* eslint-disable react/jsx-key */
import { BackgroundType, Dimensions, PrimitiveElement, PrimitiveType, Slide, SlideElement } from '../model/types';
import cond from './cond';
import RectanglePrimitive from '../components/common/elements/primitive/RectanglePrimitive';
import React from 'react';
import TrianglePrimitive from '../components/common/elements/primitive/TrianglePrimitive';
import EllipsePrimitive from '../components/common/elements/primitive/EllipsePrimitive';

export function getSlideBackgroundStyle(slide: Slide) {
  return slide.background.type == BackgroundType.SOLID
    ? {
      backgroundColor: slide.background.color,
    }
    : {
      background: `url(${slide.background.src})`,
    };
}

export function calculateScaleFactor(dimensions: Dimensions): number {
  return 800 / dimensions.width;
}

export function scaleElement(element: SlideElement, scaleFactor?: number): SlideElement {
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

export function selectPrimitive(element: PrimitiveElement) {
  return cond([
    [PrimitiveType.RECTANGLE, <RectanglePrimitive element={element} />],
    [PrimitiveType.TRIANGLE, <TrianglePrimitive element={element} />],
    [PrimitiveType.ELLIPSE, <EllipsePrimitive element={element} />],
  ])(element.primitiveType);
}

export function calculateEllipseProperties(element: PrimitiveElement) {
  return {
    cx: element.dimensions.width / 2,
    cy: element.dimensions.height / 2,
    rx: element.dimensions.width / 2 - 1,
    ry: element.dimensions.height / 2 - 1,
  };
}

export function getTrianglePoints(element: PrimitiveElement): string {
  const firstPoint = `0,${element.dimensions.height}`;
  const secondPoint = `${element.dimensions.width / 2},0`;
  const thirdPoint = `${element.dimensions.width},${element.dimensions.height}`;
  return `${firstPoint} ${secondPoint} ${thirdPoint}`;
}
