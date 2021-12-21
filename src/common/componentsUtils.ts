import { BackgroundType, Dimensions, Position, PrimitiveElement, Slide, SlideElement } from '../model/types';

export function getSlideBackgroundStyle(slide: Slide) {
  return slide.background.type == BackgroundType.SOLID
    ? {
      backgroundColor: slide.background.color,
    }
    : {
      backgroundImage: `url(${slide.background.src})`,
    };
}

export function calculateEllipseProperties(element: PrimitiveElement) {
  return {
    cx: element.position.x + element.dimensions.width / 2,
    cy: element.position.y + element.dimensions.height / 2,
    rx: element.dimensions.width / 2 - 1,
    ry: element.dimensions.height / 2 - 1,
  };
}

export function getTrianglePoints(element: PrimitiveElement): string {
  const firstPoint = `${element.position.x},${element.position.y + element.dimensions.height}`;
  const secondPoint = `${element.position.x + element.dimensions.width / 2},${element.position.y}`;
  const thirdPoint = `${element.position.x + element.dimensions.width},${element.position.y + element.dimensions.height}`;
  return `${firstPoint} ${secondPoint} ${thirdPoint}`;
}

export function getSelectedSVGElementProperties(element: SlideElement, isSelected: boolean) {
  return isSelected ? {
    fill: '#2a8ec8',
    stroke: '#1563c8',
    fillOpacity: '0.3',
    strokeOpacity: '0.3',
  } : {
    fillOpacity: '0',
    strokeOpacity: '0',
  };
}

export function getResizeAnchorProperties(element: SlideElement) {
  return {
    x: element.position.x + element.dimensions.width - 5,
    y: element.position.y + element.dimensions.height - 5,
    width: 10,
    height: 10,
  };
}

export function getResizeAnchorTranslateDelta(
  element: SlideElement,
  delta: Position,
  dimensions: Dimensions,
): Position {
  return delta.x === 0 && delta.y === 0
    ? {
      x: dimensions.width - element.dimensions.width,
      y: dimensions.height - element.dimensions.height,
    }
    : delta;
}
