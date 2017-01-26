import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';

import '../css/popup.css';

//Components
import Header from './component/Header';
import Status from './component/Status';
import Commands from './component/Commands';
import Weather from './component/Weather';

import store from './store';

import {receiveCurrentTime} from './action-creators/status';
import {fetchWeather} from './action-creators/weather';
import {receiveSteps} from './action-creators/steps';

const {status, steps, weather} = store.getState();

store.dispatch(receiveSteps(500));
store.dispatch(fetchWeather('10004'));

chrome.runtime.onMessage.addListener(
  (req, sender, res) => {
      store.dispatch(receiveCurrentTime(req.timeRmaining));
      res('ok');
    }
);

render(
  <Provider store={store}>
    <div>
      <Header status={status} />
      <Status status={status} />
      <Commands />
      <Weather weather={weather}/>
    </div>
  </Provider>,
  window.document.getElementById('app-container')
);
