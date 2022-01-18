import { createEditor, createNewPresentation, createNewSlide } from '../modelUtils';
import { BackgroundType } from '../types';
import { DEFAULT_PRESENTATION_TITLE, DEFAULT_SLIDE_BACKGROUND } from '../constants';

test('create slide', () => {
  const slide = createNewSlide();

  expect(slide.background).toEqual({
    type: BackgroundType.SOLID,
    color: DEFAULT_SLIDE_BACKGROUND,
  });
  expect(slide.elements.length).toEqual(0);
});

test('create presentation', () => {
  const presentation = createNewPresentation();

  expect(presentation.title).toEqual(DEFAULT_PRESENTATION_TITLE);
  expect(presentation.slides.length).toEqual(1);
});

test('create editor', () => {
  const editor = createEditor(createNewPresentation());

  expect(editor.selections.selectedElementIDs.length).toEqual(0);
  expect(editor.selections.selectedSlideIDs.length).toEqual(1);
  expect(editor.selections.selectedSlideIDs[0]).toEqual(editor.presentation.slides[0].id);

  expect(editor.history).toEqual({
    pastStates: [],
    futureStates: [],
  });

  expect(editor.isDemonstrating).toEqual(false);
});
