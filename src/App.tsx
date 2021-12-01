import React from 'react';
import Ribbon from './components/ribbon/Ribbon';
import SlidePanel from './components/slidepanel/SlidePanel';
import Workspace from './components/workspace/Workspace';
import './App.css';
import useConfirmLeaving from './hooks/useConfirmLeaving';
import { connect, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from './state';
import { openPresentationJSON, savePresentationJSON } from './common/fileUtils';
import useHotkeyCtrl from './hooks/hotkeys/useHotkeyCtrl';
import { Presentation } from './model/types';
import { RootState } from './state/reducers';
import { menuItems } from './model/menu';

type AppProps = {
  presentation: Presentation;
}

function App({ presentation }: AppProps): JSX.Element {
  const dispatch = useDispatch();
  const {
    openPresentation,
    newPresentation,
    addSlide,
    undo,
    redo,
  } = bindActionCreators(actionCreators, dispatch);

  useConfirmLeaving();
  useHotkeyCtrl('s', () => {
    savePresentationJSON(presentation, presentation.title);
  });
  useHotkeyCtrl('o', () => {
    openPresentationJSON(presentation => {
      openPresentation(presentation);
    });
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
  useHotkeyCtrl('z', () => {
    undo();
  });
  useHotkeyCtrl('y', () => {
    redo();
  });

  return (
    <div className="app">
      <Ribbon
        menu={menuItems(() => {
          openPresentationJSON(presentation => {
            openPresentation(presentation);
          });
        })}
      />

      <div className="app-main">
        <SlidePanel />
        <Workspace />
      </div>
    </div>
  );
}

function mapStateToProps(state: RootState) {
  return {
    presentation: state.editor.presentation,
  };
}

export default connect(mapStateToProps)(App);
