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
  font: string;
  color: string;
};

export type ImageElement = GenericSlideElement & {
  type: ElementType.IMAGE;
  src: string;
};

export enum PrimitiveType {
  RECTANGLE,
  ELLIPSE,
  TRIANGLE,
}

export type PrimitiveElement = GenericSlideElement & {
  type: ElementType.PRIMITIVE;
  primitiveType: PrimitiveType;
  fill: string;
  stroke: string;
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

export type ActionFunction = (editor: Editor, ...args: never[]) => Editor;

export type History = {
  undoStack: Presentation[];
  currentState: number;
};

export type Editor = {
  presentation: Presentation;
  selectedSlideIDs: UUID[];
  selectedElementIDs: UUID[];
  history: History;
};
