import useHotkeyCtrl from './useHotkeyCtrl';
import { openImageBase64, openPresentationJSON, savePresentationJSON } from '../../common/fileUtils';
import { Presentation } from '../../model/types';
import {
  addImage as addImageCreator,
  addSlide as addSlideCreator,
  addText as addTextCreator,
  newPresentation as newPresentationCreator,
  openPresentation as openPresentationCreator,
  redo as redoCreator,
  setSlideBackgroundImage as setSlideBackgroundImageCreator,
  undo as undoCreator,
} from '../../state/actions/actionCreators';

function useAppHotkeys(
  presentation: Presentation,
  addImage: typeof addImageCreator,
  addSlide: typeof addSlideCreator,
  addText: typeof addTextCreator,
  newPresentation: typeof newPresentationCreator,
  openPresentation: typeof openPresentationCreator,
  redo: typeof redoCreator,
  setSlideBackgroundImage: typeof setSlideBackgroundImageCreator,
  undo: typeof undoCreator,
): void {
  useHotkeyCtrl('s', () => {
    savePresentationJSON(presentation, presentation.title);
  });

  useHotkeyCtrl('o', () => {
    openPresentationJSON()
      .then(presentation => openPresentation(presentation))
      .catch(error => alert(error));
  });

  useHotkeyCtrl('m', () => {
    const confirmed = confirm('Are you sure?');
    if (confirmed) {
      newPresentation();
    }
  });

  useHotkeyCtrl('l', () => {
    addSlide();
  });

  useHotkeyCtrl('b', () => {
    openImageBase64()
      .then(image => setSlideBackgroundImage(image.src))
      .catch(error => alert(error));
  });

  useHotkeyCtrl('e', () => {
    const text = prompt('Enter text') || '';
    if (text !== '') {
      addText({ x: 0, y: 0 }, { width: 0, height: 0 }, text);
    }
  });

  useHotkeyCtrl('i', () => {
    openImageBase64()
      .then(image => addImage({ x: 0, y: 0 }, { width: image.width, height: image.height }, image.src))
      .catch(error => alert(error));
  });

  useHotkeyCtrl('z', () => {
    undo();
  });

  useHotkeyCtrl('y', () => {
    redo();
  });
}

export default useAppHotkeys;
