import { Dimensions, Position, PrimitiveStroke, PrimitiveStrokeStyle, TextFont } from './types';

// Page

export const BASE_WINDOW_TITLE = 'Entrepresenteur';
export const WINDOW_TITLE_SEPARATOR = ' • ';

// Editor

export const PRESENTATION_EXTENSION = '.entrepresenteur.json';

export const MAX_HISTORY_ENTRIES = 50;

export const SELECTED_OVERLAY_FILL = '#2a8ec8';
export const SELECTED_OVERLAY_STROKE = '#1563c8';
export const SELECTED_OVERLAY_OPACITY = 0.3;

export const RESIZE_ANCHOR_WIDTH = 10;
export const RESIZE_ANCHOR_HEIGHT = 10;

// Presentation

export const DEFAULT_PRESENTATION_TITLE = 'New Presentation';

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
export const DEFAULT_TEXT_FONT = TextFont.SERIF;
export const DEFAULT_TEXT_COLOR = '#000000';
export const DEFAULT_TEXT_SIZE = 44;

export const DEFAULT_IMAGE_WIDTH = SLIDE_WIDTH / 2;
export const DEFAULT_IMAGE_HEIGHT = SLIDE_WIDTH / 2;

export const DEFAULT_PRIMITIVE_DIMENSIONS: Dimensions = {
  width: 200,
  height: 200,
};
export const DEFAULT_PRIMITIVE_FILL = '#ffffff';
export const DEFAULT_PRIMITIVE_STROKE: PrimitiveStroke = {
  color: '#000000',
  style: PrimitiveStrokeStyle.SOLID,
  width: 1,
};

export const STROKE_STYLE_SOLID = undefined;
export const STROKE_STYLE_DASHED = [20, 10];
export const STROKE_STYLE_DOT_DASHED = [20, 10, 5, 10];
