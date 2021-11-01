import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { addEditorChangeHandler } from './state/editor';

function render() {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

addEditorChangeHandler(render);
render();
