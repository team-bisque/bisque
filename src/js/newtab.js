import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import {Store} from 'react-chrome-redux';
const proxy = new Store({portName: '1337'});

import '../css/newtab.css';

//Components
import Header from './component/Header';
import Status from './component/Status';
import Commands from './component/Commands';
import Weather from './component/Weather';

const unsubscribe = proxy.subscribe(() => {
   unsubscribe(); // initial connection

   const {status, weather} = proxy;

   render(
  <Provider store={proxy}>
    <div>
      <Header status={status} />
      <Status status={status} />
      <Commands />
      <Weather weather={weather} />
    </div>
  </Provider>,
  window.document.getElementById('app-container'));
});
