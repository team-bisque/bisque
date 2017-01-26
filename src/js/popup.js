import React from 'react';
import { render } from 'react-dom';

import store from './store';

import '../css/popup.css';
// import Greeting from "./popup/greeting_component";
// import Alarm from "./component/alarm"
import Header from './component/Header';
import Status from './component/Status';
import Commands from './component/Commands';
import Weather from './component/Weather';
import Steps from './component/Steps';

import {receiveCurrentTime} from './action-creators/status'

const {status, steps, weather} = store.getState();

chrome.runtime.onMessage.addListener(
  (req, sender, res) => {
      store.dispatch(receiveCurrentTime(req.timeRmaining));
      res('ok');
    }
);

render(
  <div>
    <Header working={status.work} />
    <Status working={status.work} time={status.timeRemaining}/>
    <Commands />
    <Weather weather={weather}/>
    <Steps steps={steps}/>
  </div>,
  window.document.getElementById('app-container')
);
