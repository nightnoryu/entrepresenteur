import { UUID } from './uuid';

type Position = {
  x: number;
  y: number;
};

type Dimensions = {
  width: number;
  height: number;
};

enum ElementType {
  TEXT,
  IMAGE,
  PRIMITIVE,
}

type SlideElement = TextElement | ImageElement | PrimitiveElement;

type GenericSlideElement = {
  id: UUID;
  type: ElementType;
  position: Position;
  dimensions: Dimensions;
};

type TextElement = GenericSlideElement & {
  type: ElementType.TEXT;
  value: string;
  size: number;
  font: string;
  color: string;
};

type ImageElement = GenericSlideElement & {
  type: ElementType.IMAGE;
  src: string;
};

enum PrimitiveType {
  RECTANGLE,
  ELLIPSE,
  TRIANGLE,
}

type PrimitiveElement = GenericSlideElement & {
  type: ElementType.PRIMITIVE;
  primitiveType: PrimitiveType;
  fill: string;
  stroke: string;
};

enum BackgroundType {
  SOLID,
  IMAGE,
}

type Background = SolidBackground | ImageBackground;

type SolidBackground = {
  type: BackgroundType.SOLID;
  color: string;
};

type ImageBackground = {
  type: BackgroundType.IMAGE;
  src: string;
};

type Slide = {
  id: UUID;
  background: Background;
  elements: SlideElement[];
};

type Presentation = {
  title: string;
  slides: Slide[];
};

type Editor = {
  presentation: Presentation;
  selectedSlideIDs: UUID[];
  selectedElementIDs: UUID[];
  // TODO: history
};

export type {
  Position,
  Dimensions,
  ElementType,
  SlideElement,
  TextElement,
  ImageElement,
  PrimitiveType,
  PrimitiveElement,
  BackgroundType,
  Background,
  SolidBackground,
  ImageBackground,
  Slide,
  Presentation,
  Editor,
};
