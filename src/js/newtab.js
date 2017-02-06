import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { Store } from 'react-chrome-redux';
const proxy = new Store({portName: '1337'});

// always put boot strap first!!! order is important!!!
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

import '../../node_modules/font-awesome/css/font-awesome.css';

// import '../css/weather-icons.css';
import '../style.scss';

import Main from './component/Main';

const unsubscribe = proxy.subscribe(() => {
   unsubscribe(); // initial connection

  render(
  <Provider store={proxy}>
    <Main />
  </Provider>,
  window.document.getElementById('app-container'));
});
