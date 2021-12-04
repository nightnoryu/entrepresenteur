import React from 'react';
import Ribbon from './components/Ribbon/Ribbon';
import SlidePanel from './components/SlidePanel/SlidePanel';
import './App.css';
import useConfirmLeaving from './hooks/useConfirmLeaving';
import { connect, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from './state';
import { openImageBase64, openPresentationJSON, savePresentationJSON } from './common/fileUtils';
import useHotkeyCtrl from './hooks/hotkeys/useHotkeyCtrl';
import { Presentation } from './model/types';
import { RootState } from './state/reducers';
import { menuItems } from './model/menu';
import Workspace from './components/Workspace/Workspace';

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

  useConfirmLeaving();
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
  useHotkeyCtrl('d', () => {
    removeSlides();
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

  return (
    <div className="app">
      <Ribbon menu={menuItems()} />

      <div className="app-main">
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
