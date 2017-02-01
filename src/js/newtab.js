import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { Store } from 'react-chrome-redux';
const proxy = new Store({portName: '1337'});

import '../css/newtab.css';
import '../css/weather-icons.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

import Main from './component/Main';

const unsubscribe = proxy.subscribe(() => {
   unsubscribe(); // initial connection

  render(
  <Provider store={proxy}>
    <Main />
  </Provider>,
  window.document.getElementById('app-container'));
});
