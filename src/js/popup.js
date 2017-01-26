import React from 'react';
import { render } from 'react-dom';

import store from './store';

import '../css/popup.css';
// import Greeting from "./popup/greeting_component";
// import Alarm from "./component/alarm"
import Header from './component/Header';
import Status from './component/Status';
import Commands from './component/Commands';

const {working, time} = store.getState();

render(
  <div>
    <Header working={working} />
    <Status working={working} time={time}/>
    <Commands />
  </div>,
  window.document.getElementById('app-container')
);
