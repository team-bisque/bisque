import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';
import {spy} from 'sinon';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import {TestableGreylist} from '../../src/js/components/Settings/Greylist';
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
      testTabRemoveGreylist, testGreylist;

  beforeEach('Set up greylist array, spies, testStore, and wrapper.', () => {
    testGreylist = [
      'youtube.com',
      'facebook.com',
      'twitter.com',
      'qwantz.com'
    ];
    testTabAddGreylist = spy();
    testTabEditGreylist = spy();
    testTabRemoveGreylist = spy();
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

  it('renders the full greylist given to it', () => {
    const arrayOfUrls = GreylistWrapper.find('li');
    expect(arrayOfUrls).to.have.length(4);
  });

  it('responds to form input changes', () => {
    const input = GreylistWrapper.find('.inline').at(0);
    input.simulate('change', {target: {
        value: 'changed value',
        getAttribute: string => string
    }});
    input.simulate('keypress', {key: 'Enter'});
    expect(testTabEditGreylist.calledOnce).to.be.true;
    expect(testTabAddGreylist.calledOnce).to.be.true;
  });

  it('responds to form button clicks', () => {
    GreylistWrapper.find('.fa-plus').simulate('click');
    GreylistWrapper.find('.fa-times').at(0).simulate('click');
    expect(testTabAddGreylist.calledOnce).to.be.true;
    expect(testTabRemoveGreylist.calledOnce).to.be.true;
  });
});
