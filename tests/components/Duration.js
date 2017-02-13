'use strict';

import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import {spy} from 'sinon';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import {TestableDuration} from '../../src/js/components/Settings/Greylist';

// this is boilerplate jsdom, allows you to use mount
// instead of shallow, so you can test a live version
import jsdom from 'jsdom';
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.document = doc;
global.window = doc.defaultView;

describe('Duration component', () => {
  xit('')
});
