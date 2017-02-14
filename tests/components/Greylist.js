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
    const listOfGreylistUrls = GreylistWrapper.find('li');
    expect(listOfGreylistUrls).to.have.length(4);
  });

  it('changes a url on change in form', () => {
    const url = 'github.com';
    return Promise.resolve()
      .then(() => GreylistWrapper.setState({url}))
      .then(() => {
      GreylistWrapper.find('.inline').at(0)
        .simulate('change', {target: {
          value: url,
          getAttribute: string => string
      }})
      expect(testTabEditGreylist.calledOnce).to.be.true;
    })
      .catch(error => console.error(error));
  });

  it('adds a url if enter is pressed in the add new form', () => {
    const url = 'waffle.io';
    return Promise.resolve()
      .then(() => GreylistWrapper.setState({url}))
      .then(() => {
        expect(GreylistWrapper.state().url).to.equal('waffle.io');
        const dom = GreylistWrapper.update().find('#addNew-input').simulate('keypress', {key: 'Enter'});
        expect(testTabAddGreylist.calledOnce).to.be.true;
      })
      .catch(error => console.error(error));
  });

  it('has an Add Url button that responds to clicks', () => {
    const url = 'waffle.io';
    return Promise.resolve()
      .then(() => GreylistWrapper.setState({url}))
      .then((newStateGreylist) => newStateGreylist.find('.icon').at(0).simulate('click'))
      .then(() => expect(GreylistWrapper.update().state().url).to.equal('waffle.io'))
      .then(() => expect(testTabAddGreylist.calledOnce).to.be.true)
      .catch(error => console.error(error));
  });


  it('has a Remove Url button that responds to clicks', () => {
    const url = 'grooveshark.com';
    return Promise.resolve()
      .then(() => GreylistWrapper.setState({url}))
      .then((newStateGreylist) => newStateGreylist.find('.fa-times').at(0).simulate('click'))
      .then(() => expect(testTabRemoveGreylist.calledOnce).to.be.true)
      .catch(error => console.error(error));
  });
});
