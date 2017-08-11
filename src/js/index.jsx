import 'react-hot-loader/patch';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import 'babel-polyfill';
import App from './components/App.react';

function startApp() {
  render(<AppContainer><App /></AppContainer>, document.getElementById('battleship'));

  if (module.hot) {
    module.hot.accept('./components/App.react.jsx', () => {
      const NextApp = require('./components/App.react.jsx').default; // eslint-disable-line global-require
      render(<AppContainer><NextApp /></AppContainer>, document.getElementById('battleship'));
    });
  }
}

window.addEventListener('load', startApp, false);
