import { UUID } from './uuid';

export type Position = {
  x: number;
  y: number;
};

export type Dimensions = {
  width: number;
  height: number;
};

export enum ElementType {
  TEXT,
  IMAGE,
  PRIMITIVE,
}

export enum PrimitiveType {
  RECTANGLE,
  ELLIPSE,
  TRIANGLE,
}

export enum TextFont {
  SERIF,
  SANS_SERIF,
  MONOSPACE,
}

export enum PrimitiveStrokeStyle {
  SOLID,
  DASHED,
  DOT_DASHED,
}

export type SlideElement = TextElement | ImageElement | PrimitiveElement;

export type GenericSlideElement = {
  id: UUID;
  type: ElementType;
  position: Position;
  dimensions: Dimensions;
};

export type TextElement = GenericSlideElement & {
  type: ElementType.TEXT;
  value: string;
  size: number;
  font: TextFont;
  isBold: boolean;
  isItalic: boolean;
  color: string;
};

export type ImageElement = GenericSlideElement & {
  type: ElementType.IMAGE;
  src: string;
};

export type PrimitiveElement = GenericSlideElement & {
  type: ElementType.PRIMITIVE;
  primitiveType: PrimitiveType;
  fill: string;
  stroke: string;
  strokeStyle: PrimitiveStrokeStyle,
  strokeSize: number;
};

export enum BackgroundType {
  SOLID,
  IMAGE,
}

export type Background = SolidBackground | ImageBackground;

export type SolidBackground = {
  type: BackgroundType.SOLID;
  color: string;
};

export type ImageBackground = {
  type: BackgroundType.IMAGE;
  src: string;
};

export type Slide = {
  id: UUID;
  background: Background;
  elements: SlideElement[];
};

export type Presentation = {
  title: string;
  slides: Slide[];
};

export type Selections = {
  selectedSlideIDs: UUID[];
  selectedElementIDs: UUID[];
};

export type HistoryState = {
  presentation: Presentation;
  selections: Selections;
};

export type History = {
  pastStates: HistoryState[];
  futureStates: HistoryState[];
};

export type Editor = {
  presentation: Presentation;
  selections: Selections;
  history: History;
  isDemonstrating: boolean;
};
