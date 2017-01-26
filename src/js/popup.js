import React from 'react';
import { render } from 'react-dom';

import store from './store';

import '../css/popup.css';
// import Alarm from "./component/alarm"
import Header from './component/Header';
import Status from './component/Status';
import Commands from './component/Commands';
import Weather from './component/Weather';
import Steps from './component/Steps';

import {receiveCurrentTime} from './action-creators/status';
import {fetchWeather} from './action-creators/weather';
import {fetchSteps} from './action-creators/steps';

const {status, steps, weather} = store.getState();

store.dispatch(fetchSteps(500));
store.dispatch(fetchWeather('10004'));

chrome.runtime.onMessage.addListener(
  (req, sender, res) => {
      store.dispatch(receiveCurrentTime(req.timeRmaining));
      res('ok');
    }
);

render(
  <div>
    <Header status={status} />
    <Status status={status} />
    <Commands />
    <Weather weather={weather}/>
    <Steps steps={steps}/>
  </div>,
  window.document.getElementById('app-container')
);
