import {
  BackgroundType,
  Dimensions,
  Position,
  PrimitiveElement,
  PrimitiveStrokeStyle,
  Slide,
  SlideElement,
} from '../model/types';
import { STROKE_STYLE_DASHED, STROKE_STYLE_DOT_DASHED, STROKE_STYLE_SOLID } from '../model/constants';

type SlideBackgroundStyle = {
  backgroundColor: string;
} | {
  backgroundImage: string;
};

export function getSlideBackgroundStyle(slide: Slide): SlideBackgroundStyle {
  return slide.background.type == BackgroundType.SOLID
    ? {
      backgroundColor: slide.background.color,
    }
    : {
      backgroundImage: `url(${slide.background.src})`,
    };
}

type EllipseProperties = {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
};

export function calculateEllipseProperties(element: PrimitiveElement): EllipseProperties {
  return {
    cx: element.position.x + element.dimensions.width / 2,
    cy: element.position.y + element.dimensions.height / 2,
    rx: element.dimensions.width / 2 - 1,
    ry: element.dimensions.height / 2 - 1,
  };
}

export function getTrianglePointsAsPath(element: PrimitiveElement): string {
  const points = calculateTrianglePoints(element);

  return points
    .map(point => `${point.x},${point.y}`)
    .join(' ');
}

export function calculateTrianglePoints(element: PrimitiveElement): [Position, Position, Position] {
  const firstPoint = {
    x: element.position.x,
    y: element.position.y + element.dimensions.height,
  };
  const secondPoint = {
    x: element.position.x + element.dimensions.width / 2,
    y: element.position.y,
  };
  const thirdPoint = {
    x: element.position.x + element.dimensions.width,
    y: element.position.y + element.dimensions.height,
  };
  return [firstPoint, secondPoint, thirdPoint];
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

export function getPrimitiveStrokeStyle(style: PrimitiveStrokeStyle): string | undefined {
  switch (style) {
  case PrimitiveStrokeStyle.SOLID:
    return STROKE_STYLE_SOLID;
  case PrimitiveStrokeStyle.DASHED:
    return STROKE_STYLE_DASHED.join(',');
  case PrimitiveStrokeStyle.DOT_DASHED:
    return STROKE_STYLE_DOT_DASHED.join(',');
  }
}

type CommonPrimitiveProperties = {
  fill: string,
  stroke: string,
  strokeWidth: number,
  strokeDasharray: string | undefined,
}

export function getCommonPrimitiveProperties(element: PrimitiveElement): CommonPrimitiveProperties {
  return {
    fill: element.fill,
    stroke: element.stroke.color,
    strokeWidth: element.stroke.width,
    strokeDasharray: getPrimitiveStrokeStyle(element.stroke.style),
  };
}
