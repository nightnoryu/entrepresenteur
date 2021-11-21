import { BackgroundType, PrimitiveElement, Slide } from '../model/types';

export function getSlideBackgroundStyle(slide: Slide) {
  return slide.background.type == BackgroundType.SOLID
    ? {
      backgroundColor: slide.background.color,
    }
    : {
      background: `url(${slide.background.src})`,
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
