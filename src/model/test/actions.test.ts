import { createEditor, createNewPresentation } from '../modelUtils';
import {
  addSlide,
  addText,
  nextSlide,
  previousSlide,
  removeSlides,
  selectSlide,
  setCurrentSlide,
  setFirstCurrentSlide,
  setPresentationTitle,
  setSlideBackgroundColor,
  setSlideBackgroundImage,
  setTextColor,
  setTextFont,
  setTextSize,
  setTextValue,
  startDemonstration,
  stopDemonstration,
  toggleBoldText,
  toggleItalicText,
} from '../actions';
import { BackgroundType, Editor, ElementType, Locale, TextElement, TextFont } from '../types';
import {
  DEFAULT_ELEMENT_POSITION,
  DEFAULT_TEXT_COLOR,
  DEFAULT_TEXT_DIMENSIONS,
  DEFAULT_TEXT_FONT,
  DEFAULT_TEXT_SIZE,
} from '../constants';

describe('Model actions', () => {
  let editor: Editor;

  beforeEach(() => {
    editor = createEditor(createNewPresentation(), Locale.EN_EN);
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


  test('addText', () => {
    const mockValue = 'sneed';
    editor = addText(editor, {
      position: DEFAULT_ELEMENT_POSITION,
      dimensions: DEFAULT_TEXT_DIMENSIONS,
      value: mockValue,
    });

    expect(editor.presentation.slides[0].elements).toHaveLength(1);

    const element = editor.presentation.slides[0].elements[0] as TextElement;

    expect(element.type).toEqual(ElementType.TEXT);
    expect(element.position).toEqual(DEFAULT_ELEMENT_POSITION);
    expect(element.dimensions).toEqual(DEFAULT_TEXT_DIMENSIONS);

    expect(element.value).toEqual(mockValue);
    expect(element.font).toEqual(DEFAULT_TEXT_FONT);
    expect(element.color).toEqual(DEFAULT_TEXT_COLOR);
    expect(element.size).toEqual(DEFAULT_TEXT_SIZE);
    expect(element.isBold).toEqual(false);
    expect(element.isItalic).toEqual(false);

    expect(editor.selections.selectedElementIDs).toHaveLength(1);
    expect(editor.selections.selectedElementIDs[0]).toEqual(element.id);
  });


  describe('text operations', () => {
    const mockValue = 'sneed';
    let element: TextElement;

    beforeEach(() => {
      editor = addText(editor, {
        position: DEFAULT_ELEMENT_POSITION,
        dimensions: DEFAULT_TEXT_DIMENSIONS,
        value: mockValue,
      });

      element = editor.presentation.slides[0].elements[0] as TextElement;
    });


    test('setTextValue', () => {
      const newMockValue = 'feed and seed';
      editor = setTextValue(editor, {
        elementID: element.id,
        value: newMockValue,
      });

      element = editor.presentation.slides[0].elements[0] as TextElement;
      expect(element.value).toEqual(newMockValue);
    });


    test('toggleBoldText', () => {
      editor = toggleBoldText(editor, element.id);
      element = editor.presentation.slides[0].elements[0] as TextElement;
      expect(element.isBold).toEqual(true);

      editor = toggleBoldText(editor, element.id);
      element = editor.presentation.slides[0].elements[0] as TextElement;
      expect(element.isBold).toEqual(false);
    });


    test('toggleItalicText', () => {
      editor = toggleItalicText(editor, element.id);
      element = editor.presentation.slides[0].elements[0] as TextElement;
      expect(element.isItalic).toEqual(true);

      editor = toggleItalicText(editor, element.id);
      element = editor.presentation.slides[0].elements[0] as TextElement;
      expect(element.isItalic).toEqual(false);
    });


    test('setTextFont', () => {
      const mockFont = TextFont.MONOSPACE;
      editor = setTextFont(editor, {
        elementID: element.id,
        font: mockFont,
      });

      element = editor.presentation.slides[0].elements[0] as TextElement;
      expect(element.font).toEqual(mockFont);
    });


    test('setTextSize', () => {
      const mockSize = 69;
      editor = setTextSize(editor, {
        elementID: element.id,
        size: mockSize,
      });

      element = editor.presentation.slides[0].elements[0] as TextElement;
      expect(element.size).toEqual(mockSize);
    });


    test('setTextColor', () => {
      const mockColor = '#ff00ff';
      editor = setTextColor(editor, {
        elementID: element.id,
        color: mockColor,
      });

      element = editor.presentation.slides[0].elements[0] as TextElement;
      expect(element.color).toEqual(mockColor);
    });
  });


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
