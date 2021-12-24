import { Dimensions, Position } from './types';

// Editor
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
  width: 0,
  height: 0,
};
export const DEFAULT_TEXT_FONT = 'Comic Sans MS';
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
