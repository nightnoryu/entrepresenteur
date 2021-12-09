import React from 'react';
import Ribbon from './components/Ribbon/Ribbon';
import SlidePanel from './components/SlidePanel/SlidePanel';
import styles from './App.module.css';
import useConfirmLeaving from './hooks/useConfirmLeaving';
import { connect, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from './state';
import { Presentation } from './model/types';
import { RootState } from './state/reducers';
import { getRibbonMenuItems } from './model/menu';
import Workspace from './components/Workspace/Workspace';
import useAppHotkeys from './hooks/hotkeys/useAppHotkeys';
import { openImageBase64, openPresentationJSON, savePresentationJSON } from './common/fileUtils';

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
    addText,
    addImage,
    undo,
    redo,
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
      addText({ x: 0, y: 0 }, { width: 0, height: 0 }, text);
    }
  };

  const addImageAction = () => {
    openImageBase64()
      .then(image => addImage({ x: 0, y: 0 }, { width: image.width, height: image.height }, image.src))
      .catch(error => alert(error));
  };

  const addSlideAction = () => addSlide();
  const removeSlidesAction = () => removeSlides();

  const undoAction = () => undo();
  const redoAction = () => redo();

  const setSlideBackgroundImageAction = () => {
    openImageBase64()
      .then(image => setSlideBackgroundImage(image.src))
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
    addSlideAction,
    removeSlidesAction,
    setSlideBackgroundImageAction,
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
