import React from 'react';
import Ribbon from './components/Ribbon/Ribbon';
import SlidePanel from './components/SlidePanel/SlidePanel';
import styles from './App.module.css';
import useConfirmLeaving from './hooks/useConfirmLeaving';
import { connect, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from './state';
import { Presentation, PrimitiveType } from './model/types';
import { RootState } from './state/reducers';
import { getRibbonMenuItems } from './model/uiParameters/menu';
import Workspace from './components/Workspace/Workspace';
import useAppHotkeys from './hooks/hotkeys/useAppHotkeys';
import { openImageBase64, openPresentationJSON, pickColor, savePresentationJSON, scaleImage } from './common/fileUtils';
import { DEFAULT_ELEMENT_POSITION, DEFAULT_PRIMITIVE_DIMENSIONS, DEFAULT_TEXT_DIMENSIONS } from './model/constants';

type AppProps = {
  presentation: Presentation;
}

function App({ presentation }: AppProps): JSX.Element {
  const dispatch = useDispatch();
  const {
    openPresentation,
    newPresentation,
    addSlide,
    removeSlides,
    setSlideBackgroundImage,
    setSlideBackgroundColor,
    addText,
    addImage,
    undo,
    redo,
    addPrimitive,
    removeElements,
  } = bindActionCreators(actionCreators, dispatch);

  const newPresentationAction = () => {
    const confirmed = confirm('Are you sure? All unsaved changes will be lost.');
    if (confirmed) {
      newPresentation();
    }
  };

  const openPresentationAction = () => {
    openPresentationJSON()
      .then(presentation => openPresentation(presentation))
      .catch(error => alert(error));
  };

  const savePresentationAction = () => {
    savePresentationJSON(presentation, presentation.title);
  };

  const addTextAction = () => {
    const text = prompt('Enter text') || '';
    if (text !== '') {
      addText(DEFAULT_ELEMENT_POSITION, DEFAULT_TEXT_DIMENSIONS, text);
    }
  };

  const addImageAction = () => {
    openImageBase64()
      .then(image => addImage(DEFAULT_ELEMENT_POSITION, scaleImage(image.width, image.height), image.src))
      .catch(error => alert(error));
  };

  const addPrimitiveAction = (type: PrimitiveType) => {
    addPrimitive(DEFAULT_ELEMENT_POSITION, DEFAULT_PRIMITIVE_DIMENSIONS, type);
  };

  const addSlideAction = () => addSlide();
  const removeSlidesAction = () => removeSlides();

  const removeElementsAction = () => removeElements();

  const undoAction = () => undo();
  const redoAction = () => redo();

  const setSlideBackgroundImageAction = () => {
    openImageBase64()
      .then(image => setSlideBackgroundImage(image.src))
      .catch(error => alert(error));
  };

  const setSlideBackgroundColorAction = () => {
    pickColor()
      .then(color => setSlideBackgroundColor(color))
      .catch(error => alert(error));
  };

  useConfirmLeaving();
  useAppHotkeys(
    newPresentationAction,
    openPresentationAction,
    savePresentationAction,
    undoAction,
    redoAction,
  );

  const menuItems = getRibbonMenuItems(
    newPresentationAction,
    openPresentationAction,
    savePresentationAction,
    addTextAction,
    addImageAction,
    addPrimitiveAction,
    addSlideAction,
    removeSlidesAction,
    setSlideBackgroundImageAction,
    setSlideBackgroundColorAction,
    removeElementsAction,
    undoAction,
    redoAction,
  );

  return (
    <div className="app">
      <Ribbon menuItems={menuItems} />
      <div className={styles.main}>
        <SlidePanel />
        <Workspace />
      </div>
    </div>
  );
}

function mapStateToProps(state: RootState): AppProps {
  return {
    presentation: state.presentation,
  };
}

export default connect(mapStateToProps)(App);
