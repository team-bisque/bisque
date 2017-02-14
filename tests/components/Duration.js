'use strict';

import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';
import {spy} from 'sinon';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import {TestableDuration} from '../../src/js/components/Settings/Duration';
import statusReducer from '../../src/js/reducers/status';

// this is boilerplate jsdom, allows you to use mount
// instead of shallow, so you can test a live version
import jsdom from 'jsdom';
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.document = doc;
global.window = doc.defaultView;

describe('Duration component', () => {

  let DurationWrapper, testStore, action,
      testSetSettingsAlias;

  beforeEach('Set up spies, testStore, and wrapper.', () => {
    testSetSettingsAlias = spy();
    testStore = createStore(statusReducer);
    action = {type: "JS4L"}
    testStore.dispatch(action);
    DurationWrapper = mount(
      <Provider store={testStore}>
        <TestableDuration
          setSettingsAlias={testSetSettingsAlias}
        />
      </Provider>
    );
  });

  it('toggles the nuclear setting', () => {
    DurationWrapper.find('.fa-unlock-alt').simulate('click');
    expect(DurationWrapper.state().nuclear).to.equal(true);
  });

  xit('sets changes to the durations through form inputs and saves settings', () => {
    expect(testSetSettingsAlias.calledOnce).to.be.true;
  });
});
