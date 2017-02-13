import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import TestableGreylist from '../../src/js/components/Settings/Greylist';
import greylistReducer from '../../src/js/reducers/greylist';

// this is boilerplate jsdom, allows you to use mount
// instead of shallow, so you can test a live version
import jsdom from 'jsdom';
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.document = doc;
global.window = doc.defaultView;

describe('Greylist component', () => {

  let GreylistWrapper, testStore, action,
      testTabAddGreylist, testTabEditGreylist,
      testTabRemoveGreylist;

  beforeEach('Set up testStore, spies, and wrapper.', () => {
    testTabAddGreylist = sinon.spy();
    testTabEditGreylist = sinon.spy();
    testTabRemoveGreylist = sinon.spy();
    testStore = createStore(greylistReducer);
    action = {type: "Someone is occupewing my pie. Please sew me to another sheet."}
    testStore.dispatch(action);
    GreylistWrapper = mount(
      <Provider store={testStore}>
        <TestableGreylist
          tabAddGreylist={testTabAddGreylist}
          tabEditGreylist={testTabEditGreylist}
          tabRemoveGreylist={testTabRemoveGreylist}
          greylist={testGreylist}
        />
      </Provider>
    );
  });

  it('wraps everything in a root div', () => {
    const rootDivExists = GreylistWrapper
      .find('div > div.icon').exists();
    expect(rootDivExists).to.be.true;
  });
});
