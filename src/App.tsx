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
import { openPresentationJSON, savePresentationJSON } from './common/fileUtils';

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
  useAppHotkeys(
    presentation,
    addImage,
    addSlide,
    addText,
    newPresentation,
    openPresentation,
    redo,
    setSlideBackgroundImage,
    undo,
  );

  const openPresentationMenu = () => {
    openPresentationJSON()
      .then(presentation => openPresentation(presentation))
      .catch(error => alert(error));
  };

  const savePresentation = () => {
    savePresentationJSON(presentation, presentation.title);
  };

  const menuItems = getRibbonMenuItems(
    openPresentationMenu,
    savePresentation,
    addSlide,
    removeSlides,
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
