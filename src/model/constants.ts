import { Dimensions, Position, PrimitiveStrokeStyle, TextFont } from './types';

// Page
export const BASE_WINDOW_TITLE = 'Entrepresenteur';
export const WINDOW_TITLE_SEPARATOR = ' • ';

// Editor
export const PRESENTATION_EXTENSION = '.entrepresenteur.json';
export const MAX_HISTORY_ENTRIES = 50;

// Presentation

export const DEFAULT_PRESENTATION_NAME = 'New Presentation';

// Slides

export const SLIDE_WIDTH = 1920;
export const SLIDE_HEIGHT = 1080;

export const DEFAULT_SLIDE_BACKGROUND = '#ffffff';

// Elements

export const DEFAULT_ELEMENT_POSITION: Position = {
  x: 0,
  y: 0,
};

export const DEFAULT_TEXT_DIMENSIONS: Dimensions = {
  width: 400,
  height: 100,
};
export const DEFAULT_TEXT_FONT = TextFont.HELVETICA;
export const DEFAULT_TEXT_COLOR = '#000000';
export const DEFAULT_TEXT_SIZE = 44;

export const DEFAULT_IMAGE_WIDTH = SLIDE_WIDTH / 2;
export const DEFAULT_IMAGE_HEIGHT = SLIDE_WIDTH / 2;

export const DEFAULT_PRIMITIVE_DIMENSIONS: Dimensions = {
  width: 200,
  height: 200,
};
export const DEFAULT_PRIMITIVE_FILL = '#ffffff';
export const DEFAULT_PRIMITIVE_STROKE = '#000000';

export const DEFAULT_PRIMITIVE_STROKE_STYLE = PrimitiveStrokeStyle.SOLID;
export const STROKE_STYLE_SOLID = undefined;
export const STROKE_STYLE_DASHED = [20, 10];
export const STROKE_STYLE_DOT_DASHED = [20, 10, 5, 10];

export const DEFAULT_PRIMITIVE_STROKE_SIZE = 1;
