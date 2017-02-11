import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

// Begins linstening to the Store,
// which is sent out from background.js
import { Store } from 'react-chrome-redux';
const proxy = new Store({portName: '1337'});

// always put boot strap first!!! order is important!!!
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/font-awesome/css/font-awesome.css';
import '../css/style.scss';

import Popup from './components/Popup';

const unsubscribe = proxy.subscribe(() => {
  unsubscribe(); // initial connection

  render(
  <Provider store={proxy}>
    <Popup />
  </Provider>,
  window.document.getElementById('app-container'));
});
