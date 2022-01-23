import React, { Dispatch } from 'react';
import Ribbon from './components/Ribbon/Ribbon';
import SlidePanel from './components/SlidePanel/SlidePanel';
import styles from './App.module.css';
import useConfirmLeaving from './hooks/useConfirmLeaving';
import { connect } from 'react-redux';
import { actionCreators } from './state';
import { Locale, Presentation, PrimitiveType } from './model/types';
import { RootState } from './state/reducers';
import exportPresentationPDF from './common/pdfExporter';
import { getRibbonMenuItems } from './model/uiParameters/menu';
import Workspace from './components/Workspace/Workspace';
import useAppHotkeys from './hooks/hotkeys/useAppHotkeys';
import {
  getScaledImageDimensions,
  openImageBase64,
  openPresentationJSON,
  pickColor,
  savePresentationJSON,
} from './common/fileUtils';
import { DEFAULT_ELEMENT_POSITION, DEFAULT_PRIMITIVE_DIMENSIONS, DEFAULT_TEXT_DIMENSIONS } from './model/constants';
import Action from './state/actions/actions';
import useLocale from './hooks/useLocale';
import { LOCALE_KEY } from './state/initialState';
import { mapLocaleToString } from './model/modelUtils';
import i18n_get from './i18n/i18n_get';

type AppProps = AppStateProps & AppDispatchProps;

type AppStateProps = {
  presentation: Presentation;
};

type AppDispatchProps = {
  openPresentation: (locale: Locale) => void;
  newPresentation: (locale: Locale) => void;
  savePresentation: (presentation: Presentation) => () => void;
  exportPresentation: (presentation: Presentation) => () => void;
  undo: () => void;
  redo: () => void;
  addText: () => void;
  addImage: (locale: Locale) => void;
  addPrimitive: (type: PrimitiveType) => void;
  addSlide: () => void;
  removeSlides: () => void;
  nextSlide: () => void;
  previousSlide: () => void;
  setSlideBackgroundImage: (locale: Locale) => void;
  setSlideBackgroundColor: () => void;
  removeElements: () => void;
  startDemonstrationFromStart: () => void;
  startDemonstration: () => void;
  moveSlidesUp: () => void;
  moveSlidesDown: () => void;
  moveSlidesToBeginning: () => void;
  moveSlidesToEnd: () => void;
  localeEN: () => void,
  localeRU: () => void,
};

function App(props: AppProps): JSX.Element {
  useConfirmLeaving();

  const actions = {
    ...props,
    savePresentation: props.savePresentation(props.presentation),
    exportPresentation: props.exportPresentation(props.presentation),
  };
  useAppHotkeys(actions);

  const locale = useLocale();
  const menuItems = getRibbonMenuItems(actions, locale);

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
    openPresentation: (locale: Locale) => {
      const confirmed = confirm(i18n_get(locale, 'prompt.changes'));
      if (confirmed) {
        openPresentationJSON()
          .then(presentation => actionCreators.openPresentation(presentation)(dispatch))
          .catch(errorMessageID => alert(i18n_get(locale, errorMessageID)));
      }
    },

    newPresentation: (locale: Locale) => {
      const confirmed = confirm(i18n_get(locale, 'prompt.changes'));
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
      actionCreators.addText(DEFAULT_ELEMENT_POSITION, DEFAULT_TEXT_DIMENSIONS, '')(dispatch);
    },

    addImage: (locale: Locale) => {
      openImageBase64()
        .then(image => actionCreators.addImage(DEFAULT_ELEMENT_POSITION, getScaledImageDimensions(image), image.src)(dispatch))
        .catch(errorMessageID => alert(i18n_get(locale, errorMessageID)));
    },

    addPrimitive: (type: PrimitiveType) => {
      actionCreators.addPrimitive(DEFAULT_ELEMENT_POSITION, DEFAULT_PRIMITIVE_DIMENSIONS, type)(dispatch);
    },

    addSlide: () => actionCreators.addSlide()(dispatch),
    removeSlides: () => actionCreators.removeSlides()(dispatch),

    nextSlide: () => actionCreators.nextSlide()(dispatch),
    previousSlide: () => actionCreators.previousSlide()(dispatch),

    setSlideBackgroundImage: (locale: Locale) => {
      openImageBase64()
        .then(image => actionCreators.setSlideBackgroundImage(image.src)(dispatch))
        .catch(errorMessageID => alert(i18n_get(locale, errorMessageID)));
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

    localeEN: () => {
      actionCreators.setLocale(Locale.EN_EN)(dispatch);
      localStorage.setItem(LOCALE_KEY, mapLocaleToString(Locale.EN_EN));
    },
    localeRU: () => {
      actionCreators.setLocale(Locale.RU_RU)(dispatch);
      localStorage.setItem(LOCALE_KEY, mapLocaleToString(Locale.RU_RU));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
