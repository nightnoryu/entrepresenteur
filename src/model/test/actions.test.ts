import { createEditor, createNewPresentation } from '../modelUtils';
import {
  addSlide,
  nextSlide,
  previousSlide,
  removeSlides,
  selectSlide,
  setCurrentSlide,
  setFirstCurrentSlide,
  setPresentationTitle,
  setSlideBackgroundColor,
  setSlideBackgroundImage,
  startDemonstration,
  stopDemonstration,
} from '../actions';
import { BackgroundType, ColorScheme, Editor } from '../types';

describe('Model actions', () => {
  let editor: Editor;

  beforeEach(() => {
    editor = createEditor(createNewPresentation(), ColorScheme.LIGHT);
  });


  test('setPresentationTitle', () => {
    const mockTitle = 'Mock title';
    editor = setPresentationTitle(editor, mockTitle);

    expect(editor.presentation.title).toEqual(mockTitle);
  });


  test('addSlide', () => {
    editor = addSlide(editor);

    expect(editor.presentation.slides).toHaveLength(2);
    expect(editor.selections.selectedSlideIDs).toHaveLength(1);
    expect(editor.selections.selectedSlideIDs[0]).toEqual(editor.presentation.slides[1].id);
  });


  test('removeSlides', () => {
    editor = removeSlides(addSlide(editor));

    expect(editor.presentation.slides).toHaveLength(1);
    expect(editor.selections.selectedSlideIDs).toHaveLength(1);
    expect(editor.selections.selectedSlideIDs[0]).toEqual(editor.presentation.slides[0].id);
  });


  test('setCurrentSlide', () => {
    editor = addSlide(editor);
    editor = setCurrentSlide(editor, editor.presentation.slides[0].id);

    expect(editor.selections.selectedSlideIDs).toHaveLength(1);
    expect(editor.selections.selectedSlideIDs[0]).toEqual(editor.presentation.slides[0].id);
  });


  test('selectSlide', () => {
    editor = addSlide(editor);
    editor = selectSlide(editor, editor.presentation.slides[0].id);

    expect(editor.selections.selectedSlideIDs).toHaveLength(2);
    expect(editor.selections.selectedSlideIDs).toContain(editor.presentation.slides[0].id);
    expect(editor.selections.selectedSlideIDs).toContain(editor.presentation.slides[1].id);
  });


  test('setFirstCurrentSlide', () => {
    editor = setFirstCurrentSlide(addSlide(addSlide(editor)));

    expect(editor.selections.selectedSlideIDs[0]).toEqual(editor.presentation.slides[0].id);
  });


  test.todo('moveSlidesUp');


  test.todo('moveSlidesDown');


  test.todo('moveSlidesToBeginning');


  test.todo('moveSlidesToEnd');


  describe('nextSlide', () => {
    test('there is next slide', () => {
      editor = nextSlide(previousSlide(addSlide(editor)));

      expect(editor.selections.selectedSlideIDs[0]).toEqual(editor.presentation.slides[1].id);
    });

    test('there are no next slide', () => {
      editor = addSlide(editor);
      const oldSelectedSlideIDs = editor.selections.selectedSlideIDs;
      editor = nextSlide(editor);

      expect(editor.selections.selectedSlideIDs).toEqual(oldSelectedSlideIDs);
    });
  });


  describe('previousSlide', () => {
    test('there is previous slide', () => {
      editor = previousSlide(addSlide(editor));

      expect(editor.selections.selectedSlideIDs).toHaveLength(1);
      expect(editor.selections.selectedSlideIDs[0]).toEqual(editor.presentation.slides[0].id);
    });

    test('there are no previous slide', () => {
      editor = previousSlide(addSlide(editor));
      const oldSelectedSlideIDs = editor.selections.selectedSlideIDs;
      editor = previousSlide(editor);

      expect(editor.selections.selectedSlideIDs).toEqual(oldSelectedSlideIDs);
    });
  });


  test('setSlideBackgroundColor', () => {
    const mockColor = '#ff00ff';
    editor = setSlideBackgroundColor(editor, mockColor);

    expect(editor.presentation.slides[0].background).toEqual({
      type: BackgroundType.SOLID,
      color: mockColor,
    });
  });


  test('setSlideBackgroundImage', () => {
    const mockSrc = 'base64:cool_image';
    editor = setSlideBackgroundImage(editor, mockSrc);

    expect(editor.presentation.slides[0].background).toEqual({
      type: BackgroundType.IMAGE,
      src: mockSrc,
    });
  });


  test.todo('removeElements');


  test.todo('addText');


  test.todo('setTextValue');


  test.todo('toggleBoldText');


  test.todo('toggleItalicText');


  test.todo('setTextFont');


  test.todo('setTextSize');


  test.todo('setTextColor');


  test.todo('addImage');


  test.todo('addPrimitive');


  test.todo('setPrimitiveFillColor');


  test.todo('setPrimitiveStrokeColor');


  test.todo('setPrimitiveStrokeStyle');


  test.todo('setPrimitiveStrokeWidth');


  test.todo('selectElement');


  test.todo('unselectElement');


  test.todo('moveElements');


  test.todo('resizeElement');


  test.todo('undo');


  test.todo('redo');


  test('startDemonstration', () => {
    editor = startDemonstration(editor);

    expect(editor.isDemonstrating).toEqual(true);
  });


  test('stopDemonstration', () => {
    editor = stopDemonstration(editor);

    expect(editor.isDemonstrating).toEqual(false);
  });
});
