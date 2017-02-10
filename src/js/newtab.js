import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

// Spy wrapper for chrome functions
// Activate only when testing or you will not be able to build
// const chrome = require('sinon-chrome/extensions');

// Begins linstening to the Store,
// which is sent out from background.js
import { Store } from 'react-chrome-redux';
const proxy = new Store({portName: '1337'});

// always put boot strap first!!! order is important!!!
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/font-awesome/css/font-awesome.css';
import '../css/style.scss';

import Main from './components/Main';

const unsubscribe = proxy.subscribe(() => {
  unsubscribe(); // initial connection

  render(
  <Provider store={proxy}>
    <Main />
  </Provider>,
  window.document.getElementById('app-container'));
});
