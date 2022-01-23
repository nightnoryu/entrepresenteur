import { createEditor, createNewPresentation, createNewSlide } from '../modelUtils';
import { BackgroundType, Locale } from '../types';
import { DEFAULT_PRESENTATION_TITLE, DEFAULT_SLIDE_BACKGROUND } from '../constants';

describe('Model utils', () => {
  test('createNewSlide', () => {
    const slide = createNewSlide();

    expect(slide.background).toEqual({
      type: BackgroundType.SOLID,
      color: DEFAULT_SLIDE_BACKGROUND,
    });
    expect(slide.elements).toHaveLength(0);
  });


  test('createNewPresentation', () => {
    const presentation = createNewPresentation();

    expect(presentation.title).toEqual(DEFAULT_PRESENTATION_TITLE);
    expect(presentation.slides).toHaveLength(1);
  });


  test('createEditor', () => {
    const editor = createEditor(createNewPresentation(), Locale.EN_EN);

    expect(editor.selections.selectedElementIDs).toHaveLength(0);
    expect(editor.selections.selectedSlideIDs).toHaveLength(1);
    expect(editor.selections.selectedSlideIDs[0]).toEqual(editor.presentation.slides[0].id);

    expect(editor.history).toEqual({
      pastStates: [],
      futureStates: [],
    });

    expect(editor.isDemonstrating).toEqual(false);
    expect(editor.locale).toEqual(Locale.EN_EN);
  });


  test.todo('selectNearestUnselectedSlide');


  test.todo('saveState');
});
