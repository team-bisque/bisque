'use strict';

import React          from 'react';
import { Provider }   from 'react-redux';
import { render }     from 'react-dom';
import { wrapStore }  from 'react-chrome-redux';
import store          from './store';
import ChromeApp from './component/ChromeApp'

wrapStore(store, {portName: '1337'});

render(
  <Provider store={store}>
    <ChromeApp />
  </Provider>,
  window.document.getElementById('app-container')
);
