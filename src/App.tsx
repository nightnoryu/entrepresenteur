import React, { Dispatch } from 'react';
import Ribbon from './components/Ribbon/Ribbon';
import SlidePanel from './components/SlidePanel/SlidePanel';
import styles from './App.module.css';
import useConfirmLeaving from './hooks/useConfirmLeaving';
import { connect } from 'react-redux';
import { actionCreators } from './state';
import { Presentation, PrimitiveType } from './model/types';
import { RootState } from './state/reducers';
import exportPresentationPDF from './common/pdfExporter';
import { getRibbonMenuItems } from './model/uiParameters/menu';
import Workspace from './components/Workspace/Workspace';
import useAppHotkeys from './hooks/hotkeys/useAppHotkeys';
import { openImageBase64, openPresentationJSON, pickColor, savePresentationJSON, scaleImage } from './common/fileUtils';
import { DEFAULT_ELEMENT_POSITION, DEFAULT_PRIMITIVE_DIMENSIONS, DEFAULT_TEXT_DIMENSIONS } from './model/constants';
import Action from './state/actions/actions';

type AppProps = AppStateProps & AppDispatchProps;

type AppStateProps = {
  presentation: Presentation;
};

type AppDispatchProps = {
  openPresentation: () => void;
  newPresentation: () => void;
  savePresentation: (presentation: Presentation) => () => void;
  exportPresentation: (presentation: Presentation) => () => void;
  undo: () => void;
  redo: () => void;
  addText: () => void;
  addImage: () => void;
  addPrimitive: (type: PrimitiveType) => void;
  addSlide: () => void;
  removeSlides: () => void;
  nextSlide: () => void;
  previousSlide: () => void;
  setSlideBackgroundImage: () => void;
  setSlideBackgroundColor: () => void;
  removeElements: () => void;
  startDemonstrationFromStart: () => void;
  startDemonstration: () => void;
  moveSlidesUp: () => void;
  moveSlidesDown: () => void;
  moveSlidesToBeginning: () => void;
  moveSlidesToEnd: () => void;
};

function App(props: AppProps): JSX.Element {
  useConfirmLeaving();

  const actions = {
    ...props,
    savePresentation: props.savePresentation(props.presentation),
    exportPresentation: props.exportPresentation(props.presentation),
  };
  useAppHotkeys(actions);
  const menuItems = getRibbonMenuItems(actions);

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

function mapStateToProps(state: RootState): AppStateProps {
  return {
    presentation: state.presentation,
  };
}

function mapDispatchToProps(dispatch: Dispatch<Action>): AppDispatchProps {
  return {
    openPresentation: () => {
      const confirmed = confirm('Are you sure? All unsaved changes will be lost.');
      if (confirmed) {
        openPresentationJSON()
          .then(presentation => actionCreators.openPresentation(presentation)(dispatch))
          .catch(error => alert(error));
      }
    },

    newPresentation: () => {
      const confirmed = confirm('Are you sure? All unsaved changes will be lost.');
      if (confirmed) {
        actionCreators.newPresentation()(dispatch);
      }
    },

    savePresentation: (presentation: Presentation) => {
      return () => {
        savePresentationJSON(presentation, presentation.title);
      };
    },

    exportPresentation: (presentation: Presentation) => {
      return () => {
        exportPresentationPDF(presentation, presentation.title);
      };
    },

    undo: () => actionCreators.undo()(dispatch),
    redo: () => actionCreators.redo()(dispatch),

    addText: () => {
      const text = prompt('Enter text') || '';
      if (text !== '') {
        actionCreators.addText(DEFAULT_ELEMENT_POSITION, DEFAULT_TEXT_DIMENSIONS, text)(dispatch);
      }
    },

    addImage: () => {
      openImageBase64()
        .then(image => actionCreators.addImage(DEFAULT_ELEMENT_POSITION, scaleImage(image.width, image.height), image.src)(dispatch))
        .catch(error => alert(error));
    },

    addPrimitive: (type: PrimitiveType) => {
      actionCreators.addPrimitive(DEFAULT_ELEMENT_POSITION, DEFAULT_PRIMITIVE_DIMENSIONS, type)(dispatch);
    },

    addSlide: () => actionCreators.addSlide()(dispatch),
    removeSlides: () => actionCreators.removeSlides()(dispatch),

    nextSlide: () => actionCreators.nextSlide()(dispatch),
    previousSlide: () => actionCreators.previousSlide()(dispatch),

    setSlideBackgroundImage: () => {
      openImageBase64()
        .then(image => actionCreators.setSlideBackgroundImage(image.src)(dispatch))
        .catch(error => alert(error));
    },

    setSlideBackgroundColor: () => {
      pickColor()
        .then(color => actionCreators.setSlideBackgroundColor(color)(dispatch))
        .catch(error => alert(error));
    },

    removeElements: () => actionCreators.removeElements()(dispatch),

    startDemonstrationFromStart: () => {
      actionCreators.setFirstCurrentSlide()(dispatch);
      actionCreators.startDemonstration()(dispatch);
    },
    startDemonstration: () => actionCreators.startDemonstration()(dispatch),

    moveSlidesUp: () => actionCreators.moveSlidesUp()(dispatch),
    moveSlidesDown: () => actionCreators.moveSlidesDown()(dispatch),
    moveSlidesToBeginning: () => actionCreators.moveSlidesToBeginning()(dispatch),
    moveSlidesToEnd: () => actionCreators.moveSlidesToEnd()(dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
