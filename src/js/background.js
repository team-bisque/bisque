'use strict';

// import React          from 'react';
// import { Provider }   from 'react-redux';
// import { render }     from 'react-dom';
import { wrapStore }  from 'react-chrome-redux';
import store          from './store';
// import Background from './component/Background'



wrapStore(store, {portName: '1337'});

// render(
//   <Provider store={store}>
//     {
//     <Background />
//     }
//   </Provider>,
//   window.document.getElementById('app-container')
// );

const Core = require('./controllers/core');
const core = new Core(store);
core.init()